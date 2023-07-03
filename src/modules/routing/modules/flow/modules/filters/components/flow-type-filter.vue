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

<script setup>
import { EngineRoutingSchemaType } from 'webitel-sdk';
import { useStore } from 'vuex';
import { computed } from 'vue';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';

const props = defineProps({
  namespace: {
    type: String,
    required: true,
  },
});

const store = useStore();

const filter = 'type';

const filterSchema = computed(() => getNamespacedState(store.state, props.namespace)[filter]);

function setValue(payload) {
  return store.dispatch(`${props.namespace}/SET_FILTER`, payload);
}

function handleChange(value) {
  setValue({ filter, value });
}
</script>

<style lang="scss" scoped>
.flow-type-filter {
  display: flex !important; // overwrite .filters-panel-wrapper--opened dblock style
  align-items: flex-end;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-xs);
}
</style>
