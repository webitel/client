<template>
  <wt-popup
    :shown="!!historyId"
    overflow
    @close="close"
  >
    <template #title>
      {{ t('objects.directory.devices.deviceHistory') }}
    </template>
    <template #main>
      <section class="history-popup table-section">
        <table-filters-panel
          class="history-popup__filters-panel"
          :filter-options="historyFiltersOptions"
          :filters-manager="filtersManager"
          static-mode
          @filter:add="addFilter"
          @filter:delete="deleteFilter"
          @filter:reset-all="resetFilters"
          @filter:update="updateFilter"
        />

        <header class="table-title">
          <div class="table-title__actions-wrap">
            <wt-action-bar
              :include="[IconAction.REFRESH, IconAction.COLUMNS]"
              @click:refresh="loadDataList"
            >
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
            @column-reorder="columnReorder"
            @column-resize="columnResize"
          >
            <template #loggedIn="{ item }">
              {{ prettifyTime(item.loggedIn) }}
            </template>
            <template #loggedOut="{ item }">
              {{ prettifyTime(item.loggedOut) }}
            </template>
            <template #user="{ item }">
              <div v-if="item.user">
                {{ item.user.name }}
              </div>
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
    <template #actions>
      <wt-button @click="close">
        {{ t('objects.ok') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import {
	FilterOption,
	TableFiltersPanelComponent as TableFiltersPanel,
} from '@webitel/ui-datalist/filters';
import { FormatDateMode, IconAction } from '@webitel/ui-sdk/enums';
import { formatDate } from '@webitel/ui-sdk/utils';
import { endOfToday, startOfToday } from 'date-fns';
import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { historyFiltersOptions } from '../configs/historyFiltersOptions';
import { useDevicesHistoryDatalistStore } from '../stores';

const emit = defineEmits<{
	close: [];
}>();

const { t } = useI18n();
const route = useRoute();

const historyStore = useDevicesHistoryDatalistStore();

const {
	dataList,
	isLoading,
	page,
	size,
	next,
	headers,
	shownHeaders,
	filtersManager,
} = storeToRefs(historyStore);

const {
	initialize,
	loadDataList,
	updatePage,
	updateSize,
	addFilter,
	updateFilter,
	deleteFilter,
	hasFilter,
	updateShownHeaders,
	columnResize,
	columnReorder,
} = historyStore;

const historyId = computed(() => route.params.historyId as string | undefined);

const todaysRange = () => ({
	from: startOfToday().getTime(),
	to: endOfToday().getTime(),
});

const ensureCreatedAtFilter = () => {
	if (hasFilter(FilterOption.CreatedAt)) return;

	addFilter({
		name: FilterOption.CreatedAt,
		value: todaysRange(),
	});
};

const resetFilters = () => {
	filtersManager.value.reset({
		exclude: [
			FilterOption.CreatedAt,
		],
	});
	filtersManager.value.updateFilter({
		name: FilterOption.CreatedAt,
		value: todaysRange(),
	});
};

const prettifyTime = (time?: string | number) => {
	if (!time) return 'none';
	return formatDate(+time, FormatDateMode.DATETIME);
};

const close = () => emit('close');

watch(
	historyId,
	(id) => {
		if (!id) return;

		ensureCreatedAtFilter();
		initialize({
			parentId: id,
		});
	},
	{
		immediate: true,
	},
);
</script>

<style lang="scss" scoped>
.table-title {
  justify-content: flex-end;
}

.history-popup__filters-panel :deep(.dynamic-filter-panel-wrapper) {
  align-items: end;
}

.history-popup__filters-panel :deep(.dynamic-filter-panel-wrapper__filters) {
  grid-template-columns: repeat(2, 1fr);
}
</style>
