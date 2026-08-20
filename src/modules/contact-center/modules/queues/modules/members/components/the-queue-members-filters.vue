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
import { TableFiltersPanelComponent as TableFiltersPanel } from '@webitel/ui-datalist/filters';
import { storeToRefs } from 'pinia';

import {
	defaultMemberPriorityFilter,
	filtersOptions,
} from '../configs/filtersOptions';
import { useQueueMembersDatalistStore } from '../stores';

const emit = defineEmits<{
	hide: [];
}>();

const tableStore = useQueueMembersDatalistStore();
const { filtersManager } = storeToRefs(tableStore);
const { addFilter, updateFilter, deleteFilter } = tableStore;

/** `priority` survives a reset, as its vuex `defaultValue` did */
const resetFilters = () => {
	const priority = defaultMemberPriorityFilter();

	filtersManager.value.reset({
		exclude: [
			'search',
			priority.name,
		],
	});
	filtersManager.value.updateFilter(priority);
};
</script>

<style scoped></style>
