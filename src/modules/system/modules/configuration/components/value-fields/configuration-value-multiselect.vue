<template>
  <wt-multi-select
    :label="t('vocabulary.values', 2)"
    :v="v"
    :model-value="modelValue"
    :search-method="descriptor.multiselect?.searchMethod"
    :options="descriptor.multiselect?.options"
    :option-label="descriptor.multiselect?.optionLabel"
    :data-key="descriptor.multiselect?.trackBy"
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
