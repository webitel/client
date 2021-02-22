<template>
  <wt-popup min-width="480" @close="close">
    <template slot="title">
      {{ $tc('objects.ccenter.skills.skills', 2) }}
    </template>
    <template slot="main">
      <section>
        <wt-table
          :data="dataList"
          :headers="headers"
          :selectable="false"
          :grid-actions="false"
        >
          <template slot="skill" slot-scope="{ item }">
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
  name: 'opened-team-agents-skills-popup',
  props: {
    itemId: {
      required: true,
    },
  },

  computed: {
    ...mapGetters('ccenter/teams/agents', {
      getSkills: 'GET_ITEM_SKILLS',
    }),
    dataList() {
      return this.getSkills(this.itemId);
    },
    headers() {
      return [
        { value: 'skill', text: this.$tc('objects.ccenter.skills.skills', 1) },
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
