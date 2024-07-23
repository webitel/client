<template>
  <wt-popup
    v-bind="$attrs"
    :shown="!!isBucket"
    size="sm"
    @close="close"
  >
    <template #title>
      {{ $tc('objects.lookups.buckets.buckets', 2) }}
    </template>
    <template #main>
      <section class="agent-buckets-popup">
        <wt-table
          :data="itemBuckets"
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
import { mapActions, mapGetters, mapState } from 'vuex';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';

export default {
  name: 'OpenedQueueSkillsBucketsPopup',
  data: () => ({
    buckets: [],
    itemId: 0,
  }),

  computed: {
    ...mapState({
      itemBuckets(state) {
        return getNamespacedState(state,'ccenter/queues/skills').buckets;
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
    isBucket() {
      return this.$route.query.bucket;
    }
  },

  methods: {
    async getItemBuckets() {
      await this.$store.dispatch('ccenter/queues/skills/GET_ITEM_BUCKETS', this.itemId);
    },
    close() {
      this.$emit('close');
    },
    setItemId(id) {
      this.itemId = +id;
    }
  },

  watch: {
    isBucket: {
     async handler(id) {
        if (id) {
          this.setItemId(id);
          await this.getItemBuckets();
        }
      }, immediate: true,
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
