<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input :disabled="disableUserInput" :label="$t('objects.name')" :v="v.itemInstance.name"
        :value="itemInstance.name" required @input="setItemProp({ prop: 'name', value: $event })" />
      <wt-select :clearable="false" :disabled="disableUserInput" :label="$t('objects.routing.flow.flow', 1)"
        :search-method="loadFlows" :v="v.itemInstance.schema" :value="itemInstance.schema" required
        @input="setItemProp({ prop: 'schema', value: $event })" />
      <wt-textarea :disabled="disableUserInput" :label="$t('objects.description')"
        :model-value="itemInstance.description"
        @update:model-value="setItemProp({ prop: 'description', value: $event })" />
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../flow/api/flow';

export default {
  name: 'OpenedChatplan',
  mixins: [openedTabComponentMixin],
  methods: {
    loadFlows(params) {
      return FlowsAPI.getLookup(params);
    },
  },
};
</script>

<style scoped></style>
