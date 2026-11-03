<template>
  <wt-editable-list
    v-model:model-value="modelValue.variables"
    :create-row="createVariable"
    :disabled="disableUserInput"
    :headers="headers"
  >
    <template #title>
      <h3 class="table-title__title">
        {{ t('objects.directory.users.variables') }}
      </h3>
    </template>
    <template #key="{ item, index }">
      <wt-input-text
        v-model:model-value="item.key"
        :disabled="disableUserInput"
        :placeholder="t('objects.directory.users.varKey')"
        :regle-validation="validationFields?.variables?.$each?.[index]?.$fields?.key"
        @update:model-value="touchVariable(index)"
      />
    </template>
    <template #value="{ item, index }">
      <wt-input-text
        v-model:model-value="item.value"
        :disabled="disableUserInput"
        :placeholder="t('objects.directory.users.varVal')"
        :regle-validation="validationFields?.variables?.$each?.[index]?.$fields?.value"
        @update:model-value="touchVariable(index)"
      />
    </template>
  </wt-editable-list>
</template>

<script setup lang="ts">
import type { UserCard, VariablePair } from '@webitel/api-services/validations';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

const modelValue = defineModel<UserCard>({
	required: true,
});

const props = defineProps<{
	validationFields?: CardValidationFields<UserCard>;
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();

const headers = computed(() => [
	{
		value: 'key',
		text: t('objects.directory.users.varKey'),
	},
	{
		value: 'value',
		text: t('objects.directory.users.varVal'),
	},
]);

const createVariable = (): VariablePair => ({
	key: '',
	value: '',
});

// [Claude] key and value are required only together, and regle shows an error
// only on a dirty field — so editing one half dirties the whole pair
const touchVariable = (index: number) => {
	props.validationFields?.variables?.$each?.[index]?.$touch();
};
</script>
