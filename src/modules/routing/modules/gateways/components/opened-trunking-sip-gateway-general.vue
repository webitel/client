<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :model-value="itemInstance.name"
        @update:model-value="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.routing.gateways.proxy')"
        :v="v.itemInstance.proxy"
        :model-value="itemInstance.proxy"
        required
        @update:model-value="setItemProp({ prop: 'proxy', value: $event })"
      />
      <wt-select
        :disabled="disableUserInput"
        :label="$t('objects.routing.schema')"
        :search-method="loadDropdownOptionsList"
        :value="itemInstance.schema"
        @input="setItemProp({ prop: 'schema', value: $event })"
      />
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.routing.gateways.host')"
        :v="v.itemInstance.host"
        :model-value="itemInstance.host"
        required
        @update:model-value="setItemProp({ prop: 'host', value: $event })"
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
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../flow/api/flow';

export default {
  name: 'OpenedTrunkingSipGatewayGeneral',
  mixins: [openedTabComponentMixin],
  setup: () => {
    const { disableUserInput } = useUserAccessControl();
    return {
      disableUserInput,
    };
  },
  methods: {
    loadDropdownOptionsList(params) {
      return FlowsAPI.getLookup(params);
    },
  },
};
</script>
