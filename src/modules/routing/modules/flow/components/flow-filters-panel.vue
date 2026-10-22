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
import { TableFiltersPanelComponent as TableFiltersPanel } from '@webitel/ui-datalist/filters';
import { storeToRefs } from 'pinia';

import { useUserinfoStore } from '../../../../userinfo/stores/userinfoStore';
import { filtersOptions } from '../configs/filtersOptions';
import { useFlowDatalistStore } from '../stores';

const userinfoStore = useUserinfoStore();
const flowDatalistStore = useFlowDatalistStore();
const { filtersManager } = storeToRefs(flowDatalistStore);

const { addFilter, updateFilter, deleteFilter } = flowDatalistStore;

const resetFilters = () => {
	filtersManager.value.reset({
		exclude: [
			'search',
		],
	});
};
</script>
