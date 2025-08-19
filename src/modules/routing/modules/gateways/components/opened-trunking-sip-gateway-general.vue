<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :value="itemInstance.name"
        @input="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.gateways.proxy')"
        :v="v.itemInstance.proxy"
        :value="itemInstance.proxy"
        required
        @input="setItemProp({ prop: 'proxy', value: $event })"
      />
      <wt-select
        :disabled="disableUserInput"
        :label="$t('objects.routing.schema')"
        :search-method="loadDropdownOptionsList"
        :value="itemInstance.schema"
        @input="setItemProp({ prop: 'schema', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.gateways.host')"
        :v="v.itemInstance.host"
        :value="itemInstance.host"
        required
        @input="setItemProp({ prop: 'host', value: $event })"
      />
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :model-value="itemInstance.usage"
        @update:model-value="setItemProp({ prop: 'usage', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../flow/api/flow';

export default {
  name: 'OpenedTrunkingSipGatewayGeneral',
  mixins: [openedTabComponentMixin],
  methods: {
    loadDropdownOptionsList(params) {
      return FlowsAPI.getLookup(params);
    },
  },
};
</script>
