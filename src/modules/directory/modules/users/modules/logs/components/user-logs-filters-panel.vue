<template>
  <table-filters-panel
    :filter-options="filtersOptions"
    :filters-manager="filtersManager"
    :has-read-access="userinfoStore.hasReadAccess"
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

import { useUserinfoStore } from '../../../../../../userinfo/stores/userinfoStore';
import { defaultDateFilter, filtersOptions } from '../configs/filtersOptions';
import { useUserLogsDatalistStore } from '../stores/datalist/userLogsDatalistStore';

const userinfoStore = useUserinfoStore();
const tableStore = useUserLogsDatalistStore();
const { filtersManager } = storeToRefs(tableStore);
const { addFilter, updateFilter, deleteFilter } = tableStore;

const resetFilters = () => {
	filtersManager.value.reset({
		exclude: [
			'search',
			FilterOption.Date,
		],
	});
	filtersManager.value.updateFilter(defaultDateFilter());
};
</script>
