<template>
  <wt-multi-select
    :label="t('vocabulary.values', 2)"
    :v="v"
    :model-value="modelValue"
    :search-method="descriptor.searchMethod"
    :options="descriptor.options"
    :option-label="descriptor.optionLabel"
    :data-key="descriptor.trackBy"
    required
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import type { ParameterDescriptor } from '../../utils/parameterDescriptors';

defineProps<{
	modelValue?: unknown[];
	v?: object;
	descriptor: ParameterDescriptor;
}>();

const emit = defineEmits<{
	'update:modelValue': [
		value: unknown[],
	];
}>();

const { t } = useI18n();
</script>
