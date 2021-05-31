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
        sortable
        @sort="sort"
    >
      <template slot="name" slot-scope="{ item }">
        <item-link :link="itemLink(item)" target="_blank">
          {{ item.name }}
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
      <template slot="actions" slot-scope="{ item }">
        <edit-action
          @click="edit(item)"
        ></edit-action>
        <delete-action
          @click="callDelete(item)"
        ></delete-action>
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
import AgentSkillsPopup from './opened-queue-agent-skills-popup.vue';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';

export default {
  name: 'opened-queue-agents',
  mixins: [openedObjectTableTabMixin],
  components: { AgentSkillsPopup },
  data: () => ({
    subNamespace: 'agents',
    tableObjectRouteName: RouteNames.AGENTS, // this.itemLink() computing
    isAgentSkillsPopup: false,
    agentId: 0,

    isDeleteConfirmation: false,
  }),

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
</style>
