<template>
  <wt-single-select
    :show-clear="false"
    :label="t(descriptor.select?.labelKey || 'vocabulary.values')"
    :options="descriptor.select?.options"
    option-value="id"
    :v="v"
    :model-value="modelValue"
    required
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import type {
	ParameterDescriptor,
	SelectOption,
} from '../../utils/parameterDescriptors';

defineProps<{
	modelValue?: string;
	v?: object;
	descriptor: ParameterDescriptor;
}>();

const emit = defineEmits<{
	'update:modelValue': [
		value: SelectOption['id'],
	];
}>();

const { t } = useI18n();
</script>
