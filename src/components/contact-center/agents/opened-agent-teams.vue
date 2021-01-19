<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.ccenter.teams.teams', 2) }}</h3>
      <div class="content-header__actions-wrap">
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        ></wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <div v-show="isLoaded" class="table-wrapper">
    <wt-table
      :data="dataList"
      :headers="headers"
      :selectable="false"
      :grid-actions="false"
    >
      <template slot="name" slot-scope="{ item }">
        <div v-if="item.team">
          {{ item.team.name }}
        </div>
      </template>

      <template slot="strategy" slot-scope="{ item }">
        {{ computeStrategy(item.strategy) }}
      </template>
    </wt-table>
      <wt-pagination
        :next="isNext"
        :prev="page > 1"
        :size="size"
        debounce
        @change="loadList"
        @input="setSize"
        @next="nextPage"
        @prev="prevPage"
      ></wt-pagination>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import openedObjectTableTabMixin from '../../../mixins/openedObjectTableTabMixin/openedObjectTableTabMixin';

export default {
  name: 'opened-agent-teams',
  mixins: [openedObjectTableTabMixin],
  data: () => ({
    subNamespace: 'teams',
  }),

  computed: {
    ...mapState('ccenter/agents', {
      parentId: (state) => state.itemId,
    }),
    ...mapState('ccenter/agents/teams', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      size: (state) => state.size,
      search: (state) => state.search,
      isNext: (state) => state.isNextPage,
    }),
    headers() {
      return [
        { value: 'name', text: this.$tc('objects.ccenter.teams.teams', 2) },
        { value: 'strategy', text: this.$t('objects.ccenter.teams.strategy') },
      ];
    },
  },

  methods: {
    computeStrategy(strategy) {
      switch (strategy) {
        case 'random':
          return 'Random';
        case 'fewest-calls':
          return 'Agent with fewest calls';
        case 'least-talk-time':
          return 'Agent with least talk time';
        case 'top-down':
          return 'Top-Down';
        case 'round-robin':
          return 'Round robbin';
        case 'longest-idle-time':
          return 'Longest idle Agent';
        default:
          return 'Unknown';
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
