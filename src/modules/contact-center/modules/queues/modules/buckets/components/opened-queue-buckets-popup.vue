<template>
  <wt-popup min-width="480" overflow @close="close">
    <template v-slot:title>
      {{ $tc('objects.lookups.buckets.buckets', 1) }}
    </template>
    <template v-slot:main>
      <form>
        <wt-select
          :clearable="false"
          :label="$tc('objects.lookups.buckets.buckets', 1)"
          :search-method="loadBucketsOptions"
          :v="v$.itemInstance.bucket"
          :value="itemInstance.bucket"
          required
          @input="setItemProp({ prop: 'bucket', value: $event })"
        ></wt-select>
        <wt-input
          :label="$t('objects.ccenter.queues.bucketPriority')"
          :v="v$.itemInstance.priority"
          :value="itemInstance.priority"
          required
          type="number"
          @input="setItemProp({ prop: 'priority', value: $event })"
        ></wt-input>
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
import { minValue, numeric, required } from '@vuelidate/validators';
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';
import BucketsAPI from '../../../../../../lookups/modules/buckets/api/buckets';

export default {
  name: 'opened-queue-buckets-popup',
  mixins: [nestedObjectMixin],

  data: () => ({
    namespace: 'ccenter/queues/buckets',
  }),

  setup: () => ({
    v$: useVuelidate(),
  }),
  validations: {
    itemInstance: {
      bucket: { required },
      priority: {
        numeric,
        minValue: minValue(0),
        required,
      },
    },
  },

  methods: {
    loadBucketsOptions(params) {
      return BucketsAPI.getLookup(params);
    },
  },
};
</script>

<style scoped>

</style>
