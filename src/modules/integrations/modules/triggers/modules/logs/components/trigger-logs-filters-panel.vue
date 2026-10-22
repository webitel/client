<template>
  <table-filters-panel
    :filter-options="filtersOptions"
    :filters-manager="filtersManager"
    :has-read-access="hasReadAccess"
    static-mode
    @filter:add="addFilter"
    @filter:update="updateFilter"
    @filter:delete="deleteFilter"
    @filter:reset-all="resetFilters"
  />
</template>

<script setup lang="ts">
import {
	FilterOption,
	TableFiltersPanelComponent as TableFiltersPanel,
} from '@webitel/ui-datalist/filters';
import { storeToRefs } from 'pinia';

import { useUserinfoStore } from '../../../../../../userinfo/stores/userinfoStore';
import {
	defaultStartedAtFilter,
	filtersOptions,
} from '../configs/filtersOptions';
import { useTriggerLogsDatalistStore } from '../stores/datalist/triggerLogsDatalistStore';

const userinfoStore = useUserinfoStore();
const { hasReadAccess } = userinfoStore;

const triggerLogsDatalistStore = useTriggerLogsDatalistStore();
const { filtersManager } = storeToRefs(triggerLogsDatalistStore);

const { addFilter, updateFilter, deleteFilter } = triggerLogsDatalistStore;

/** [Claude] a reset goes back to today's runs, the start date can't be removed */
const resetFilters = () => {
	filtersManager.value.reset({
		exclude: [
			'search',
			FilterOption.StartedAt,
		],
	});
	filtersManager.value.updateFilter(defaultStartedAtFilter());
};
</script>
