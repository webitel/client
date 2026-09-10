<template>
  <wt-popup
    :shown="!!configurationId"
    :size="ComponentSize.SM"
    overflow
    @close="close"
  >
    <template #title>
      {{ popupTitle }}
    </template>
    <template #main>
      <form
        class="configuration-popup__form"
        @submit.prevent="save"
      >
        <wt-single-select
          :show-clear="false"
          :disabled="!isNew"
          :label="t('objects.system.configuration.parameter')"
          :options="parameterList"
          data-key="name"
          option-value="name"
          :regle-validation="validationFields?.name"
          :model-value="modelValue.name"
          required
          @update:model-value="setParameterName"
        />
        <component
          :is="valueComponent"
          v-if="modelValue.name"
          v-model:model-value="modelValue.value"
          :descriptor="descriptor"
          :regle-validation="validationFields?.value"
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="disabledSave"
        @click="save"
      >
        {{ t('reusable.save') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ t('reusable.cancel') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { ConfigurationsAPI } from '@webitel/api-services/api';
import { useNestedCardComponent } from '@webitel/ui-datalist/card';
import { ComponentSize } from '@webitel/ui-sdk/enums';
import type { Component } from 'vue';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import { ConfigurationValueType } from '../enum/ConfigurationValueType.enum';
import { useConfigurationCardStore } from '../stores/card/configurationCardStore';
import type { ConfigurationParameter } from '../types/configuration.types';
import {
	getParameterDefaultValue,
	getParameterDescriptor,
} from '../utils/parameterDescriptors';
import ConfigurationValueBoolean from './value-fields/configuration-value-boolean.vue';
import ConfigurationValueExportSettings from './value-fields/configuration-value-export-settings.vue';
import ConfigurationValueMultiselect from './value-fields/configuration-value-multiselect.vue';
import ConfigurationValueNumber from './value-fields/configuration-value-number.vue';
import ConfigurationValueSelect from './value-fields/configuration-value-select.vue';
import ConfigurationValueString from './value-fields/configuration-value-string.vue';

const valueComponentByType: Record<ConfigurationValueType, Component> = {
	[ConfigurationValueType.Boolean]: ConfigurationValueBoolean,
	[ConfigurationValueType.Number]: ConfigurationValueNumber,
	[ConfigurationValueType.String]: ConfigurationValueString,
	[ConfigurationValueType.Select]: ConfigurationValueSelect,
	[ConfigurationValueType.Multiselect]: ConfigurationValueMultiselect,
	[ConfigurationValueType.ExportSettings]: ConfigurationValueExportSettings,
};

const emit = defineEmits<{
	close: [];
	saved: [];
}>();

const { t } = useI18n();
const route = useRoute();

const { hasSaveActionAccess } = useUserAccessControl();

const {
	modelValue,
	validationFields,
	isNew,
	hasValidationErrors,
	isAnyFieldEdited,
	save: saveItem,
} = useNestedCardComponent<ConfigurationParameter>({
	useCardStore: useConfigurationCardStore,
	routeParamName: 'id',
});

const configurationId = computed(() => route.params.id as string | undefined);

const popupTitle = computed(() => {
	const action = isNew.value ? t('reusable.new') : t('reusable.edit');
	return `${action} ${t('objects.system.configuration.parameter').toLowerCase()}`;
});

const descriptor = computed(() =>
	getParameterDescriptor(modelValue.value.name),
);
const valueComponent = computed(
	() => valueComponentByType[descriptor.value.type],
);

const disabledSave = computed(
	() =>
		!hasSaveActionAccess.value ||
		!isAnyFieldEdited.value ||
		hasValidationErrors.value,
);

const parameterList = ref<
	{
		name: string;
		value: string;
	}[]
>([]);

const loadParameterList = async () => {
	const { items } = await ConfigurationsAPI.getObjectsList({
		size: 5000,
	});
	parameterList.value = items
		.filter((item) => !getParameterDescriptor(item.name).hidden)
		.map((item) => ({
			name: item.name,
			value: item.name,
		}));
};

watch(
	configurationId,
	(id) => {
		if (id === 'new') loadParameterList();
	},
	{
		immediate: true,
	},
);

const setParameterName = (name: string) => {
	modelValue.value.name = name;
	modelValue.value.value = getParameterDefaultValue(name);
};

const close = () => emit('close');

const save = async () => {
	if (disabledSave.value) return;

	await saveItem();
	emit('saved');
	close();
};
</script>

<style lang="scss" scoped>
.configuration-popup__form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
