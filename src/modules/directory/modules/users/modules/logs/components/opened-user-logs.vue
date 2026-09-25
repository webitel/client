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
          @click:download="exportCSV()"
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
          {{ asDate(item.date) }}
        </template>
        <template #object="{ item }">
          <adm-item-link
            v-if="item.object"
            :id="item.configId"
            :route-name="changelogsRouteName"
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
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { FormatDateMode, IconAction } from '@webitel/ui-sdk/enums';
import { useCSVExport } from '@webitel/ui-sdk/src/modules/CSVExport/composables/useCSVExport';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { formatDate } from '@webitel/ui-sdk/utils';
import { storeToRefs } from 'pinia';
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

// the card page still passes `namespace` and a vuelidate instance to every tab

import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import RecordLink from '../../../../../../system/modules/changelogs/modules/logs/components/changelog-logs-record-link.vue';
import { filterConfigs } from '../configs/filtersOptions';
import { useUserLogsDatalistStore } from '../stores/datalist/userLogsDatalistStore';

const { t } = useI18n();
const route = useRoute();
const store = useStore();

const changelogsRouteName = RouteNames.CHANGELOGS;

const parentId = computed(() => route.params.id as string);
const isNewUser = computed(() => !parentId.value || parentId.value === 'new');

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
	selected,
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

const emit = defineEmits<{
	'click:filters': [];
}>();

const hasPanelFilters = computed(() =>
	Object.keys(filterConfigs).some((name) => hasFilter(name)),
);

if (!isNewUser.value) {
	initialize({
		parentId: parentId.value,
	});
}

watch(parentId, (id, previous) => {
	if (id && id !== 'new' && previous === 'new')
		initialize({
			parentId: id,
		});
});

const asDate = (value?: number | string) =>
	value ? formatDate(+value, FormatDateMode.DATETIME) : '';

const { initCSVExport, exportCSV } = useCSVExport({
	selected,
});

const getDataForCSVExport = async (params: Record<string, unknown>) => {
	const { items, next } = await UserLogsAPI.getList({
		...params,
		parentId: parentId.value,
	});

	return {
		items: items.map((item: Record<string, unknown>) => ({
			...item,
			date: asDate(item.date as number | string),
		})),
		next,
	};
};

onMounted(() => {
	const { itemInstance } = getNamespacedState(store.state, 'directory/users');
	initCSVExport(getDataForCSVExport, {
		filename: `${itemInstance.name}-logs-at-${formatDate(new Date(), FormatDateMode.DATETIME)}`,
	});
});

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
