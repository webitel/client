<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
        :value="name"
        :label="$t('objects.name')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-input
        :value="proxy"
        :v="v.itemInstance.proxy"
        :label="$t('objects.routing.gateways.proxy')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'proxy', value: $event })"
      ></wt-input>
      <wt-select
        :value="schema"
        :label="$t('objects.routing.schema')"
        :search="loadDropdownOptionsList"
        :internal-search="false"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'schema', value: $event })"
      ></wt-select>
      <wt-input
        :value="host"
        :v="v.itemInstance.host"
        :label="$t('objects.routing.gateways.host')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'host', value: $event })"
      ></wt-input>
      <wt-textarea
        :value="description"
        :label="$t('objects.description')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
    </form>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { getFlowList } from '../../../api/routing/flow/flow';
import openedTabComponentMixin from '../../../mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-trunking-sip-gateway-general',
  mixins: [openedTabComponentMixin],

  computed: {
    ...mapState('routing/gateways', {
      name: (state) => state.itemInstance.name,
      schema: (state) => state.itemInstance.schema,
      proxy: (state) => state.itemInstance.proxy,
      host: (state) => state.itemInstance.host,
      description: (state) => state.itemInstance.description,
    }),
  },

  methods: {
    async loadDropdownOptionsList(search) {
      const response = await getFlowList(1, 10, search);
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },
  },
};
</script>
