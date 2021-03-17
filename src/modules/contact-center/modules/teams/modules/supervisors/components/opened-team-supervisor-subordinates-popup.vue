<template>
  <wt-popup min-width="480" @close="close">
    <template slot="title">
      {{ $tc('objects.ccenter.agents.subordinates', 2) }}
    </template>
    <template slot="main">
      <section>
        <wt-table
          :data="dataList"
          :headers="headers"
          :selectable="false"
          :grid-actions="false"
        >
          <template slot="subordinate" slot-scope="{ item }">
            {{ item.user.name }}
          </template>
        </wt-table>
      </section>
    </template>
  </wt-popup>
</template>

<script>
import { mapState } from 'vuex';
import { getTeamSupervisorSubordinatesList } from '../api/teamSupervisors';

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
      const response = await getTeamSupervisorSubordinatesList(params);
      this.dataList = response.list;
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
