<template>
  <wt-popup min-width="480" overflow @close="close">
    <template v-slot:title>
      {{ $tc('objects.ccenter.res.res', 1) }}
    </template>
    <template v-slot:main>
      <form>
        <wt-select
          :clearable="false"
          :label="$tc('objects.ccenter.res.res', 1)"
          :search-method="loadDropdownOptionsList"
          :v="v$.itemInstance.resource"
          :value="itemInstance.resource"
          required
          @input="setItemProp({ prop: 'resource', value: $event })"
        ></wt-select>
        <wt-input
          :label="$t('objects.ccenter.res.priority')"
          :value="itemInstance.priority"
          type="number"
          @input="setItemProp({ prop: 'priority', value: +$event })"
        ></wt-input>
        <wt-select
          :clearable="true"
          :label="$tc('objects.ccenter.res.reserveResource', 1)"
          :search-method="loadDropdownOptionsList"
          :v="v$.itemInstance.reserveResource"
          :value="itemInstance.reserveResource"
          @input="setItemProp({ prop: 'reserveResource', value: $event })"
        ></wt-select>
      </form>
    </template>
    <template v-slot:actions>
      <wt-button
        :disabled="disabledSave"
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
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';
import ResourcesAPI from '../../../../resources/api/resources';

export default {
  name: 'opened-res-numbers-popup',
  mixins: [nestedObjectMixin],
  data: () => ({
    namespace: 'ccenter/resGroups/res',
  }),

  setup: () => ({
    v$: useVuelidate(),
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
