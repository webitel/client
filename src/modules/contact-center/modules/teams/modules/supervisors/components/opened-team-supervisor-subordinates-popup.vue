<template>
  <wt-popup min-width="480" @close="close">
    <template v-slot:title>
      {{ $tc('objects.ccenter.agents.subordinates', 2) }}
    </template>
    <template v-slot:main>
      <section>
        <wt-table
          :data="dataList"
          :grid-actions="false"
          :headers="headers"
          :selectable="false"
        >
          <template v-slot:subordinate="{ item }">
            {{ item.user.name }}
          </template>
        </wt-table>
      </section>
    </template>
  </wt-popup>
</template>

<script>
import { mapState } from 'vuex';
import TeamsAPI from '../api/teamSupervisors';

export default {
  name: 'opened-team-supervisor-subordinates-popup',
  props: {
    itemId: {
      required: true,
    },
  },
  data: () => ({
    dataList: [],
  }),
  created() {
    this.loadDataList();
  },
  computed: {
    ...mapState('ccenter/teams/supervisors', {
      parentId: (state) => state.parentId,
    }),
    headers() {
      return [
        { value: 'subordinate', text: this.$tc('objects.ccenter.agents.subordinates', 1) },
      ];
    },
  },
  methods: {
    async loadDataList() {
      const params = {
        page: 1,
        size: 100,
        supervisorId: this.itemId,
        teamId: this.parentId,
      };
      const response = await TeamsAPI.getTeamSupervisorSubordinatesList(params);
      this.dataList = response.items;
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
