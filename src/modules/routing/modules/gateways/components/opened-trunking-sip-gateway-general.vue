<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
        :value="itemInstance.name"
        :label="$t('objects.name')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.proxy"
        :v="v.itemInstance.proxy"
        :label="$t('objects.routing.gateways.proxy')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'proxy', value: $event })"
      ></wt-input>
      <wt-select
        :value="itemInstance.schema"
        :label="$t('objects.routing.schema')"
        :search="loadDropdownOptionsList"
        :internal-search="false"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'schema', value: $event })"
      ></wt-select>
      <wt-input
        :value="itemInstance.host"
        :v="v.itemInstance.host"
        :label="$t('objects.routing.gateways.host')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'host', value: $event })"
      ></wt-input>
      <wt-textarea
        :value="itemInstance.usage"
        :label="$t('objects.description')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'usage', value: $event })"
      ></wt-textarea>
    </form>
  </section>
</template>

<script>
import { getFlowList } from '../../flow/api/flow';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-trunking-sip-gateway-general',
  mixins: [openedTabComponentMixin],
  methods: {
    async loadDropdownOptionsList(search) {
      const response = await getFlowList({ search });
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },
  },
};
</script>
