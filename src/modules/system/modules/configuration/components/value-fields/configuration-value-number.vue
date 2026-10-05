<template>
  <wt-input-number
    :label="t('vocabulary.values', 1)"
    :regle-validation="regleValidation"
    :model-value="modelValue"
    required
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import type { RegleSchemaFieldStatus } from '@regle/schemas';
import { useI18n } from 'vue-i18n';

import type { ParameterDescriptor } from '../../types/configuration.types';

defineProps<{
	modelValue?: number;
	regleValidation?: RegleSchemaFieldStatus<number>;
	descriptor?: ParameterDescriptor;
}>();

const emit = defineEmits<{
	'update:modelValue': [
		value: number,
	];
}>();

const { t } = useI18n();
</script>
