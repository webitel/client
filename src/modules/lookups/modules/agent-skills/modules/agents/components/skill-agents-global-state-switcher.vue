<template>
  <global-state-switcher
    :key="switcherKey"
    :disabled="disabled"
    :model-value="isAllEnabled"
    @update:model-value="askConfirmation"
  />
  <global-state-confirmation-popup
    :affected-count="affectedCount"
    :shown="pendingValue !== null"
    @close="cancelChange"
    @confirm="confirmChange"
  />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import GlobalStateSwitcher from '../../../../../../../app/components/global-state-switcher.vue';
import GlobalStateConfirmationPopup from '../../../../../../_shared/global-state-confirmation-popup/global-state-confirmation-popup.vue';
import { useSkillAgentsGlobalStateStore } from '../stores/globalState/skillAgentsGlobalStateStore';

defineProps<{
	disabled?: boolean;
}>();

const globalStateStore = useSkillAgentsGlobalStateStore();
const { affectedCount, isAllEnabled } = storeToRefs(globalStateStore);
const { setGlobalState } = globalStateStore;

const pendingValue = ref<boolean | null>(null);
const switcherKey = ref(0);

const askConfirmation = (value: boolean | null) => {
	pendingValue.value = value;
};

const cancelChange = () => {
	askConfirmation(null);
	switcherKey.value += 1;
};

const confirmChange = async () => {
	await setGlobalState(!!pendingValue.value);

	askConfirmation(null);
};
</script>
