<template>
  <wt-input-number
    :label="t('vocabulary.values', 1)"
    :v="v"
    :model-value="modelValue"
    required
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import type { ParameterDescriptor } from '../../utils/parameterDescriptors';

defineProps<{
	modelValue?: number;
	v?: object;
	descriptor?: ParameterDescriptor;
}>();

const emit = defineEmits<{
	'update:modelValue': [
		value: number,
	];
}>();

const { t } = useI18n();
</script>
