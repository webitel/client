<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $tc('objects.lookups.buckets.buckets', 1) }}
    </template>
    <template slot="main">
      <form>
        <wt-select
          :value="itemInstance.bucket"
          :v="$v.itemInstance.bucket"
          :label="$tc('objects.lookups.buckets.buckets', 1)"
          :search="loadBucketsOptions"
          :internal-search="false"
          :clearable="false"
          required
          @input="setItemProp({ prop: 'bucket', value: $event })"
        ></wt-select>
        <wt-input
          :value="itemInstance.ratio"
          :v="$v.itemInstance.ratio"
          :label="$t('objects.ccenter.queues.bucketRatio')"
          type="number"
          required
          @input="setItemProp({ prop: 'ratio', value: $event })"
        ></wt-input>
      </form>
    </template>
    <template slot="actions">
      <wt-button
        :disabled="computeDisabled"
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
import { getBucketsList } from '../../../../../api/lookups/buckets/buckets';
import nestedObjectMixin from '../../../../../mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'opened-queue-buckets-popup',
  mixins: [nestedObjectMixin],

  data: () => ({
    namespace: 'ccenter/queues/buckets',
  }),

  validations: {
    itemInstance: {
      bucket: { required },
      ratio: {
        numeric,
        minValue: minValue(0),
        required,
      },
    },
  },

  methods: {
    async loadBucketsOptions(search) {
      const response = await getBucketsList({ search });
      return response.list.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },
  },
};
</script>

<style scoped>

</style>
