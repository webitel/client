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

<script lang="ts" setup>
import {
	FilterOption,
	TableFiltersPanelComponent as TableFiltersPanel,
} from '@webitel/ui-datalist/filters';
import { storeToRefs } from 'pinia';

import { useUserinfoStore } from '../../../../../../userinfo/stores/userinfoStore';
import { defaultDateFilter, filtersOptions } from '../configs/filtersOptions';
import { useChangelogLogsDatalistStore } from '../stores/datalist/changelogLogsDatalistStore';

const userinfoStore = useUserinfoStore();
const { hasReadAccess } = userinfoStore;

const changelogLogsDatalistStore = useChangelogLogsDatalistStore();
const { filtersManager } = storeToRefs(changelogLogsDatalistStore);

const { addFilter, updateFilter, deleteFilter } = changelogLogsDatalistStore;

/** [Claude] a reset goes back to today's changes, the date can't be removed */
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
