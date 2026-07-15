<template>
  <div class="configuration-value-export-settings">
    <wt-single-select
      :show-clear="false"
      :label="t('vocabulary.format')"
      :options="descriptor.options"
      :v="v?.format"
      :model-value="value?.format"
      required
      @update:model-value="setFormat"
    />
    <wt-input-text
      v-if="isCSV"
      :label="t('objects.CSV.separator')"
      :v="v?.separator"
      :model-value="value?.separator"
      required
      @update:model-value="setSeparator"
    />
  </div>
</template>

<script setup lang="ts">
import { TypesExportedSettings } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import type {
	ParameterDescriptor,
	SelectOption,
} from '../../utils/parameterDescriptors';

interface ExportSettingsValue {
	format: string;
	separator?: string;
}

const props = defineProps<{
	// empty string until the format is first selected (new parameter default)
	modelValue?: ExportSettingsValue | string;
	v?: {
		format?: object;
		separator?: object;
	};
	descriptor: ParameterDescriptor;
}>();

const emit = defineEmits<{
	'update:modelValue': [
		value: ExportSettingsValue,
	];
}>();

const { t } = useI18n();

const value = computed<ExportSettingsValue | undefined>(() =>
	typeof props.modelValue === 'object' ? props.modelValue : undefined,
);

const isCSV = computed(() => value.value?.format === TypesExportedSettings.CSV);

const setFormat = (option: SelectOption) => {
	const format = option.value;

	// separator makes sense only for CSV, so it's dropped on format change
	emit(
		'update:modelValue',
		format === TypesExportedSettings.CSV
			? {
					format,
					separator: value.value?.separator,
				}
			: {
					format,
				},
	);
};

const setSeparator = (separator: string) => {
	emit('update:modelValue', {
		...value.value,
		separator,
	});
};
</script>

<style lang="scss" scoped>
.configuration-value-export-settings {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
