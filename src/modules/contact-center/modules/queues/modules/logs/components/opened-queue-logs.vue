<template>
  <section class="table-section">
    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('objects.ccenter.queues.logs.logs', 1) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-action-bar
          :include="[IconAction.REFRESH, IconAction.COLUMNS, IconAction.FILTERS]"
          @click:refresh="loadDataList"
        >
          <template #filters>
            <filters-actions-menu
              :filters-manager="filtersManager"
              :filter-options="filtersOptions"
              @filter:reset-all="resetFilters"
            />
          </template>
          <template #search-bar>
            <dynamic-filter-search
              :filters-manager="filtersManager"
              single-search-name="search"
              @filter:add="addFilter"
              @filter:delete="deleteFilter"
              @filter:update="updateFilter"
            />
          </template>
        <template #columns>
          <wt-table-column-select
            :headers="headers"
            enable-search
            @change="updateShownHeaders"
          />
        </template>
        </wt-action-bar>
      </div>
    </header>

    <div class="table-section__table-wrapper">
      <wt-loader v-show="isLoading" />

      <wt-table
        v-show="!isLoading"
        :data="dataList"
        :grid-actions="false"
        :headers="shownHeaders"
        :selectable="false"
        reorderable-columns
        resizable-columns
        sortable
        @sort="updateSort"
        @column-resize="columnResize"
        @column-reorder="columnReorder"
      >
        <template #destination="{ item }">
          <div v-if="item.destination">
            {{ item.destination.destination }}
          </div>
        </template>
        <template #agent="{ item }">
          <div v-if="item.agent">
            {{ item.agent.name }}
          </div>
        </template>
        <template #bucket="{ item }">
          {{ item.bucket?.name }}
        </template>
        <template #joinedAt="{ item }">
          {{ asDate(item.joinedAt) }}
        </template>
        <template #leavingAt="{ item }">
          {{ asDate(item.leavingAt) }}
        </template>
        <template #offeringAt="{ item }">
          {{ asDate(item.offeringAt) }}
        </template>
        <template #duration="{ item }">
          {{ asDuration(item) }}
        </template>
        <template #viewNumber="{ item }">
          {{ item.display }}
        </template>
        <template #attempts="{ item }">
          {{ item.attempts || 0 }}
        </template>
        <template #result="{ item }">
          {{ t(`objects.ccenter.queues.logs.resultName.${item.result}`) }}
        </template>

        <template #column-filter="scope">
          <queue-logs-column-filter v-bind="scope" />
        </template>

        <template #empty>
          <wt-empty
            :image="imageEmpty"
            :text="textEmpty"
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

<script lang="ts" setup>
import {
	DynamicFilterSearchComponent as DynamicFilterSearch,
	FilterOption,
	FiltersActionsMenuComponent as FiltersActionsMenu,
} from '@webitel/ui-datalist/filters';
import { FormatDateMode, IconAction } from '@webitel/ui-sdk/enums';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import { formatDate } from '@webitel/ui-sdk/utils';
import { endOfToday, startOfToday } from 'date-fns';
import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { filtersOptions } from '../configs/filtersOptions';
import { useQueueLogsDatalistStore } from '../stores/datalist/queueLogsDatalistStore';
import QueueLogsColumnFilter from './queue-logs-column-filter.vue';

// the card page still passes `namespace` and a vuelidate instance to every tab

const { t } = useI18n();
const route = useRoute();

const parentId = computed(() => route.params.id as string);
const isNewQueue = computed(() => !parentId.value || parentId.value === 'new');

const tableStore = useQueueLogsDatalistStore();
const {
	dataList,
	error,
	isLoading,
	page,
	size,
	next,
	shownHeaders,
	headers,
	filtersManager,
} = storeToRefs(tableStore);
const {
	initialize,
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	addFilter,
	updateFilter,
	deleteFilter,
	updateShownHeaders,
	columnResize,
	columnReorder,
	hasFilter,
} = tableStore;

const todaysRange = () => ({
	from: startOfToday().getTime(),
	to: endOfToday().getTime(),
});

if (!hasFilter(FilterOption.JoinedAt)) {
	addFilter({
		name: FilterOption.JoinedAt,
		value: todaysRange(),
	});
}

const resetFilters = () => {
	filtersManager.value.reset({
		exclude: [
			'search',
			FilterOption.JoinedAt,
		],
	});
	filtersManager.value.updateFilter({
		name: FilterOption.JoinedAt,
		value: todaysRange(),
	});
};

if (!isNewQueue.value)
	initialize({
		parentId: parentId.value,
	});

watch(parentId, (id, previous) => {
	if (id && id !== 'new' && previous === 'new')
		initialize({
			parentId: id,
		});
});

const asDate = (value?: number | string) =>
	value ? formatDate(+value, FormatDateMode.DATETIME) : '';

const asDuration = (item: { joinedAt?: number; leavingAt?: number }) =>
	convertDuration(((item.leavingAt ?? 0) - (item.joinedAt ?? 0)) / 1000);

const { image: imageEmpty, text: textEmpty } = useTableEmpty({
	dataList,
	error,
	filters: computed(() => filtersManager.value.getAllValues()),
	isLoading,
});
</script>

<style
  lang="scss"
  scoped
></style>
