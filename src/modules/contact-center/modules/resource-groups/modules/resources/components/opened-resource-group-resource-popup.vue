<template>
  <wt-popup
    size="sm"
    min-width="480"
    overflow
    @close="close"
  >
    <template #title>
      {{ popupTitle }}
    </template>
    <template #main>
      <form>
        <wt-select
          :clearable="false"
          :label="$tc('objects.ccenter.res.res', 1)"
          :search-method="loadDropdownOptionsList"
          :v="v$.itemInstance.resource"
          :value="itemInstance.resource"
          required
          @input="setItemProp({ prop: 'resource', value: $event })"
        />
        <wt-input
          :label="$t('objects.ccenter.res.priority')"
          :value="itemInstance.priority"
          type="number"
          @input="setItemProp({ prop: 'priority', value: +$event })"
        />
        <wt-select
          :clearable="true"
          :label="$tc('objects.ccenter.res.reserveResource', 1)"
          :search-method="loadDropdownOptionsList"
          :v="v$.itemInstance.reserveResource"
          :value="itemInstance.reserveResource"
          @input="setItemProp({ prop: 'reserveResource', value: $event })"
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="disabledSave"
        @click="save"
      >
        {{ $t('objects.add') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ $t('objects.close') }}
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
  name: 'OpenedResNumbersPopup',
  mixins: [nestedObjectMixin],

  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    namespace: 'ccenter/resGroups/res',
  }),
  validations: {
    itemInstance: {
      resource: { required },
    },
  },
  computed: {
    popupTitle() {
      const action = this.id ? this.$t('reusable.edit') : this.$t('reusable.add');
      return action + ' ' + this.$tc('objects.ccenter.res.res', 1).toLowerCase();
    }
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
