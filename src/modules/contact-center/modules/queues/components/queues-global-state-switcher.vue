<template>
  <!-- :key forces a re-render so the switcher snaps back when the user cancels -->
  <global-state-switcher
    :key="switcherKey"
    :disabled="disabled"
    :model-value="isAllEnabled"
    @update:model-value="askConfirmation"
    @on-load-global-state="fetchGlobalState"
  />
  <global-state-confirmation-popup
    :affected-count="affectedCount"
    :shown="isConfirmationPopup"
    @close="closeConfirmation"
    @confirm="confirmChange"
  />
</template>

<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';

import GlobalStateSwitcher from '../../../../../app/components/global-state-switcher.vue';
import GlobalStateConfirmationPopup from '../../../../_shared/global-state-confirmation-popup/global-state-confirmation-popup.vue';
import { useQueuesDatalistStore, useQueuesGlobalStateStore } from '../stores';

/**
 * @description
 * Enables or disables every queue matching the table's current filters.
 *
 * The state itself belongs to `useQueuesGlobalStateStore`, because the table's
 * per-row toggle moves it too. What stays here is the lifecycle: fetch on
 * mount, refetch when the filters change. Keeping the watcher in the component
 * rather than the store means it stops when the page unmounts, instead of
 * refetching in the background for the rest of the session.
 *
 * The debounce is a real one now: the old page defined
 * `debouncedFetchGlobalState()` as a method that reassigned itself to a
 * debounced function on first call, so the first invocation only ever built the
 * debouncer and never fetched.
 */
defineProps<{
	disabled?: boolean;
}>();

const tableStore = useQueuesDatalistStore();
const { filtersManager } = storeToRefs(tableStore);

const globalStateStore = useQueuesGlobalStateStore();
const { affectedCount, isAllEnabled } = storeToRefs(globalStateStore);
const { fetchGlobalState, setGlobalState } = globalStateStore;

const switcherKey = ref(0);
const isConfirmationPopup = ref(false);
const pendingValue = ref<boolean | null>(null);

const debouncedFetch = useDebounceFn(fetchGlobalState, 300);

const askConfirmation = (value: boolean) => {
	pendingValue.value = value;
	isConfirmationPopup.value = true;
};

const closeConfirmation = () => {
	isConfirmationPopup.value = false;
	pendingValue.value = null;
	switcherKey.value += 1;
};

const confirmChange = async () => {
	await setGlobalState(!!pendingValue.value);

	isConfirmationPopup.value = false;
	pendingValue.value = null;
};

// one deep watch replaces the legacy pair of `getFilters` + `search` watchers
watch(
	() => filtersManager.value.getAllValues(),
	() => debouncedFetch(),
	{
		deep: true,
	},
);

onMounted(fetchGlobalState);
</script>

<style scoped></style>
