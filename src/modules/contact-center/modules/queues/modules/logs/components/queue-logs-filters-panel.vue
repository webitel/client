<template>
  <table-filters-panel
    class="queue-logs-filters-panel"
    :filter-options="filtersOptions"
    :filters-manager="filtersManager"
    static-mode
    @filter:add="addFilter"
    @filter:update="updateFilter"
    @filter:delete="deleteFilter"
    @filter:reset-all="resetFilters"
  />
</template>

<script lang="ts" setup>
import {
	FilterOption,
	TableFiltersPanelComponent as TableFiltersPanel,
} from '@webitel/ui-datalist/filters';
import { storeToRefs } from 'pinia';

import {
	defaultJoinedAtFilter,
	filtersOptions,
} from '../configs/filtersOptions';
import { useQueueLogsDatalistStore } from '../stores/datalist/queueLogsDatalistStore';

const tableStore = useQueueLogsDatalistStore();
const { filtersManager } = storeToRefs(tableStore);

const { addFilter, updateFilter, deleteFilter } = tableStore;

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

<style scoped>
.queue-logs-filters-panel :deep(.dynamic-filter-panel-wrapper__filters) {
  grid-template-columns: repeat(6, 1fr);
}

.queue-logs-filters-panel :deep(.static-filter-field:last-child) {
  grid-column: span 2;
}
</style>
