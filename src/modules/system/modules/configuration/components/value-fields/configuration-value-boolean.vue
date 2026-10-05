<template>
  <wt-switcher
    :label="t('reusable.state')"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import type { ParameterDescriptor } from '../../types/configuration.types';

defineProps<{
	modelValue?: boolean;
	descriptor?: ParameterDescriptor;
}>();

const emit = defineEmits<{
	'update:modelValue': [
		value: boolean,
	];
}>();

const { t } = useI18n();
</script>
