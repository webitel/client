<template>
  <section class="table-section">
    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('objects.system.changelogs.logs.logs', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-action-bar
          :include="[IconAction.REFRESH, IconAction.DOWNLOAD, IconAction.FILTERS, IconAction.COLUMNS]"
          @click:refresh="loadDataList"
          @click:download="downloadCSV"
          @click:filters="emit('click:filters')"
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
        @column-reorder="columnReorder"
        @column-resize="columnResize"
        @sort="updateSort"
      >
        <template #action="{ item }">
          {{ t(`objects.system.changelogs.logs.actionType.${item.action}`) }}
        </template>
        <template #date="{ item }">
          {{ formatDateTime(item.date) }}
        </template>
        <template #object="{ item }">
          <adm-item-link
            v-if="item.object"
            :id="item.configId"
            :route-name="RouteNames.CHANGELOGS"
          >
            {{ item.object.name }}
          </adm-item-link>
        </template>
        <template #record="{ item }">
          <record-link :item="item" />
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
import { UserLogsAPI } from '@webitel/api-services/api';
import type { LoggerLog } from '@webitel/api-services/gen/models';
import { useNestedTableList } from '@webitel/ui-datalist';
import {
	DynamicFilterSearchComponent as DynamicFilterSearch,
	FilterOption,
} from '@webitel/ui-datalist/filters';
import { FormatDateMode, IconAction } from '@webitel/ui-sdk/enums';
import { useCSVExport } from '@webitel/ui-sdk/src/modules/CSVExport/composables/useCSVExport';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { formatDate } from '@webitel/ui-sdk/utils';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import RecordLink from '../../../../../../system/modules/changelogs/modules/logs/components/changelog-logs-record-link.vue';
import { useUsersCardStore } from '../../../stores/card/usersCardStore';
import { defaultDateFilter } from '../configs/filtersOptions';
import { useUserLogsDatalistStore } from '../stores/datalist/userLogsDatalistStore';

const emit = defineEmits<{
	'click:filters': [];
}>();

const { t } = useI18n();

const usersCardStore = useUsersCardStore();
const { itemId: userId, originalItemInstance: user } =
	storeToRefs(usersCardStore);

const tableStore = useUserLogsDatalistStore();
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
	isFiltersRestoring,
} = storeToRefs(tableStore);
const {
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	hasFilter,
	addFilter,
	updateFilter,
	deleteFilter,
	updateShownHeaders,
	columnResize,
	columnReorder,
} = tableStore;

if (!hasFilter(FilterOption.Date)) {
	addFilter(defaultDateFilter());
}

useNestedTableList({
	useTableStore: useUserLogsDatalistStore,
});

const hasPanelFilters = computed(() =>
	[
		FilterOption.Action,
		FilterOption.Object,
	].some((name) => hasFilter(name)),
);

const formatDateTime = (value?: number | string) =>
	formatDate(value, FormatDateMode.DATETIME);

const { initCSVExport, exportCSV } = useCSVExport({
	selected: ref([]),
});

const getDataForCSVExport = async (params: Record<string, unknown>) => {
	const { items, next } = await UserLogsAPI.getList({
		...params,
		parentId: userId.value,
	});

	return {
		items: items.map((item: LoggerLog) => ({
			...item,
			date: formatDateTime(item.date),
		})),
		next,
	};
};

const downloadCSV = () => {
	initCSVExport(getDataForCSVExport, {
		filename: `${user.value?.name}-logs-at-${formatDate(new Date(), FormatDateMode.DATETIME)}`,
	});
	return exportCSV(filtersManager.value.getAllValues());
};

const { image: imageEmpty, text: textEmpty } = useTableEmpty({
	dataList,
	error,
	filters: computed(() => filtersManager.value.getAllValues()),
	isLoading,
});
</script>
