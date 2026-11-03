<template>
  <wt-editable-list
    v-model:model-value="variables"
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
import type { EngineMemberInQueue } from '@webitel/api-services/gen/models';
import type { VariablePair } from '@webitel/api-services/validations';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';

const modelValue = defineModel<EngineMemberInQueue>({
	required: true,
});

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl({
	useUpdateAccessAsAllMutableChecksSource: true,
});

/** pairs here, a map on the wire; QueueMembersAPI converts between the two */
const variables = computed<VariablePair[]>({
	get: () => (modelValue.value.variables ?? []) as unknown as VariablePair[],
	set: (value) => {
		modelValue.value.variables =
			value as unknown as EngineMemberInQueue['variables'];
	},
});

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
