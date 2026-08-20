<template>
  <table-filters-panel
    :filter-options="filtersOptions"
    :filters-manager="filtersManager"
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
import { endOfToday, startOfToday } from 'date-fns';
import { storeToRefs } from 'pinia';

import { filtersOptions } from '../configs/filtersOptions';
import { useQueueLogsDatalistStore } from '../stores/datalist/queueLogsDatalistStore';

const emit = defineEmits<{
	hide: [];
}>();

const tableStore = useQueueLogsDatalistStore();
const { filtersManager } = storeToRefs(tableStore);
const { addFilter, updateFilter, deleteFilter, hasFilter } = tableStore;

const todaysRange = () => ({
	from: startOfToday().getTime(),
	to: endOfToday().getTime(),
});

/** the log has always opened on today rather than on everything */
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
</script>

<style scoped></style>
