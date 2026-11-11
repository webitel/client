<template>
  <wt-page-wrapper
    :actions-panel="isFiltersPanelShown"
    class="the-queues table-page"
  >
    <template #header>
      <wt-page-header
        :primary-disabled="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #actions-panel>
      <table-filters-panel
        :filter-options="filtersOptions"
        :filters-manager="filtersManager"
        :has-read-access="userinfoStore.hasReadAccess"
        static-mode
        @filter:add="addFilter"
        @filter:update="updateFilter"
        @filter:delete="deleteFilter"
        @filter:reset-all="resetFilters"
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

      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ t('objects.ccenter.queues.allQueues') }}
          </h3>
          <div class="table-title__actions-wrap">
            <wt-action-bar
              :include="[IconAction.REFRESH, IconAction.FILTERS, IconAction.DELETE]"
              :disabled:delete="!hasDeleteAccess || !selected.length"
              @click:refresh="loadDataList"
              @click:filters="isFiltersPanelShown = !isFiltersPanelShown"
              @click:delete="
                askDeleteConfirmation({
                  deleted: selected,
                  callback: () => deleteEls(selected),
                })
              "
            >
              <template #filters="{ action, onClick }">
                <wt-badge :hidden="!hasPanelFilters">
                  <wt-icon-action
                    :action="action"
                    @click="onClick"
                  />
                </wt-badge>
              </template>

              <template #search-bar>
                <dynamic-filter-search
                  :filters-manager="filtersManager"
                  :is-filters-restoring="isFiltersRestoring"
                  single-search-name="search"
                  @filter:add="addFilter"
                  @filter:update="updateFilter"
                  @filter:delete="deleteFilter"
                />
              </template>

              <template #switcher>
                <queues-global-state-switcher :disabled="!hasUpdateAccess" />
              </template>

              <!-- https://webitel.atlassian.net/browse/WTEL-8681 -->
              <!-- <wt-icon-btn
                v-if="isResetActiveAttemptsAllow"
                v-tooltip="t('objects.ccenter.queues.attemptsReset.resetActiveAttempts')"
                icon="update-calls"
                @click="isAttemptsResetPopup = true"
              /> -->
            </wt-action-bar>
          </div>
        </header>

        <div class="table-section__table-wrapper">
          <wt-loader v-show="isLoading" />

          <wt-table
            v-show="!isLoading"
            :data="dataList"
            :headers="shownHeaders"
            :selected="selected"
            reorderable-columns
            resizable-columns
            sortable
            @column-reorder="columnReorder"
            @column-resize="columnResize"
            @sort="updateSort"
            @update:selected="updateSelected"
          >
            <template #name="{ item }">
              <wt-item-link
                :link="{
                  name: `${RouteNames.QUEUES}-card`,
                  params: { id: item.id },
                }"
              >
                {{ item.name }}
              </wt-item-link>
            </template>

            <template #type="{ item }">
              {{ queueTypeName(item.type) }}
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
              <wt-item-link
                v-if="item.team"
                :link="{
                  name: `${RouteNames.TEAMS}-card`,
                  params: { id: item.team.id },
                }"
                target="_blank"
              >
                {{ item.team.name }}
              </wt-item-link>
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
                :disabled="!hasUpdateAccess"
                :model-value="item.enabled"
                @update:model-value="changeStateItem(index, $event)"
              />
            </template>
            <template #resourceGroups="{ item }">
              <wt-display-chip-items
                v-if="item.resourceGroups?.length"
                :items="item.resourceGroups"
              >
                <template #first-item>
                  <wt-item-link
                    :link="{
                      name: `${RouteNames.RESOURCE_GROUPS}-card`,
                      params: { id: item.resourceGroups[0].id },
                    }"
                    target="_blank"
                  >
                    {{ item.resourceGroups[0].name }}
                  </wt-item-link>
                </template>
                <template #items="{ items }">
                  <div
                    v-for="listItem of items"
                    :key="listItem.id"
                  >
                    <wt-item-link
                      :link="{
                        name: `${RouteNames.RESOURCE_GROUPS}-card`,
                        params: { id: listItem.id },
                      }"
                      target="_blank"
                    >
                      {{ listItem.name }}
                    </wt-item-link>
                  </div>
                </template>
              </wt-display-chip-items>
            </template>
            <template #resources="{ item }">
              <wt-display-chip-items
                v-if="item.resources?.length"
                :items="item.resources"
              >
                <template #first-item>
                  <wt-item-link
                    :link="{
                      name: `${RouteNames.RESOURCES}-card`,
                      params: { id: item.resources[0].id },
                    }"
                    target="_blank"
                  >
                    {{ item.resources[0].name }}
                  </wt-item-link>
                </template>
                <template #items="{ items }">
                  <div
                    v-for="listItem of items"
                    :key="listItem.id"
                  >
                    <wt-item-link
                      :link="{
                        name: `${RouteNames.RESOURCES}-card`,
                        params: { id: listItem.id },
                      }"
                      target="_blank"
                    >
                      {{ listItem.name }}
                    </wt-item-link>
                  </div>
                </template>
              </wt-display-chip-items>
            </template>
            <template #column-filter="scope">
              <queues-column-filter v-bind="scope" />
            </template>

            <template #empty>
              <wt-empty
                :disabled-primary-action="!hasCreateAccess"
                :image="imageEmpty"
                :primary-action-text="primaryActionTextEmpty"
                :text="textEmpty"
                @click:primary="create"
              />
            </template>

            <template #actions="{ item }">
              <wt-icon-btn
                v-tooltip="t('iconHints.members')"
                icon="queue-member"
                @click="openMembers(item)"
              />
              <wt-icon-action
                :disabled="!hasUpdateAccess"
                action="edit"
                @click="edit(item)"
              />
              <wt-icon-action
                :disabled="!hasDeleteAccess"
                action="delete"
                @click="
                  askDeleteConfirmation({
                    deleted: [item],
                    callback: () => deleteEls([item]),
                  })
                "
              />
            </template>
          </wt-table>

          <wt-pagination
            v-show="dataList.length"
            :next="next"
            :prev="page > 1"
            :size="size"
            debounce
            @change="updateSize"
            @next="updatePage(page + 1)"
            @prev="updatePage(page - 1)"
          />
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script lang="ts" setup>
import { QueueMembersAPI } from '@webitel/api-services/api';
import {
	DynamicFilterSearchComponent as DynamicFilterSearch,
	TableFiltersPanelComponent as TableFiltersPanel,
} from '@webitel/ui-datalist/filters';
import { IconAction } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import { useUserinfoStore } from '../../../../userinfo/stores/userinfoStore';
import { filtersOptions } from '../configs/filtersOptions';
import QueueTypeProperties from '../lookups/QueueTypeProperties.lookup';
import { useQueuesDatalistStore } from '../stores/datalist/queuesDatalistStore';
import { useQueuesGlobalStateStore } from '../stores/globalState/queuesGlobalStateStore';
import type { Queue } from '../types/Queue';
import AttemptsResetPopup from './attempts-reset-popup.vue';
import QueuePopup from './create-queue-popup.vue';
import QueuesColumnFilter from './queues-column-filter.vue';
import QueuesGlobalStateSwitcher from './queues-global-state-switcher.vue';

const { t } = useI18n();
const userinfoStore = useUserinfoStore();
const router = useRouter();

const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } =
	useUserAccessControl();

const tableStore = useQueuesDatalistStore();
const { fetchGlobalState } = useQueuesGlobalStateStore();

const {
	dataList,
	error,
	isLoading,
	page,
	size,
	next,
	selected,
	shownHeaders,
	filtersManager,
	isFiltersRestoring,
} = storeToRefs(tableStore);

const {
	initialize,
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	updateSelected,
	deleteEls,
	patchItemProperty,
	hasFilter,
	addFilter,
	updateFilter,
	deleteFilter,
	columnResize,
	columnReorder,
} = tableStore;

initialize();

const isFiltersPanelShown = ref(false);

const hasPanelFilters = computed(() =>
	filtersOptions.some((filter) =>
		typeof filter === 'string'
			? hasFilter(filter)
			: !filter.notDeletable && hasFilter(filter.name),
	),
);

const isQueueSelectPopup = ref(false);
const isAttemptsResetPopup = ref(false);

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const path = computed(() => [
	{
		name: t('objects.ccenter.ccenter'),
	},
	{
		name: t('objects.ccenter.queues.queues', 2),
		route: '/contact-center/queues',
	},
]);

const resetFilters = () => {
	filtersManager.value.reset({
		exclude: [
			'search',
		],
	});
};

const queueTypeName = (type: number) => {
	const properties = QueueTypeProperties[type];
	return properties ? t(properties.locale) : '';
};

const create = () => {
	isQueueSelectPopup.value = true;
};

const edit = (item: Queue) =>
	router.push({
		name: `${RouteNames.QUEUES}-card`,
		params: {
			id: item.id,
		},
	});

const openMembers = (item: Queue) =>
	router.push({
		name: RouteNames.MEMBERS,
		params: {
			queueId: item.id,
		},
	});

const changeStateItem = async (index: number, value: boolean) => {
	await patchItemProperty({
		index,
		path: 'enabled',
		value,
	});
	// the global switcher reflects the whole filtered set, so it moves too
	await fetchGlobalState();
};

const resetAttempts = async (resetAttemptsForm: unknown) => {
	await QueueMembersAPI.resetActiveAttempts(resetAttemptsForm);
	isAttemptsResetPopup.value = false;
};

const {
	image: imageEmpty,
	text: textEmpty,
	primaryActionText: primaryActionTextEmpty,
} = useTableEmpty({
	dataList,
	error,
	filters: computed(() => filtersManager.value.getAllValues()),
	isLoading,
});
</script>

<style scoped>
.the-queues__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}
</style>
