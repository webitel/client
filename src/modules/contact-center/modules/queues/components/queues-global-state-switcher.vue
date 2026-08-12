<template>
  <!-- :key forces a re-render so the switcher snaps back when the user cancels -->
  <global-state-switcher
    :key="switcherKey"
    :disabled="disabled"
    :model-value="globalState"
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
import { QueuesStateAPI } from '@webitel/api-services/api';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';

import GlobalStateSwitcher from '../../../../../app/components/global-state-switcher.vue';
import GlobalStateConfirmationPopup from '../../../../_shared/global-state-confirmation-popup/global-state-confirmation-popup.vue';
import { useQueuesDatalistStore } from '../stores';

/**
 * @description
 * Enables or disables every queue matching the table's current filters.
 *
 * Lifted out of the table page, which held six pieces of switcher state among
 * its own. The debounce is a real one now: the old page defined
 * `debouncedFetchGlobalState()` as a method that reassigned itself to a
 * debounced function on first call, so the first invocation only ever built the
 * debouncer and never fetched.
 */
defineProps<{
	disabled?: boolean;
}>();

const emit = defineEmits<{
	changed: [];
}>();

const tableStore = useQueuesDatalistStore();
const { filtersManager } = storeToRefs(tableStore);

const globalState = ref(false);
const affectedCount = ref(0);
const switcherKey = ref(0);
const isConfirmationPopup = ref(false);
const pendingValue = ref<boolean | null>(null);

/** filter names are already the api's param names — no manual merge needed */
const filterParams = () => filtersManager.value.getAllValues();

const fetchGlobalState = async () => {
	const state = await QueuesStateAPI.getQueuesGlobalState(filterParams());
	globalState.value = !!state?.isAllEnabled;
	affectedCount.value = state?.potentialRows || 0;
};

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
	await QueuesStateAPI.setQueuesGlobalState({
		enabled: !!pendingValue.value,
		params: filterParams(),
	});
	globalState.value = !!pendingValue.value;
	isConfirmationPopup.value = false;
	pendingValue.value = null;
	emit('changed');
	await fetchGlobalState();
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

defineExpose({
	fetchGlobalState,
});
</script>

<style scoped></style>
