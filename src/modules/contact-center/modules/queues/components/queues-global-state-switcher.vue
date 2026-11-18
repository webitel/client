<template>
  <wt-switcher
    :disabled="disabled"
    :label="t('objects.lookups.skills.stateForAll')"
    :model-value="isAllEnabled"
    controlled
    @update:model-value="askConfirmation"
  />
  <confirmation-popup
    :affected-count="affectedCount"
    :shown="pendingValue !== null"
    @close="cancelChange"
    @confirm="confirmChange"
  />
</template>

<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import ConfirmationPopup from '../../../../../app/components/confirmation-popup.vue';
import { useQueuesDatalistStore } from '../stores/datalist/queuesDatalistStore';
import { useQueuesGlobalStateStore } from '../stores/globalState/queuesGlobalStateStore';

/**
 * Enables or disables every queue matching the table's current filters.
 *
 * The state itself lives in `useQueuesGlobalStateStore`, because the table's
 * per-row toggle moves it too. Only the lifecycle stays here: a filters watcher
 * in the store would keep refetching for the rest of the session, since the
 * store outlives the page.
 */
defineProps<{
	disabled?: boolean;
}>();

const { t } = useI18n();

const tableStore = useQueuesDatalistStore();
const { filtersManager } = storeToRefs(tableStore);

const globalStateStore = useQueuesGlobalStateStore();
const { affectedCount, isAllEnabled } = storeToRefs(globalStateStore);
const { fetchGlobalState, setGlobalState } = globalStateStore;

/** the value awaiting confirmation; non-null exactly while the popup is open */
const pendingValue = ref<boolean | null>(null);

const askConfirmation = (value: boolean) => {
	pendingValue.value = value;
};

const cancelChange = () => {
	pendingValue.value = null;
};

const confirmChange = async () => {
	await setGlobalState(!!pendingValue.value);

	pendingValue.value = null;
};

const debouncedFetch = useDebounceFn(fetchGlobalState, 300);

watch(
	() => filtersManager.value.getAllValues(),
	() => debouncedFetch(),
	{
		deep: true,
	},
);

onMounted(fetchGlobalState);
</script>

