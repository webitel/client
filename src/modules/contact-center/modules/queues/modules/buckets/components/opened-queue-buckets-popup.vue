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
          :label="$tc('objects.lookups.buckets.buckets', 1)"
          :search-method="loadBucketsOptions"
          :v="v$.itemInstance.bucket"
          :value="itemInstance.bucket"
          required
          @input="setItemProp({ prop: 'bucket', value: $event })"
        />
        <wt-input
          :label="$t('objects.ccenter.queues.bucketPriority')"
          :v="v$.itemInstance.priority"
          :value="itemInstance.priority"
          required
          type="number"
          @input="setItemProp({ prop: 'priority', value: $event })"
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
import { minValue, numeric, required } from '@vuelidate/validators';
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';
import BucketsAPI from '../../../../../../lookups/modules/buckets/api/buckets';

export default {
  name: 'OpenedQueueBucketsPopup',
  mixins: [nestedObjectMixin],

  setup: () => ({
    v$: useVuelidate(),
  }),

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
  computed: {
    popupTitle() {
      return this.id
        ? this.$t('objects.ccenter.queues.buckets.editBucket')
        : this.$t('objects.ccenter.queues.buckets.addBucket');
    }
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
