<template>
  <table-filters-panel
    :filter-options="filtersOptions"
    :filters-manager="filtersManager"
    static-mode
    @filter:add="addFilter"
    @filter:delete="deleteFilter"
    @filter:reset-all="resetFilters"
    @filter:update="updateFilter"
    @hide="emit('hide')"
  />
</template>

<script lang="ts" setup>
import {
	FilterOption,
	TableFiltersPanelComponent as TableFiltersPanel,
} from '@webitel/ui-datalist/filters';
import { storeToRefs } from 'pinia';

import { defaultJoinedAtFilter } from '../configs/defaultFilters';
import { filtersOptions } from '../configs/filtersOptions';
import { useQueueLogsDatalistStore } from '../stores/datalist/queueLogsDatalistStore';

const emit = defineEmits<{
	hide: [];
}>();

const tableStore = useQueueLogsDatalistStore();
const { filtersManager } = storeToRefs(tableStore);
const { addFilter, updateFilter, deleteFilter, hasFilter } = tableStore;

if (!hasFilter(FilterOption.JoinedAt)) {
	addFilter(defaultJoinedAtFilter());
}

const resetFilters = () => {
	filtersManager.value.reset({
		exclude: [
			'search',
			FilterOption.JoinedAt,
		],
	});
	filtersManager.value.updateFilter(defaultJoinedAtFilter());
};
</script>

<style lang="scss" scoped>
/* three tall date fields read badly in the panel's default four columns */
.table-filters-panel--static-wrapper {
  :deep(.dynamic-filter-panel-wrapper__filters) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
