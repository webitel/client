<template>
  <wt-page-wrapper
    class="queues"
  >
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>
    <template #actions-panel>
      <the-queues-filters
        :namespace="filtersNamespace"
      />
    </template>

    <template #main>
      <attempts-reset-popup
        :shown="isAttemptsResetPopup"
        @close="isAttemptsResetPopup = false"
        @reset="resetAttempts"
      />
      <queue-popup
        :shown="isQueueSelectPopup"
        @close="isQueueSelectPopup = false"
      />
      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :callback="deleteCallback"
        :delete-count="deleteCount"
        @close="closeDelete"
      />

      <object-list-popup
        v-show="objectListPopupData"
        :data-list="objectListPopupData"
        :title="objectListPopupTitle"
        :route-name="objectListPopupItemRouteName"
        @close="closeObjectListPopup"
      />

      <global-state-confirmation-popup
        :shown="isGlobalStateConfirmationPopup"
        :affected-count="affectedQueuesCount"
        @confirm="confirmGlobalStateChange"
        @close="closeGlobalStateConfirmation"
      />

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">
            {{ $t('objects.ccenter.queues.allQueues') }}
          </h3>
          <div class="content-header__actions-wrap">
            <wt-search-bar
              :value="search"
              debounce
              @enter="loadList"
              @input="setSearch"
              @search="loadList"
            />
            <!-- NOTE: :key forces component re-render when reverting state after user cancels confirmation -->
            <global-state-switcher
              :key="globalStateSwitcherKey"
              :model-value="globalState"
              @update:model-value="changeGlobalState"
              @on-load-global-state="fetchGlobalState"
            />
            <wt-table-actions
              :icons="['refresh']"
              @input="tableActionsHandler"
            >
              <delete-all-action
                v-if="hasDeleteAccess"
                :class="{'hidden': anySelected}"
                :selected-count="selectedRows.length"
                @click="askDeleteConfirmation({
                  deleted: selectedRows,
                  callback: () => deleteData(selectedRows),
                })"
              />

              <!-- https://webitel.atlassian.net/browse/WTEL-8681 -->
              <!-- <wt-icon-btn
                v-if="isResetActiveAttemptsAllow"
                v-tooltip="$t('objects.ccenter.queues.attemptsReset.resetActiveAttempts')"
                icon="update-calls"
                @click="isAttemptsResetPopup = true"
              /> -->

            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded" />
        <wt-dummy
          v-if="dummy && isLoaded"
          :dark-mode="darkMode"
          :show-action="dummy.showAction"
          :src="dummy.src"
          :text="dummy.text && $t(dummy.text)"
          class="dummy-wrapper"
          @create="create"
        />
        <div
          v-show="dataList.length && isLoaded"
          class="table-wrapper"
        >
          <wt-table
            :data="dataList"
            :headers="headers"
            sortable
            @sort="sort"
          >
            <template #name="{ item }">
              <adm-item-link
                :id="item.id"
                :route-name="routeName"
              >
                {{ item.name }}
              </adm-item-link>
            </template>

            <template #type="{ item }">
              {{ $t(QueueTypeProperties[item.type].locale) }}
            </template>
            <template #activeCalls="{ item }">
              {{ item.active }}
            </template>
            <template #waiting="{ item }">
              {{ item.waiting }}
            </template>
            <template #priority="{ item }">
              {{ item.priority }}
            </template>
            <template #team="{ item }">
              <adm-item-link
                v-if="item.team"
                :id="item.team.id"
                :route-name="RouteNames.TEAMS"
                target="_blank"
              >
                {{ item.team.name }}
              </adm-item-link>
            </template>
            <template #tags="{ item }">
              <div
                v-if="item.tags"
                class="the-queues__tags"
              >
                <wt-chip
                  v-for="(tag, key) of item.tags"
                  :key="key"
                >
                  {{ tag.name }}
                </wt-chip>
              </div>
            </template>
            <template #state="{ item, index }">
              <wt-switcher
                :disabled="!hasEditAccess"
                :model-value="item.enabled"
                @update:model-value="changeStateItem($event, index, item)"
              />
            </template>
            <template #resourceGroups="{ item }">
              <one-plus-many
                v-if="item.resourceGroups"
                :collection="item.resourceGroups"
                :route-name="RouteNames.RESOURCE_GROUPS"
                @input="openResourceGroupsPopup(item)"
              />
            </template>
            <template #resources="{ item }">
              <one-plus-many
                v-if="item.resources"
                :collection="item.resources"
                :route-name="RouteNames.RESOURCES"
                @input="openResourcesPopup(item)"
              />
            </template>
            <template #actions="{ item }">
              <wt-icon-btn
                v-tooltip="$t('iconHints.members')"
                icon="queue-member"
                @click="openMembers(item)"
              />

              <wt-icon-action
                action="edit"
                :disabled="!hasEditAccess"
                @click="edit(item)"
              />
              <wt-icon-action
                action="delete"
                :disabled="!hasDeleteAccess"
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
import DeleteConfirmationPopup
  from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import {
  useDeleteConfirmationPopup,
} from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import debounce from '@webitel/ui-sdk/src/scripts/debounce';

import GlobalStateSwitcher from '../../../../../app/components/global-state-switcher.vue';
import ObjectListPopup from '../../../../../app/components/utils/object-list-popup/object-list-popup.vue';
import OnePlusMany
  from '../../../../../app/components/utils/table-cell/one-plus-many-table-cell/one-plus-many-table-cell.vue';
import { useDummy } from '../../../../../app/composables/useDummy';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import GlobalStateConfirmationPopup
  from '../../../../_shared/global-state-confirmation-popup/global-state-confirmation-popup.vue';
import QueueTypeProperties from '../lookups/QueueTypeProperties.lookup';
import TheQueuesFilters from '../modules/filters/components/the-queues-filters.vue';
import QueueMembersAPI from '../modules/members/api/queueMembers';
import QueueStateAPI from '../modules/state/api/queueState';
import AttemptsResetPopup from './attempts-reset-popup.vue';
import QueuePopup from './create-queue-popup.vue';
const namespace = 'ccenter/queues';

export default {
  name: 'TheQueues',
  components: { ObjectListPopup, OnePlusMany, AttemptsResetPopup, TheQueuesFilters, QueuePopup, DeleteConfirmationPopup, GlobalStateSwitcher, GlobalStateConfirmationPopup },
  mixins: [tableComponentMixin],

  setup() {
    const { dummy } = useDummy({
      namespace,
      showAction: true,
    });
    const {
      isVisible: isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    } = useDeleteConfirmationPopup();

    return {
      dummy,
      isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    };
  },

  data: () => ({
    objectListPopupData: null,
    objectListPopupTitle: '',
    objectListPopupItemRouteName: null,
    namespace,
    isQueueSelectPopup: false,
    isAttemptsResetPopup: false,
    QueueTypeProperties,
    routeName: RouteNames.QUEUES,
    globalState: false,
    isGlobalStateConfirmationPopup: false,
    pendingGlobalStateValue: null,
    affectedQueuesCount: 0,
    globalStateSwitcherKey: 0,
  }),

  computed: {
    path() {
      return [
        {
          name: this.$t('objects.ccenter.ccenter'),
        },
        {
          name: this.$tc('objects.ccenter.queues.queues', 2),
          route: '/contact-center/queues',
        },
      ];
    },
    filtersNamespace() {
      return `${this.namespace}/filters`;
    },
    isResetActiveAttemptsAllow() {
      return this.$store.getters[`userinfo/IS_RESET_ACTIVE_ATTEMPTS_ALLOW`];
    },
    getFilters() {
      return this.$store.getters[`${this.filtersNamespace}/GET_FILTERS`];
    },
  },
  watch: {
    '$route.query': {
      async handler() {
        await this.loadList();
      },
    },
    getFilters: {
      deep: true,
      async handler() {
        await this.fetchGlobalState();
      },
    },
    search: {
      handler() {
        this.debouncedFetchGlobalState();
      },
    },
  },

  async mounted() {
    // Load global state for all items in table
    await this.fetchGlobalState();
  },

  methods: {
    closeObjectListPopup() {
      this.objectListPopupData = null;
      this.objectListPopupTitle = '';
    },
    openResourcesPopup(item) {
      this.objectListPopupData = item.resources;
      this.objectListPopupTitle = this.$tc('objects.ccenter.queues.resources', 2);
      this.objectListPopupItemRouteName = RouteNames.RESOURCES;
    },
    openResourceGroupsPopup(item) {
      this.objectListPopupData = item.resourceGroups;
      this.objectListPopupTitle = this.$tc('objects.ccenter.queues.resourceGroups', 2);
      this.objectListPopupItemRouteName = RouteNames.RESOURCE_GROUPS;
    },
    async fetchGlobalState() {
      const state = await QueueStateAPI.getQueuesGlobalState({
        ...this.getFilters,
        search: this.search,
      });
      this.globalState = !!state?.isAllEnabled;
      this.affectedQueuesCount = state?.potentialRows || 0;
    },
    debouncedFetchGlobalState () {
      this.debouncedFetchGlobalState = debounce(async () => {
        await this.fetchGlobalState();
      });
    },
    changeGlobalState(value) {
      this.pendingGlobalStateValue = value;
      this.isGlobalStateConfirmationPopup = true;
    },
    resetConfirmationState() {
      this.isGlobalStateConfirmationPopup = false;
      this.pendingGlobalStateValue = null;
    },
    async confirmGlobalStateChange() {
      await QueueStateAPI.setQueuesGlobalState({
        enabled: this.pendingGlobalStateValue,
        params: {
          ...this.getFilters,
          search: this.search,
        }
      });
      this.globalState = this.pendingGlobalStateValue;
      this.resetConfirmationState();
      await this.loadDataList();
      await this.fetchGlobalState();
    },
    closeGlobalStateConfirmation() {
      this.resetConfirmationState();
    },
    openMembers(item) {
      return this.$router.push({
        ...this.$route,
        name: `${RouteNames.MEMBERS}`,
        params: {
          queueId: item.id,
        },
      });
    },
    async resetAttempts(resetAttemptsForm) {
      await QueueMembersAPI.resetActiveAttempts(resetAttemptsForm);
      this.isAttemptsResetPopup = false;
    },
    create() {
      this.isQueueSelectPopup = true;
    },
    async changeStateItem(value, index, item) {
      await this.patchItem({
        item,
        index,
        prop: 'enabled',
        value,
      });
      // Update global state after individual queue state change
      await this.fetchGlobalState();
    },
  },
};
</script>

<style lang="scss" scoped>
.the-queues__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}
</style>
