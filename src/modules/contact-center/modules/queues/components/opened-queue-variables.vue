<template>
  <wt-editable-list
    v-model:model-value="modelValue.variables"
    :create-row="createVariable"
    :disabled="disableUserInput"
    :headers="headers"
  >
    <template #title>
      <h3 class="table-title__title">
        {{ t('objects.ccenter.queues.variables') }}
      </h3>
    </template>
    <template #key="{ item }">
      <wt-input-text
        v-model:model-value="item.key"
        :disabled="disableUserInput"
        :placeholder="t('objects.ccenter.queues.varKey')"
      />
    </template>
    <template #value="{ item }">
      <wt-input-text
        v-model:model-value="item.value"
        :disabled="disableUserInput"
        :placeholder="t('objects.ccenter.queues.varVal')"
      />
    </template>
  </wt-editable-list>
</template>

<script lang="ts" setup>
import type { VariablePair } from '@webitel/api-services/validations';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import type { Queue } from '../types/Queue';

const modelValue = defineModel<Queue>({
	required: true,
});

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();

const headers = computed(() => [
	{
		value: 'key',
		text: t('objects.ccenter.queues.varKey'),
	},
	{
		value: 'value',
		text: t('objects.ccenter.queues.varVal'),
	},
]);

const createVariable = (): VariablePair => ({
	key: '',
	value: '',
});
</script>
