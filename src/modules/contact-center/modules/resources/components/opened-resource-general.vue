<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
        :value="itemInstance.name"
        :v="v.itemInstance.name"
        :label="$t('objects.name')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-select
        :value="itemInstance.gateway"
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
        :value="itemInstance.cps"
        :v="v.itemInstance.cps"
        :label="$t('objects.ccenter.res.cps')"
        :disabled="disableUserInput"
        type="number"
        required
        @input="setItemProp({ prop: 'cps', value: +$event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.limit"
        :v="v.itemInstance.limit"
        :label="$t('objects.ccenter.res.limit')"
        :disabled="disableUserInput"
        type="number"
        required
        @input="setItemProp({ prop: 'limit', value: +$event })"
      ></wt-input>

      <wt-select
        v-model="cidType"
        :label="$t('objects.ccenter.res.cidType')"
        :options="dropdownOptionsCidTypeList"
        :clearable="true"
        track-by="value"
        :disabled="disableUserInput"
      ></wt-select>

      <wt-select
        v-model="ignoreEarlyMedia"
        :label="$t('objects.ccenter.res.ignoreEarlyMedia')"
        :options="dropdownOptionsEarlyMediaList"
        :clearable="true"
        track-by="value"
        :disabled="disableUserInput"
      ></wt-select>

      <wt-textarea
        :value="itemInstance.description"
        :label="$t('objects.description')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
      <wt-tags-input
        :value="itemInstance.patterns"
        :label="$t('objects.ccenter.res.patterns')"
        :add-only-from-autocomplete="false"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'patterns', value: $event })"
      ></wt-tags-input>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { getGatewayList } from '../../../../routing/modules/gateways/api/gateways';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import { CidTypeList } from '../store/_internals/enums/CidType.enum';
import { EarlyMediaList } from '../store/_internals/enums/EarlyMedia.enum';

export default {
  name: 'opened-resource-general',
  mixins: [openedTabComponentMixin],
  computed: {
    cidType: {
      get() {
        return this.dropdownOptionsCidTypeList
          .find((type) => type.value === this.itemInstance.parameters.cidType);
      },
      set(value) {
        this.setItemParameterProp({
          prop: 'cidType',
          value: value.value,
        });
      },
    },
    ignoreEarlyMedia: {
      get() {
        return this.dropdownOptionsEarlyMediaList
          .find((media) => media.value === this.itemInstance.parameters.ignoreEarlyMedia);
      },
      set(value) {
        this.setItemParameterProp({
          prop: 'ignoreEarlyMedia',
          value: value.value,
        });
      },
    },
    dropdownOptionsCidTypeList() {
      return CidTypeList.map((type) => ({
        value: type.value,
        name: type.value,
      }));
    },
    dropdownOptionsEarlyMediaList() {
      return EarlyMediaList.map((type) => ({
        value: type.value,
        name: type.value,
      }));
    },
  },
  methods: {
    ...mapActions({
      setItemParameterProp(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_PARAMETERS_PROPERTY`, payload);
      },
    }),
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
