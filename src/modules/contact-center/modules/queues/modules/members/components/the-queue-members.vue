<template>
  <wt-page-wrapper class="members">
    <template v-slot:header>
      <object-header
        :hide-primary="!hasEditAccess || !isNotInboundMember"
        :primary-action="create"
        :secondary-action="close"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </object-header>
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
                    icon="clear"
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
                  <delete-action></delete-action>
                </template>
              </wt-context-menu>
              <upload-file-icon-btn
                v-if="hasEditAccess && isNotInboundMember"
                class="icon-action"
                accept=".csv"
                @change="processCSV"
              ></upload-file-icon-btn>
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded"></wt-loader>
        <div class="table-wrapper" v-show="isLoaded">
          <wt-table
            :headers="headers"
            :data="dataList"
            :grid-actions="hasEditAccess && isNotInboundMember"
            sortable
            @sort="sort"
          >
            <template slot="name" slot-scope="{ item }">
              <item-link :link="editLink(item)">
                {{ item.name }}
              </item-link>
            </template>
            <template slot="createdAt" slot-scope="{ item }">
              {{ prettifyDateTime(item.createdAt) }}
            </template>
            <template slot="offeringAt" slot-scope="{ item }">
              <div v-if="item.minOfferingAt">
                {{ prettifyDateTime(item.minOfferingAt) }}
              </div>
            </template>
            <template slot="priority" slot-scope="{ item }">
              {{ item.priority }}
            </template>
            <template slot="endCause" slot-scope="{ item }">
              <div v-if="item.stopCause">
                {{
                  $te(`objects.ccenter.members.endCause.${item.stopCause.toLowerCase()}`)
                    ? $t(`objects.ccenter.members.endCause.${item.stopCause.toLowerCase()}`)
                    : item.stopCause
                }}
              </div>
            </template>
            <template slot="destination" slot-scope="{ item }">
              <div class="members__destinations-wrapper" v-if="item.communications.length">
                {{ item.communications[0].destination }}
                <span class="members__destinations-num"
                      v-if="item.communications.length > 1"
                      @click="readDestinations(item)"
                >+{{ item.communications.length - 1 }}</span>
              </div>
            </template>
            <template slot="type" slot-scope="{ item }">
              {{ item.type }}
            </template>
            <template slot="agent" slot-scope="{ item }">
              <item-link
                v-if="item.agent"
                :route-name="RouteNames.AGENTS"
                :id="item.agent.id"
              >
                {{ item.agent.name }}
              </item-link>
            </template>

            <template slot="actions" slot-scope="{ item }">
              <edit-action
                @click="edit(item)"
              ></edit-action>
              <delete-action
                @click="callDelete(item)"
              ></delete-action>
            </template>
          </wt-table>
          <wt-pagination
            :size="size"
            :next="isNext"
            :prev="page > 1"
            debounce
            @next="nextPage"
            @prev="prevPage"
            @input="setSize"
            @change="loadList"
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
import UploadFileIconBtn from '../../../../../../../app/components/utils/upload-file-icon-btn.vue';
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
    UploadFileIconBtn,
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
  text-decoration: underline;
  cursor: pointer;
}
</style>
