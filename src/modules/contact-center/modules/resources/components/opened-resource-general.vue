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
      <wt-select :clearable="false" :disabled="disableUserInput" :label="$t('objects.routing.gateways.gateways', 1)"
        :search-method="loadDropdownOptionsList" :v="v.itemInstance.gateway" :value="itemInstance.gateway" required
        @input="setItemProp({ prop: 'gateway', value: $event })" />
      <wt-input :disabled="disableUserInput" :label="$t('objects.ccenter.res.cps')" :v="v.itemInstance.cps"
        :value="itemInstance.cps" required type="number" @input="setItemProp({ prop: 'cps', value: +$event })" />
      <wt-input :disabled="disableUserInput" :label="$t('objects.ccenter.res.limit')" :v="v.itemInstance.limit"
        :value="itemInstance.limit" required type="number" @input="setItemProp({ prop: 'limit', value: +$event })" />
      <wt-select :disabled="disableUserInput" :label="$t('objects.ccenter.res.cidType')" :options="CidTypeList"
        :track-by="null" :value="itemInstance.parameters.cidType"
        @input="setItemParameterProp({ prop: 'cidType', value: $event })" />
      <wt-select :disabled="disableUserInput" :label="$t('objects.ccenter.res.ignoreEarlyMedia')"
        :options="EarlyMediaList" :track-by="null" :value="itemInstance.parameters.ignoreEarlyMedia"
        @input="setItemParameterProp({ prop: 'ignoreEarlyMedia', value: $event })" />
      <wt-textarea :disabled="disableUserInput" :label="$t('objects.description')"
        :model-value="itemInstance.description"
        @update:model-value="setItemProp({ prop: 'description', value: $event })" />
      <wt-tags-input :disabled="disableUserInput" :label="$t('objects.ccenter.res.patterns')"
        :value="itemInstance.patterns" taggable @input="setItemProp({ prop: 'patterns', value: $event })" />
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import GatewaysAPI from '../../../../routing/modules/gateways/api/gateways';
import CidTypeList from '../lookups/CidType.lookup';
import EarlyMediaList from '../lookups/EarlyMedia.lookup';

export default {
  name: 'OpenedResourceGeneral',
  mixins: [openedTabComponentMixin],
  data() {
    return {
      CidTypeList,
      EarlyMediaList,
    };
  },
  methods: {
    ...mapActions({
      setItemParameterProp(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_PARAMETERS_PROPERTY`, payload);
      },
    }),
    loadDropdownOptionsList(params) {
      return GatewaysAPI.getLookup(params);
    },
  },
};
</script>
