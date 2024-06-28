<template>
  <wt-popup
    min-width="480"
    overflow
    @close="close"
  >
    <template #title>
      {{ $tc('objects.ccenter.resGroups.resGroups', 1) }}
    </template>
    <template #main>
      <form>
        <wt-select
          :clearable="false"
          :label="$tc('objects.ccenter.resGroups.resGroups', 1)"
          :search-method="loadResGroupsOptions"
          :v="v$.itemInstance.resourceGroup"
          :value="itemInstance.resourceGroup"
          required
          @input="setItemProp({ prop: 'resourceGroup', value: $event })"
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        :disabled="disabledSave"
        @click="save"
      >
        {{ $t('objects.save') }}
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
import ResourceGroupsAPI from '../../../../resource-groups/api/resourceGroups';

export default {
  name: 'OpenedQueueBucketsPopup',
  mixins: [nestedObjectMixin],

  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    namespace: 'ccenter/queues/resGroups',
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
