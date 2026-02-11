<template>
  <div class="flow-type-filter">
    <wt-checkbox
      :label="$t(`objects.flow.type.${EngineRoutingSchemaType.Chat}`)"
      :selected="filterSchema.value"
      :value="EngineRoutingSchemaType.Chat"
      @update:selected="handleChange"
    />
    <wt-checkbox
      :label="$t(`objects.flow.type.${EngineRoutingSchemaType.Voice}`)"
      :selected="filterSchema.value"
      :value="EngineRoutingSchemaType.Voice"
      @update:selected="handleChange"
    />
    <wt-checkbox
      :label="$t(`objects.flow.type.${EngineRoutingSchemaType.Processing}`)"
      :selected="filterSchema.value"
      :value="EngineRoutingSchemaType.Processing"
      @update:selected="handleChange"
    />
    <wt-checkbox
      :label="$t(`objects.flow.type.${EngineRoutingSchemaType.Service}`)"
      :selected="filterSchema.value"
      :value="EngineRoutingSchemaType.Service"
      @update:selected="handleChange"
    />
  </div>
</template>

<script>
import baseFilterMixin from '@webitel/ui-sdk/src/modules/QueryFilters/mixins/baseFilterMixin/baseFilterMixin';
import { EngineRoutingSchemaType } from 'webitel-sdk';

export default {
	name: 'FlowTypeFilter',
	mixins: [
		baseFilterMixin,
	],
	data: () => ({
		EngineRoutingSchemaType,
		filterQuery: 'type',
	}),
	methods: {
		handleChange(value) {
			this.setValue({
				filter: this.filterQuery,
				value,
			});
			this.setValueToQuery({
				filterQuery: this.filterQuery,
				value,
			});
		},
		restoreValue(_value) {
			// if only 1 checkbox is seelcted, returned value is string
			const value = Array.isArray(_value)
				? _value
				: [
						_value,
					];
			this.setValue({
				filter: this.filterQuery,
				value,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.flow-type-filter {
  display: flex !important; // overwrite .filters-panel-wrapper--opened dblock style
  align-items: flex-end;
  flex-wrap: wrap;
  margin-bottom: var(--spacing-xs);
  gap: var(--spacing-xs);
}
</style>
