<template>
  <div class="flow-type-filter">
    <wt-checkbox
      :label="$t(`objects.flow.type.${EngineRoutingSchemaType.Chat}`)"
      :selected="filterSchema.value"
      :value="EngineRoutingSchemaType.Chat"
      @change="handleChange"
    ></wt-checkbox>
    <wt-checkbox
      :label="$t(`objects.flow.type.${EngineRoutingSchemaType.Voice}`)"
      :selected="filterSchema.value"
      :value="EngineRoutingSchemaType.Voice"
      @change="handleChange"
    ></wt-checkbox>
    <wt-checkbox
      :label="$t(`objects.flow.type.${EngineRoutingSchemaType.Processing}`)"
      :selected="filterSchema.value"
      :value="EngineRoutingSchemaType.Processing"
      @change="handleChange"
    ></wt-checkbox>
    <wt-checkbox
      :label="$t(`objects.flow.type.${EngineRoutingSchemaType.Service}`)"
      :selected="filterSchema.value"
      :value="EngineRoutingSchemaType.Service"
      @change="handleChange"
    ></wt-checkbox>
  </div>
</template>

<script>
import baseFilterMixin from '@webitel/ui-sdk/src/modules/QueryFilters/mixins/baseFilterMixin/baseFilterMixin';
import { EngineRoutingSchemaType } from 'webitel-sdk';

export default {
  name: 'flow-type-filter',
  mixins: [baseFilterMixin],
  data: () => ({
    EngineRoutingSchemaType,
    filterQuery: 'type',
  }),
  methods: {
    handleChange(value) {
      this.setValue({ filter: this.filterQuery, value });
      this.setValueToQuery({ filterQuery: this.filterQuery, value });
    },
    restoreValue(value) {
      this.setValue({ filter: this.filterQuery, value });
    },
  },
};
</script>

<style lang="scss" scoped>
.flow-type-filter {
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  grid-column: 1 / 3;
  margin-bottom: var(--spacing-xs);
}
</style>
