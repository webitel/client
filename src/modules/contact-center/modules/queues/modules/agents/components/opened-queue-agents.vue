<template>
  <section class="table-section">

    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('objects.ccenter.agents.agents', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-action-bar :include="[IconAction.REFRESH]" @click:refresh="loadDataList">
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
        </wt-action-bar>
      </div>
    </header>

    <div class="table-section__table-wrapper">
      <wt-empty
        v-show="showEmpty"
        :image="imageEmpty"
        :text="textEmpty"
      />

      <wt-loader v-show="isLoading" />

      <wt-table
        v-show="dataList.length && !isLoading"
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
        <template #name="{ item }">
          <wt-item-link
            :link="{
              name: `${RouteNames.Agents}-card`,
              params: { id: item.id },
            }"
            target="_blank"
          >
            {{ item.name }}
          </wt-item-link>
        </template>
        <template #supervisor="{ item }">
          <wt-display-chip-items :items="item.supervisor" />
        </template>
        <template #state="{ item }">
          <wt-indicator
            :color="statusIndicatorColor[snakeToCamel(item.status)]"
            :text="statusIndicatorText[snakeToCamel(item.status)]"
          />
        </template>
        <template #statusType="{ item }">
          {{ formatStatusType(item) }}
        </template>
        <template #skills="{ item }">
          <wt-display-chip-items :items="item.skills" />
        </template>
      </wt-table>
      <wt-pagination
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
import type { EngineAgent } from '@webitel/api-services/gen/models';
import { useNestedTableList } from '@webitel/ui-datalist';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { AgentStatus, IconAction } from '@webitel/ui-sdk/enums';
import { snakeToCamel } from '@webitel/ui-sdk/scripts';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { RouteNames } from '../../../../../../../app/router/_internals/RouteNames.enum';
import { useAgentStatusIndicator } from '../../../../agents/composables/useAgentStatusIndicator';
import { useQueueAgentsDatalistStore } from '../stores/datalist/queueAgentsDatalistStore';

// the card page still passes `namespace` and a vuelidate instance to every tab

const { t } = useI18n();

const { statusIndicatorColor, statusIndicatorText } = useAgentStatusIndicator();

const formatStatusType = (item: EngineAgent) => {
	if (item.statusType) return item.statusType;
	return item.status === AgentStatus.ONLINE ? '' : '—';
};

const tableStore = useNestedTableList({
	useTableStore: useQueueAgentsDatalistStore,
});
const {
	dataList,
	error,
	isLoading,
	page,
	size,
	next,
	shownHeaders,
	filtersManager,
	isFiltersRestoring,
} = storeToRefs(tableStore);
const {
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	addFilter,
	updateFilter,
	deleteFilter,
	columnResize,
	columnReorder,
} = tableStore;

const {
	showEmpty,
	image: imageEmpty,
	text: textEmpty,
} = useTableEmpty({
	dataList,
	error,
	filters: computed(() => filtersManager.value.getAllValues()),
	isLoading,
});
</script>
