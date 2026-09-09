<template>
  <wt-single-select
    :show-clear="false"
    :label="t(descriptor.select?.labelKey || 'vocabulary.values')"
    :options="descriptor.select?.options"
    option-value="id"
    :regle-validation="regleValidation"
    :model-value="modelValue"
    required
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import type { RegleSchemaFieldStatus } from '@regle/schemas';
import { useI18n } from 'vue-i18n';

import type {
	ParameterDescriptor,
	SelectOption,
} from '../../types/configuration.types';

defineProps<{
	modelValue?: string;
	regleValidation?: RegleSchemaFieldStatus<SelectOption['id']>;
	descriptor: ParameterDescriptor;
}>();

const emit = defineEmits<{
	'update:modelValue': [
		value: SelectOption['id'],
	];
}>();

const { t } = useI18n();
</script>
