<template>
  <wt-popup v-bind="$attrs" size="sm" @close="close">
    <template #title>
      {{ $t('objects.lookups.buckets.buckets', 2) }}
    </template>
    <template #main>
      <section class="agent-buckets-popup">
        <wt-table :data="itemBuckets" :grid-actions="false" :headers="headers" :selectable="false">
          <template #bucket="{ item }">
            {{ item.name }}
          </template>
        </wt-table>
      </section>
    </template>
  </wt-popup>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapState } from 'vuex';

export default {
  name: 'OpenedQueueSkillsBucketsPopup',
  computed: {
    ...mapState({
      itemBuckets(state) {
        return getNamespacedState(state, 'ccenter/queues/skills').buckets;
      },
    }),
    headers() {
      return [
        {
          value: 'bucket',
          text: this.$t('reusable.name'),
        },
      ];
    },
  },

  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped></style>
