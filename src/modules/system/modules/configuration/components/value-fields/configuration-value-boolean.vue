<template>
  <wt-switcher
    :label="t('reusable.state')"
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
	modelValue?: boolean;
	v?: object;
	descriptor?: ParameterDescriptor;
}>();

const emit = defineEmits<{
	'update:modelValue': [
		value: boolean,
	];
}>();

const { t } = useI18n();
</script>
