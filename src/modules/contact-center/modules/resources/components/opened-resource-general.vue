<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
        :value="name"
        :v="v.itemInstance.name"
        :label="$t('objects.name')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-select
        :value="gateway"
        :v="v.itemInstance.gateway"
        :label="$tc('objects.routing.gateways.gateways', 1)"
        :search="loadDropdownOptionsList"
        :internal-search="false"
        :clearable="false"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'gateway', value: $event })"
      ></wt-select>
      <wt-input
        :value="cps"
        :v="v.itemInstance.cps"
        :label="$t('objects.ccenter.res.cps')"
        :disabled="disableUserInput"
        type="number"
        required
        @input="setItemProp({ prop: 'cps', value: +$event })"
      ></wt-input>
      <wt-input
        :value="limit"
        :v="v.itemInstance.limit"
        :label="$t('objects.ccenter.res.limit')"
        :disabled="disableUserInput"
        type="number"
        required
        @input="setItemProp({ prop: 'limit', value: +$event })"
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
import { getGatewayList } from '../../../../routing/modules/gateways/api/gateways';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-resource-general',
  mixins: [openedTabComponentMixin],

  computed: {
    ...mapState('ccenter/res', {
      name: (state) => state.itemInstance.name,
      gateway: (state) => state.itemInstance.gateway,
      cps: (state) => state.itemInstance.cps,
      limit: (state) => state.itemInstance.limit,
      description: (state) => state.itemInstance.description,
    }),
  },

  methods: {
    async loadDropdownOptionsList(search) {
      const response = await getGatewayList({ search });
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },
  },
};
</script>
