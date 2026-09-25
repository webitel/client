<template>
  <table-filters-panel
    class="user-logs-filters-panel"
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
import { TableFiltersPanelComponent as TableFiltersPanel } from '@webitel/ui-datalist/filters';
import { storeToRefs } from 'pinia';

import { filtersOptions } from '../configs/filtersOptions';
import { useUserLogsDatalistStore } from '../stores/datalist/userLogsDatalistStore';

const tableStore = useUserLogsDatalistStore();
const { filtersManager } = storeToRefs(tableStore);

const { addFilter, updateFilter, deleteFilter } = tableStore;

const resetFilters = () => {
	filtersManager.value.reset({
		exclude: [
			'search',
		],
	});
};
</script>

<style scoped></style>
