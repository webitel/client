<template>
  <wt-popup
    v-bind="$attrs"
    :shown="!!configurationId"
    size="sm"
    overflow
    @close="close"
  >
    <template #title>
      {{ id ? $t('reusable.edit') : $t('reusable.new') }}
      {{ $t('objects.system.configuration.parameter').toLowerCase() }}
    </template>
    <template #main>
      <form class="configuration-popup__form">
        <wt-single-select
          :show-clear="false"
          :disabled="id"
          :label="$t('objects.system.configuration.parameter')"
          :options="parameterList"
          data-key="name"
          option-value="name"
          :v="v$.itemInstance.name"
          :model-value="itemInstance.name"
          required
          @update:model-value="setParameterName"
        />
        <component
          :is="valueComponent"
          v-if="itemInstance.name"
          :descriptor="descriptor"
          :v="v$.itemInstance.value"
          :model-value="itemInstance.value"
          @update:model-value="setItemProp({ prop: 'value', value: $event })"
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="disabledSave"
        @click="save"
      >
        {{ $t('reusable.save') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ $t('reusable.cancel') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { minValue, required } from '@vuelidate/validators';
import { TypesExportedSettings } from '@webitel/ui-sdk/enums';
import deepmerge from 'deepmerge';

import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import ConfigurationAPI from '../api/configuration';
import {
	ConfigurationValueType,
	getParameterDefaultValue,
	getParameterDescriptor,
} from '../utils/parameterDescriptors';
import ConfigurationValueBoolean from './value-fields/configuration-value-boolean.vue';
import ConfigurationValueExportSettings from './value-fields/configuration-value-export-settings.vue';
import ConfigurationValueMultiselect from './value-fields/configuration-value-multiselect.vue';
import ConfigurationValueNumber from './value-fields/configuration-value-number.vue';
import ConfigurationValueSelect from './value-fields/configuration-value-select.vue';
import ConfigurationValueString from './value-fields/configuration-value-string.vue';

const valueComponentByType = {
	[ConfigurationValueType.Boolean]: ConfigurationValueBoolean,
	[ConfigurationValueType.Number]: ConfigurationValueNumber,
	[ConfigurationValueType.String]: ConfigurationValueString,
	[ConfigurationValueType.Select]: ConfigurationValueSelect,
	[ConfigurationValueType.Multiselect]: ConfigurationValueMultiselect,
	[ConfigurationValueType.ExportSettings]: ConfigurationValueExportSettings,
};

export default {
	name: 'ConfigurationPopup',
	mixins: [
		openedObjectMixin,
		openedTabComponentMixin,
	],
	props: {
		namespace: {
			type: String,
		},
	},
	setup: () => ({
		// Reasons for use $stopPropagation
		// https://webitel.atlassian.net/browse/WTEL-4559?focusedCommentId=621761
		v$: useVuelidate({
			$stopPropagation: true,
		}),
	}),
	validations() {
		const defaults = {
			itemInstance: {
				name: {
					required,
				},
			},
		};

		const requiredValueConfig = {
			itemInstance: {
				value: {
					required,
				},
			},
		};

		const configByType = {
			[ConfigurationValueType.Number]: {
				itemInstance: {
					value: {
						required,
						minValue: minValue(0),
					},
				},
			},
			[ConfigurationValueType.ExportSettings]: {
				itemInstance: {
					value: {
						format: {
							required,
						},
						...(this.itemInstance?.value?.format ===
							TypesExportedSettings.CSV && {
							separator: {
								required,
							},
						}),
					},
				},
			},
		};

		return deepmerge.all([
			defaults,
			configByType[this.descriptor.type] || requiredValueConfig,
			{
				itemInstance: {
					value: this.descriptor.validators || {},
				},
			},
		]);
	},
	data() {
		return {
			parameterList: [],
		};
	},
	computed: {
		configurationId() {
			return this.$route.params.id;
		},
		descriptor() {
			return getParameterDescriptor(this.itemInstance.name);
		},
		valueComponent() {
			return valueComponentByType[this.descriptor.type];
		},
	},
	methods: {
		async save() {
			if (!this.disabledSave) {
				if (!this.new) {
					await this.updateItem();
				} else {
					await this.addItem();
				}
				this.close();
			}
		},
		async loadPopupData(id) {
			await this.setId(id);
			if (this.new) await this.loadParameterList();
			return this.loadItem();
		},
		close() {
			this.$emit('close');
		},
		async loadParameterList(params) {
			const { items } = await ConfigurationAPI.getObjectsList({
				...params,
				size: 5000,
			});
			this.parameterList = items
				.filter((item) => !getParameterDescriptor(item.name).hidden)
				.map((item) => ({
					name: item.name,
					value: item.name,
				}));
		},
		setParameterName(name) {
			this.setItemProp({
				prop: 'name',
				value: name,
			});
			this.setItemProp({
				prop: 'value',
				value: getParameterDefaultValue(name),
			});
		},
		loadPageData() {},
	},
	watch: {
		configurationId: {
			async handler(id) {
				if (id) {
					await this.loadPopupData(id);
				} else {
					this.resetState();
				}
			},
			immediate: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.configuration-popup__form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
