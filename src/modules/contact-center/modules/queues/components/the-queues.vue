<template>
  <wt-page-wrapper
    class="queues"
  >
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path" />
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
              <wt-icon-btn
                icon="update-calls"
                :disabled="!hasEditAccess"
                @click="isAttemptsResetPopup = true"
              />
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
            :grid-actions="hasTableActions"
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
                :value="item.enabled"
                @change="patchItem({ item, index, prop: 'enabled', value: $event})"
              />
            </template>
            <template #actions="{ item }">
              <wt-tooltip class="table-action">
                <template #activator>
                  <wt-icon-btn
                    icon="queue-member"
                    @click="openMembers(item)"
                  />
                </template>
                {{ $t('iconHints.members') }}
              </wt-tooltip>
              <adm-item-link
                v-if="hasEditAccess"
                :id="item.id"
                :route-name="routeName"
              >
                <wt-icon-action action="edit" />
              </adm-item-link>

              <wt-icon-action
                v-if="hasDeleteAccess"
                action="delete"
                class="table-action"
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

import { useDummy } from '../../../../../app/composables/useDummy';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import QueueTypeProperties from '../lookups/QueueTypeProperties.lookup';
import TheQueuesFilters from '../modules/filters/components/the-queues-filters.vue';
import QueueMembersAPI from '../modules/members/api/queueMembers';
import AttemptsResetPopup from './attempts-reset-popup.vue';
import QueuePopup from './create-queue-popup.vue';

const namespace = 'ccenter/queues';

export default {
  name: 'TheQueues',
  components: { AttemptsResetPopup, TheQueuesFilters, QueuePopup, DeleteConfirmationPopup },
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
    namespace,
    isQueueSelectPopup: false,
    isAttemptsResetPopup: false,
    QueueTypeProperties,
    routeName: RouteNames.QUEUES,
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
  },
  watch: {
    '$route.query': {
      async handler() {
        await this.loadList();
      },
    },
  },

  methods: {
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
