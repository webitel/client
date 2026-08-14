<template>
  <section class="table-section">
    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('objects.ccenter.queues.logs.logs', 1) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-action-bar
          :include="[IconAction.REFRESH, IconAction.FILTERS]"
          @click:filters="isFiltersPanelShown = !isFiltersPanelShown"
          @click:refresh="loadDataList"
        >
          <template #filters="{ action, onClick }">
            <wt-badge :hidden="!filtersManager.hasFilters">
              <wt-icon-action
                :action="action"
                @click="onClick"
              />
            </wt-badge>
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
        </wt-action-bar>
      </div>
    </header>

    <!--
      The panel lives in the tab rather than in the card's actions panel. The
      card used to render it through a `currentTab.filters` component name,
      which meant the page had to know about one tab's internals.
    -->
    <the-queue-logs-filters
      v-show="isFiltersPanelShown"
      @hide="isFiltersPanelShown = false"
    />

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
        sortable
        @sort="updateSort"
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
          <div v-if="item.destination">
            {{ item.destination.description }}
          </div>
        </template>
        <template #attempts="{ item }">
          {{ item.attempts || 0 }}
        </template>
        <template #result="{ item }">
          {{ t(`objects.ccenter.queues.logs.resultName.${item.result}`) }}
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
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { FormatDateMode, IconAction } from '@webitel/ui-sdk/enums';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import { formatDate } from '@webitel/ui-sdk/utils';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { useQueueLogsDatalistStore } from '../stores';
import TheQueueLogsFilters from './the-queue-logs-filters.vue';

// the card page still passes `namespace` and a vuelidate instance to every tab

const { t } = useI18n();
const route = useRoute();

const isFiltersPanelShown = ref(false);

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
} = tableStore;

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

<style
  lang="scss"
  scoped
></style>
