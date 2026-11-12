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
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ConfirmationPopup from '../../../../../../../app/components/confirmation-popup.vue';
import { useSkillAgentsGlobalStateStore } from '../stores/globalState/skillAgentsGlobalStateStore';

defineProps<{
	disabled?: boolean;
}>();

const { t } = useI18n();

const globalStateStore = useSkillAgentsGlobalStateStore();
const { affectedCount, isAllEnabled } = storeToRefs(globalStateStore);
const { setGlobalState } = globalStateStore;

const pendingValue = ref<boolean | null>(null);

const askConfirmation = (value: boolean | null) => {
	pendingValue.value = value;
};

const cancelChange = () => {
	askConfirmation(null);
};

const confirmChange = async () => {
	await setGlobalState(!!pendingValue.value);

	askConfirmation(null);
};
</script>
