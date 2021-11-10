<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $tc('objects.ccenter.res.res', 1) }}
    </template>
    <template slot="main">
      <form>
        <wt-select
          :value="itemInstance.resource"
          :v="$v.itemInstance.resource"
          :label="$tc('objects.ccenter.res.res', 1)"
          :search-method="loadDropdownOptionsList"
          :clearable="false"
          required
          @input="setItemProp({ prop: 'resource', value: $event })"
        ></wt-select>
        <wt-input
          :value="itemInstance.priority"
          :label="$t('objects.ccenter.res.priority')"
          type="number"
          @input="setItemProp({ prop: 'priority', value: +$event })"
        ></wt-input>
        <wt-select
          :value="itemInstance.reserveResource"
          :v="$v.itemInstance.reserveResource"
          :label="$tc('objects.ccenter.res.reserveResource', 1)"
          :search-method="loadDropdownOptionsList"
          :clearable="true"
          @input="setItemProp({ prop: 'reserveResource', value: $event })"
        ></wt-select>
      </form>
    </template>
    <template slot="actions">
      <wt-button
        :disabled="computeDisabled"
        @click="save"
      >{{ $t('objects.add') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >{{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import ResourcesAPI from '../../../../resources/api/resources';
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'opened-res-numbers-popup',
  mixins: [nestedObjectMixin],
  data: () => ({
    namespace: 'ccenter/resGroups/res',
  }),

  validations: {
    itemInstance: {
      resource: { required },
    },
  },

  methods: {
    loadDropdownOptionsList(params) {
      return ResourcesAPI.getLookup(params);
    },
  },
};
</script>

<style scoped>

</style>
