<template>
  <wt-page-wrapper class="members">
    <template #header>
      <wt-page-header
        :hide-primary="!hasEditAccess || !isNotInboundMember"
        :primary-action="create"
        :secondary-action="close"
      >
        <template #primary-action>
          <wt-button-select
            :options="saveOptions"
            @click="create"
            @click:option="({ callback }) => callback()"
          >
            {{ $t('objects.add') }}
          </wt-button-select>
          <input
            ref="file-input"
            :accept="'.csv'"
            class="upload-file-input"
            type="file"
            @change="inputFileHandler"
          >
        </template>
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>
    <template #actions-panel>
      <the-queue-members-filters
        :namespace="filtersNamespace"
      />
    </template>
    <template #main>
      <destinations-popup
        v-if="isDestinationsPopup"
        :communications="communicationsOnPopup"
        @close="closeDestinationsPopup"
      />

      <upload-popup
        :file="csvFile"
        :parent-id="parentId"
        @close="closeCSVPopup"
      />

      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :callback="deleteCallback"
        :delete-count="deleteCount"
        @close="closeDelete"
      />

      <reset-popup
        :shown="hasEditAccess && isResetPopup"
        :callback="resetMembers"
        @close="closeResetPopup"
      />

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">
            {{ $t('objects.ccenter.members.allMembers') }}
          </h3>
          <div class="content-header__actions-wrap">
            <filter-search
              :namespace="filtersNamespace"
            />
            <wt-table-actions
              :icons="['refresh']"
              @input="tableActionsHandler"
            >
              <wt-icon-btn
                v-if="hasEditAccess"
                v-tooltip="$t('objects.ccenter.members.resetMembers.resetMembers')"
                icon="member-reset"
                icon-prefix="adm"
                @click="openResetPopup"
              />

              <wt-context-menu
                v-if="hasEditAccess && isNotInboundMember"
                :options="deleteOptions"
                @click="$event.option.method.call()"
              >
                <template #activator="{ toggle }">
                  <wt-icon-action
                    action="delete"
                    @click="toggle"
                  />
                </template>
              </wt-context-menu>
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded" />
                <wt-dummy
                  v-if="dummy && isLoaded"
                  :src="dummy.src"
                  :dark-mode="darkMode"
                  :text="dummy.text && $t(dummy.text)"
                  class="dummy-wrapper"
                ></wt-dummy>
        <div
          v-show="dataList.length && isLoaded"
          class="table-wrapper"
        >
          <wt-table
            :data="dataList"
            :grid-actions="hasEditAccess && isNotInboundMember"
            :headers="headers"
            sortable
            @sort="sort"
          >
            <template #name="{ item }">
              <wt-item-link
                :link="editLink(item)">
                {{ item.name }}
              </wt-item-link>
            </template>
            <template #createdAt="{ item }">
              {{ prettifyDateTime(item.createdAt) }}
            </template>
            <template #offeringAt="{ item }">
              <div v-if="item.minOfferingAt">
                {{ prettifyDateTime(item.minOfferingAt) }}
              </div>
            </template>
            <template #priority="{ item }">
              {{ item.priority }}
            </template>
            <template #endCause="{ item }">
              <div v-if="item.stopCause">
                {{
                  $te(`objects.ccenter.members.endCause.${item.stopCause.toLowerCase()}`)
                    ? $t(`objects.ccenter.members.endCause.${item.stopCause.toLowerCase()}`)
                    : item.stopCause
                }}
              </div>
            </template>
            <template #destination="{ item }">
              <div
                v-if="item.communications.length"
                class="members__destinations-wrapper"
              >
                {{ item.communications[0].destination }}
                <span
                  v-if="item.communications.length > 1"
                  class="members__destinations-num"
                  @click="readDestinations(item)"
                >+{{ item.communications.length - 1 }}</span>
              </div>
            </template>
            <template #type="{ item }">
              {{ item.type }}
            </template>
            <template #agent="{ item }">
              <wt-item-link
                v-if="item.agent"
                :link="editAgentsLink(item.agent)"
                target="_blank"
              >
                {{ item.agent.name }}
              </wt-item-link>
            </template>

            <template #actions="{ item }">
              <wt-icon-action
                action="edit"
                @click="edit(item)"
              />
              <wt-icon-action
                action="delete"
                @click="askDeleteConfirmation({
                  deleted: [item],
                  callback: () => deleteData(item),
                })"
              />
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
          />
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script>
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import FilterSearch from '@webitel/ui-sdk/src/modules/QueryFilters/components/filter-search.vue';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { computed } from 'vue';
import { mapActions, mapState, useStore } from 'vuex';

import { useDummy } from '../../../../../../../app/composables/useDummy';
import tableComponentMixin from '../../../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import dummyPicDark from '../assets/adm-dummy-members-dark.svg';
import dummyPicLight from '../assets/adm-dummy-members-light.svg';
import TheQueueMembersFilters from '../modules/filters/components/the-queue-members-filters.vue';
import destinationsPopup from './communications/opened-queue-member-destinations-popup.vue';
import ResetPopup from './reset-members-popup.vue';
import uploadPopup from './upload-members-popup.vue';

const namespace = 'ccenter/queues/members';

export default {
  name: 'TheQueueMembers',
  components: {
    FilterSearch,
    uploadPopup,
    destinationsPopup,
    ResetPopup,
    TheQueueMembersFilters,
    DeleteConfirmationPopup,
  },
  mixins: [tableComponentMixin],

  setup() {
    const store = useStore();
    const darkMode = computed(() => store.getters['appearance/DARK_MODE']);
    const dummyPic = computed(() => (darkMode.value ? dummyPicDark : dummyPicLight));

    const { dummy } = useDummy({
      namespace,
      showAction: true,
      dummyPic,
      dummyText: 'objects.ccenter.members.emptyWorkspace',
    });
    const {
      isVisible: isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    } = useDeleteConfirmationPopup();

    return {
      isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
      dummy,
    };
  },

  data: () => ({
    namespace: 'ccenter/queues/members',
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
    // ...mapGetters('appearance', {
    //   darkMode: 'DARK_MODE',
    // }),
    parentId() {
      return this.$route.params.queueId;
    },
    // if is NOT -- member is immutable. NOT prevents actions load by default
    isNotInboundMember() {
      return !(this.parentQueue.type === 1);
    },
    path() {
      const baseUrl = `/contact-center/queues/${this.parentQueue.id}`;
      return [
        {
          name: this.$t('objects.ccenter.ccenter'),
        },
        {
          name: this.parentQueue.name,
          route: baseUrl,
        },
        {
          name: this.$tc('objects.ccenter.members.members', 2),
          route: `${baseUrl}/members`,
        },
      ];
    },
    filtersNamespace() {
      return `${this.namespace}/filters`;
    },
    deleteOptions() {
      const loadListAfterDecorator =
        (method) =>
        async (...args) => {
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
        text: this.$t('iconHints.deleteSelected', {
          count: selectedCount,
        }),
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
  },

  watch: {
    '$route.query': {
      async handler() {
        await this.loadList();
      },
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
      }
    },

    closeCSVPopup() {
      this.csvFile = null;
      this.loadList();
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
        name: `${RouteNames.MEMBERS}-card`,
        params: { queueId: this.parentId, id: 'new'},
      });
    },

    editLink(item) {
      return {
        name: `${RouteNames.MEMBERS}-card`,
        params: { queueId: this.parentId, id: item.id },
      };
    },

     editAgentsLink(item) {
      return {
        name: `${RouteNames.AGENTS}-card`,
        params: { id: item.id },
      };
    },

    close() {
      this.$router.push({name: RouteNames.QUEUES});
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
};
</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/main' as *;

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
