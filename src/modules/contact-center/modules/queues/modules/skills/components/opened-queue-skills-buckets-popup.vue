<template>
  <wt-popup min-width="480" @close="close">
    <template slot="title">
      {{ $tc('objects.lookups.buckets.buckets', 2) }}
    </template>
    <template slot="main">
      <section class="agent-buckets-popup">
        <wt-table
          :data="dataList"
          :headers="headers"
          :selectable="false"
          :grid-actions="false"
        >
          <template slot="bucket" slot-scope="{ item }">
            {{ item.name }}
          </template>
        </wt-table>
      </section>
    </template>
  </wt-popup>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'opened-queue-skills-buckets-popup',
  props: {
    itemId: {
      required: true,
    },
  },

  computed: {
    ...mapGetters('ccenter/queues/skills', {
      getBuckets: 'GET_ITEM_BUCKETS',
    }),
    dataList() {
      return this.getBuckets(this.itemId);
    },
    headers() {
      return [
        { value: 'bucket', text: this.$tc('objects.lookups.buckets.buckets', 1) },
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

<style lang="scss" scoped>
</style>
