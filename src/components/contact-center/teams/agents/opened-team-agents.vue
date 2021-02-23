<template>
  <section>
    <agent-skills-popup
        v-if="isAgentSkillsPopup"
        :itemId="this.agentId"
        @close="closeSkillsPopup"
    ></agent-skills-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.ccenter.agents.agents', 2) }}</h3>
      <div class="content-header__actions-wrap">
        <wt-search-bar
          :value="search"
          debounce
          @enter="loadList"
          @input="setSearch"
          @search="loadList"
        ></wt-search-bar>
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        ></wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <div v-show="isLoaded" class="table-wrapper">
    <wt-table
        :headers="headers"
        :data="dataList"
        :grid-actions="false"
    >
      <template slot="name" slot-scope="{ item }">
        <item-link :link="itemLink(item)">
          {{ item.user.name }}
        </item-link>
      </template>
      <template slot="supervisor" slot-scope="{ item }">
        <div v-if="item.supervisor">
          {{ item.supervisor.name }}
        </div>
      </template>

      <template slot="skills" slot-scope="{ item }">
        <one-plus-many
          :collection="item.skills"
          @input="readSkills(item)"
        ></one-plus-many>
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
import AgentSkillsPopup from './opened-team-agent-skills-popup.vue';
import openedObjectTableTabMixin from '../../../../mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../router/_internals/RouteNames.enum';

export default {
  name: 'opened-team-agents',
  mixins: [openedObjectTableTabMixin],
  components: { AgentSkillsPopup },
  data: () => ({
    subNamespace: 'agents',
    tableObjectRouteName: RouteNames.AGENTS, // this.itemLink() computing
    isAgentSkillsPopup: false,
    agentId: 0,
  }),
  computed: {
    ...mapState('ccenter/teams', {
      parentId: (state) => state.itemId,
    }),
    ...mapState('ccenter/teams/agents', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      size: (state) => state.size,
      search: (state) => state.search,
      isNext: (state) => state.isNextPage,
    }),
    headers() {
      return [
        { value: 'name', text: this.$t('objects.name') },
        { value: 'supervisor', text: this.$tc('objects.ccenter.agents.supervisors', 1) },
        { value: 'skills', text: this.$tc('objects.ccenter.skills.skills', 2) },
      ];
    },
  },

  methods: {
    readSkills(item) {
      this.agentId = item.id;
      this.openSkillsPopup();
    },

    openSkillsPopup() {
      this.isAgentSkillsPopup = true;
    },

    closeSkillsPopup() {
      this.isAgentSkillsPopup = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.hidden-num {
  @extend .typo-body-md;

  margin-left: 33px;
  text-decoration: underline;
  cursor: pointer;
}
</style>
