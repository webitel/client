<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $tc('objects.lookups.buckets.buckets', 1) }}
    </template>
    <template v-slot:main>
      <form>
        <wt-select
          :value="itemInstance.bucket"
          :v="$v.itemInstance.bucket"
          :label="$tc('objects.lookups.buckets.buckets', 1)"
          :search-method="loadBucketsOptions"
          :clearable="false"
          required
          @input="setItemProp({ prop: 'bucket', value: $event })"
        ></wt-select>
        <wt-input
          :value="itemInstance.priority"
          :v="$v.itemInstance.priority"
          :label="$t('objects.ccenter.queues.bucketPriority')"
          type="number"
          required
          @input="setItemProp({ prop: 'priority', value: $event })"
        ></wt-input>
      </form>
    </template>
    <template slot="actions">
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
import { minValue, numeric, required } from 'vuelidate/lib/validators';
import BucketsAPI from '../../../../../../lookups/modules/buckets/api/buckets';
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'opened-queue-buckets-popup',
  mixins: [nestedObjectMixin],

  data: () => ({
    namespace: 'ccenter/queues/buckets',
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
