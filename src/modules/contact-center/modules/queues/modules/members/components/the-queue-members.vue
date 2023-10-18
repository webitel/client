<template>
  <wt-page-wrapper class="members">
    <template v-slot:header>
      <wt-page-header
        :hide-primary="!hasEditAccess || !isNotInboundMember"
        :primary-action="create"
        :secondary-action="close"
      >
        <template v-slot:primary-action>
          <wt-button-select
            :options="saveOptions"
            @click="create"
            @click:option="({ callback }) => callback()"
          >{{ $t('objects.add') }}
          </wt-button-select>
          <input
            ref="file-input"
            :accept="'.csv'"
            class="upload-file-input"
            type="file"
            @change="inputFileHandler"
          >
        </template>
        <wt-headline-nav :path="path"></wt-headline-nav>
      </wt-page-header>
    </template>
    <template v-slot:actions-panel>
      <the-queue-members-filters
        :namespace="filtersNamespace"
      ></the-queue-members-filters>
    </template>
    <template v-slot:main>
      <destinations-popup
        v-if="isDestinationsPopup"
        :communications="communicationsOnPopup"
        @close="closeDestinationsPopup"
      ></destinations-popup>

      <upload-popup
        v-if="hasEditAccess && isUploadPopup"
        :file="csvFile"
        :parent-id="parentId"
        @close="closeCSVPopup"
      ></upload-popup>

      <delete-confirmation-popup
        v-show="deleteConfirmation.isDeleteConfirmationPopup"
        :payload="deleteConfirmation"
        @close="closeDelete"
      ></delete-confirmation-popup>

      <reset-popup
        v-if="hasEditAccess && isResetPopup"
        :callback="resetMembers"
        @close="closeResetPopup"
      ></reset-popup>

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">{{ $t('objects.ccenter.members.allMembers') }}</h3>
          <div class="content-header__actions-wrap">
            <filter-search
              :namespace="filtersNamespace"
            ></filter-search>
            <wt-table-actions
              :icons="['refresh']"
              @input="tableActionsHandler"
            >
              <wt-tooltip v-if="hasEditAccess">
                <template v-slot:activator>
                  <wt-icon-btn
                    icon="member-reset"
                    icon-prefix="adm"
                    @click="openResetPopup"
                  ></wt-icon-btn>
                </template>
                {{ $t('objects.ccenter.members.resetMembers.resetMembers') }}
              </wt-tooltip>
              <wt-context-menu
                v-if="hasEditAccess && isNotInboundMember"
                :options="deleteOptions"
                @click="$event.option.method.call()"
              >
                <template v-slot:activator>
                  <wt-icon-action
                    action="delete"
                  ></wt-icon-action>
                </template>
              </wt-context-menu>
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded"></wt-loader>
        <!--        <wt-dummy-->
        <!--          v-if="dummy && isLoaded"-->
        <!--          :src="dummy.src"-->
        <!--          :text="dummy.text && $t(dummy.text)"-->
        <!--          class="dummy-wrapper"-->
        <!--        ></wt-dummy>-->
        <div
          v-show="isLoaded"
          class="table-wrapper"
        >
          <wt-table
            :data="dataList"
            :grid-actions="hasEditAccess && isNotInboundMember"
            :headers="headers"
            sortable
            @sort="sort"
          >
            <template v-slot:name="{ item }">
              <wt-item-link :link="editLink(item)">
                {{ item.name }}
              </wt-item-link>
            </template>
            <template v-slot:createdAt="{ item }">
              {{ prettifyDateTime(item.createdAt) }}
            </template>
            <template v-slot:offeringAt="{ item }">
              <div v-if="item.minOfferingAt">
                {{ prettifyDateTime(item.minOfferingAt) }}
              </div>
            </template>
            <template v-slot:priority="{ item }">
              {{ item.priority }}
            </template>
            <template v-slot:endCause="{ item }">
              <div v-if="item.stopCause">
                {{
                  $te(`objects.ccenter.members.endCause.${item.stopCause.toLowerCase()}`)
                    ? $t(`objects.ccenter.members.endCause.${item.stopCause.toLowerCase()}`)
                    : item.stopCause
                }}
              </div>
            </template>
            <template v-slot:destination="{ item }">
              <div v-if="item.communications.length" class="members__destinations-wrapper">
                {{ item.communications[0].destination }}
                <span
                  v-if="item.communications.length > 1"
                  class="members__destinations-num"
                  @click="readDestinations(item)"
                >+{{ item.communications.length - 1 }}</span>
              </div>
            </template>
            <template v-slot:type="{ item }">
              {{ item.type }}
            </template>
            <template v-slot:agent="{ item }">
              <wt-item-link
                v-if="item.agent"
                :id="item.agent.id"
                :route-name="RouteNames.AGENTS"
              >{{ item.agent.name }}
              </wt-item-link>
            </template>

            <template v-slot:actions="{ item }">
              <wt-icon-action
                action="edit"
                @click="edit(item)"
              ></wt-icon-action>
              <wt-icon-action
                action="delete"
                class="table-action"
                @click="callDelete(item)"
              ></wt-icon-action>
            </template>
          </wt-table>
          <wt-pagination
            :next="isNext"
            :prev="page > 1"
            :size="size"
            debounce
            @change="loadList"
            @input="setSize"
            @next="nextPage"
            @prev="prevPage"
          ></wt-pagination>
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script>
import FilterSearch from '@webitel/ui-sdk/src/modules/QueryFilters/components/filter-search.vue';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';
import tableComponentMixin
  from '../../../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import TheQueueMembersFilters from '../modules/filters/components/the-queue-members-filters.vue';
import destinationsPopup from './communications/opened-queue-member-destinations-popup.vue';
import ResetPopup from './reset-members-popup.vue';
import uploadPopup from './upload-members-popup.vue';

export default {
  name: 'the-queue-members',
  mixins: [tableComponentMixin],
  components: {
    FilterSearch,
    uploadPopup,
    destinationsPopup,
    ResetPopup,
    TheQueueMembersFilters,
  },
  data: () => ({
    namespace: 'ccenter/queues/members',
    isUploadPopup: false,
    communicationsOnPopup: null,
    isDestinationsPopup: false,
    isResetPopup: false,
    csvFile: null,
  }),

  computed: {
    ...mapState({
      parentQueue(state) {
        return getNamespacedState(state, this.namespace).parentQueue;
      },
    }),
    parentId() {
      return this.$route.params.queueId;
    },

    // if is NOT -- member is immutable. NOT prevents actions load by default
    isNotInboundMember() {
      return !(this.parentQueue.type === 1);
    },
    path() {
      const queueUrl = `/contact-center/queues/${this.parentQueue.id}`;
      const membersUrl = `/contact-center/queues/${this.parentQueue.id}/members`;
      return [
        { name: this.$t('objects.ccenter.ccenter') },
        { name: this.parentQueue.name, route: queueUrl },
        { name: this.$tc('objects.ccenter.members.members', 2), route: membersUrl },
      ];
    },
    filtersNamespace() {
      return `${this.namespace}/filters`;
    },
    deleteOptions() {
      const loadListAfterDecorator = (method) => async (...args) => {
        try {
          await method(...args);
        } finally {
          await this.loadList();
        }
      };
      const all = {
        text: this.$t('iconHints.deleteAll'),
        method: loadListAfterDecorator(this.deleteAll),
      };
      const filtered = {
        text: this.$t('iconHints.deleteFiltered'),
        method: loadListAfterDecorator(this.deleteFiltered),
      };

      const selectedCount = this.selectedRows.length;
      const selected = {
        text: this.$t('iconHints.deleteSelected', { count: selectedCount }),
        method: loadListAfterDecorator(this.deleteSelected.bind(this, this.selectedRows)),
      };

      const options = [all, filtered];
      if (selectedCount) options.push(selected);
      return options;
    },

    saveOptions() {
      const importCsv = {
        text: this.$tc('objects.integrations.importCsv.importCsv', 2),
        callback: this.triggerFileInput,
      };
      return [importCsv];
    },

    /* https://my.webitel.com/browse/WTEL-3697 */
    /* Temporarily disabled functionality due to problems with pagination */

    // dummy() {
    //   return !this.dataList.length && {
    //     src: dummyPic,
    //     text: 'objects.ccenter.members.emptyWorkspace',
    //   };
    // },
  },

  methods: {
    prettifyDateTime(timestamp) {
      return new Date(+timestamp).toLocaleString();
    },

    openResetPopup() {
      this.isResetPopup = true;
    },

    closeResetPopup() {
      this.isResetPopup = false;
    },

    readDestinations(item) {
      this.communicationsOnPopup = item.communications;
      this.isDestinationsPopup = true;
    },

    closeDestinationsPopup() {
      this.communicationsOnPopup = null;
      this.isDestinationsPopup = false;
    },

    processCSV(files) {
      const file = files[0];
      if (file) {
        this.csvFile = file;
        this.isUploadPopup = true;
      }
    },

    closeCSVPopup() {
      this.loadList();
      this.isUploadPopup = false;
    },

    triggerFileInput() {
      this.$refs['file-input'].click();
    },

    inputFileHandler(event) {
      const { files } = event.target;
      this.processCSV(files);
      this.clearFileInput();
    },

    clearFileInput() {
      this.$refs['file-input'].value = null;
    },

    create() {
      this.$router.push({
        name: `${RouteNames.MEMBERS}-new`,
        params: { queueId: this.parentId },
      });
    },

    editLink(item) {
      return {
        name: `${RouteNames.MEMBERS}-edit`,
        params: { queueId: this.parentId, id: item.id },
      };
    },

    close() {
      this.$router.go(-1);
      this.resetState(); // reset only after close() bcse at destroy() reset component resets itemId
    },

    ...mapActions({
      setDestinationId(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_DESTINATION_ID`, payload);
      },
      setParentId(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_PARENT_ITEM_ID`, payload);
      },
      setId(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_ID`, payload);
      },
      loadParentQueue(dispatch, payload) {
        return dispatch(`${this.namespace}/LOAD_PARENT_QUEUE`, payload);
      },
      resetState(dispatch, payload) {
        return dispatch(`${this.namespace}/RESET_STATE`, payload);
      },
      resetMembers(dispatch, payload) {
        return dispatch(`${this.namespace}/RESET_MEMBERS`, payload);
      },

      deleteSelected(dispatch, payload) {
        return dispatch(`${this.namespace}/DELETE_BULK`, payload);
      },
      deleteFiltered(dispatch, payload) {
        return dispatch(`${this.namespace}/DELETE_FILTERED`, payload);
      },
      deleteAll(dispatch, payload) {
        return dispatch(`${this.namespace}/DELETE_ALL`, payload);
      },
    }),

  },
  watch: {
    '$route.query': {
      async handler() {
        await this.loadList();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.members__destinations-wrapper {
  display: flex;
}

.members__destinations-num {
  @extend %typo-body-2;

  margin-left: 20px;
  cursor: pointer;
  text-decoration: underline;
}

.upload-file-input {
  position: absolute;
  visibility: hidden;
}
</style>
