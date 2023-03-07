<template>
  <wt-popup min-width="480" @close="close">
    <template v-slot:title>
      {{ $tc('objects.lookups.skills.skills', 2) }}
    </template>
    <template v-slot:main>
      <section>
        <wt-table
          :data="dataList"
          :headers="headers"
          :selectable="false"
          :grid-actions="false"
        >
          <template v-slot:skill="{ item }">
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
  name: 'opened-queue-agent-skills-popup',
  props: {
    itemId: {
      required: true,
    },
  },

  computed: {
    ...mapGetters('ccenter/queues/agents', {
      getSkills: 'GET_ITEM_SKILLS',
    }),
    dataList() {
      return this.getSkills(this.itemId);
    },
    headers() {
      return [
        { value: 'skill', text: this.$tc('objects.lookups.skills.skills', 1) },
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
