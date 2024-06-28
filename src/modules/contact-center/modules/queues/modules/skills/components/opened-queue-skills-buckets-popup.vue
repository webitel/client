<template>
  <wt-popup
    min-width="480"
    @close="close"
  >
    <template #title>
      {{ $tc('objects.lookups.buckets.buckets', 2) }}
    </template>
    <template #main>
      <section class="agent-buckets-popup">
        <wt-table
          :data="dataList"
          :grid-actions="false"
          :headers="headers"
          :selectable="false"
        >
          <template #bucket="{ item }">
            {{ item.name }}
          </template>
        </wt-table>
      </section>
    </template>
  </wt-popup>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "OpenedQueueSkillsBucketsPopup",
  props: {
    itemId: {
      required: true,
    },
  },

  computed: {
    ...mapGetters("ccenter/queues/skills", {
      getBuckets: "GET_ITEM_BUCKETS",
    }),
    dataList() {
      return this.getBuckets(this.itemId);
    },
    headers() {
      return [
        {
          value: "bucket",
          text: this.$t("reusable.name"),
        },
      ];
    },
  },

  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
