<template>
  <wt-editable-list
    v-model="modelValue.variables"
    :create-row="createVariable"
    :disabled="disableUserInput"
    :headers="headers"
  >
    <template #key="{ item }">
      <wt-input-text
        v-model:model-value="item.key"
        :disabled="disableUserInput"
        :placeholder="t('vocabulary.keys', 1)"
      />
    </template>
    <template #value="{ item }">
      <wt-input-text
        v-model:model-value="item.value"
        :disabled="disableUserInput"
        :placeholder="t('vocabulary.values', 1)"
      />
    </template>
  </wt-editable-list>
</template>

<script setup lang="ts">
import type {
	TriggerCard,
	VariablePair,
} from '@webitel/api-services/validations';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

const modelValue = defineModel<TriggerCard>({
	required: true,
});

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();

const headers = computed(() => [
	{
		value: 'key',
		text: t('vocabulary.keys', 1),
	},
	{
		value: 'value',
		text: t('vocabulary.values', 1),
	},
]);

const createVariable = (): VariablePair => ({
	key: '',
	value: '',
});
</script>
