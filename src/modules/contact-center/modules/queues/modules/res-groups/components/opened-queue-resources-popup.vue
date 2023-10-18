<template>
  <wt-popup min-width="480" overflow @close="close">
    <template v-slot:title>
      {{ $tc('objects.ccenter.resGroups.resGroups', 1) }}
    </template>
    <template v-slot:main>
      <form>
        <wt-select
          :clearable="false"
          :label="$tc('objects.ccenter.resGroups.resGroups', 1)"
          :search-method="loadResGroupsOptions"
          :v="v$.itemInstance.resourceGroup"
          :value="itemInstance.resourceGroup"
          required
          @input="setItemProp({ prop: 'resourceGroup', value: $event })"
        ></wt-select>
      </form>
    </template>
    <template v-slot:actions>
      <wt-button
        :disabled="disabledSave"
        @click="save"
      >{{ $t('objects.save') }}
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
import ResourceGroupsAPI from '../../../../resource-groups/api/resourceGroups';

export default {
  name: 'opened-queue-buckets-popup',
  mixins: [nestedObjectMixin],
  data: () => ({
    namespace: 'ccenter/queues/resGroups',
  }),

  setup: () => ({
    v$: useVuelidate(),
  }),
  validations: {
    itemInstance: {
      resourceGroup: { required },
    },
  },

  methods: {
    loadResGroupsOptions(params) {
      return ResourceGroupsAPI.getLookup(params);
    },
  },
};
</script>

<style scoped>

</style>
