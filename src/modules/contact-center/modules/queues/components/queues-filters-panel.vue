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

import { filtersOptions } from '../configs/filtersOptions';
import { useQueuesDatalistStore } from '../stores';

const emit = defineEmits<{
	hide: [];
}>();

const tableStore = useQueuesDatalistStore();
const { filtersManager } = storeToRefs(tableStore);
const { addFilter, updateFilter, deleteFilter } = tableStore;

/**
 * Keeps the search bar's value — it is not part of this panel.
 *
 * The old panel also had to preserve a `?type=` query param here, because it
 * reset by rewriting the whole route query and did so on unmount, wiping the
 * param the create-queue popup had just set. The manager mutates itself and
 * persistence writes through its own key, so there is nothing to protect.
 */
const resetFilters = () => {
	filtersManager.value.reset({
		exclude: [
			'search',
		],
	});
};
</script>

<style scoped></style>
