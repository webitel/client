<template>
  <section>
    <agent-popup
      v-if="isAgentPopup"
      @close="closePopup"
    ></agent-popup>
    <object-list-popup
      v-if="isSupervisorPopup"
      :title="$tc('objects.ccenter.agents.supervisors', 2)"
      :data-list="agentSupervisors"
      :headers="agentSupervisorHeaders"
      @close="closeSupervisorPopup"
    ></object-list-popup>
    <object-list-popup
      v-if="isSkillsPopup"
      :title="$tc('objects.lookups.skills.skills', 2)"
      :data-list="agentSkills"
      :headers="agentSkillsHeaders"
      @close="closeSkillsPopup"
    ></object-list-popup>
    <delete-confirmation-popup
      v-show="deleteConfirmation.isDeleteConfirmationPopup"
      :payload="deleteConfirmation"
      @close="closeDelete"
    ></delete-confirmation-popup>

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
        <wt-icon-btn
          v-if="!disableUserInput"
          :class="{'hidden': anySelected}"
          :tooltip="actionPanelDeleteTooltip"
          class="icon-action"
          icon="bucket"
          @click="callDelete(selectedRows)"
        ></wt-icon-btn>
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        ></wt-table-actions>
        <wt-icon-btn
          v-if="!disableUserInput"
          class="icon-action"
          icon="plus"
          @click="create"
        ></wt-icon-btn>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <div v-show="isLoaded" class="table-wrapper">
    <wt-table
        :headers="headers"
        :data="dataList"
        :grid-actions="!disableUserInput"
        sortable
        @sort="sort"
    >
      <template slot="name" slot-scope="{ item }">
        <item-link :link="itemLink(item)" target="_blank">
          {{ item.name }}
        </item-link>
      </template>
      <template slot="supervisor" slot-scope="{ item }">
        <one-plus-many
          :collection="item.supervisor"
          @input="readSupervisor(item)"
        ></one-plus-many>
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
import ObjectListPopup from '../../../../../../../app/components/utils/object-list-popup/object-list-popup.vue';
import AgentPopup from './opened-team-agent-popup.vue';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';

export default {
  name: 'opened-team-agents',
  mixins: [openedObjectTableTabMixin],
  components: { AgentPopup, ObjectListPopup },
  data: () => ({
    subNamespace: 'agents',
    tableObjectRouteName: RouteNames.AGENTS, // this.itemLink() computing
    isAgentPopup: false,
    isAgentSkillsPopup: false,

    agentId: null, // "selected" id object list popup
    isSupervisorPopup: false, // object list popup
    isSkillsPopup: false, // object list popup
  }),
  computed: {
    agentSupervisors() {
      return this.$store.getters[`${this.namespace}/${this.subNamespace}/GET_ITEM_PROP_BY_ID`](this.agentId, 'supervisor');
    },
    agentSupervisorHeaders() {
      return [{ value: 'name', text: this.$tc('objects.ccenter.agents.supervisors', 1) }];
    },
    agentSkills() {
      return this.$store.getters[`${this.namespace}/${this.subNamespace}/GET_ITEM_PROP_BY_ID`](this.agentId, 'skills');
    },
    agentSkillsHeaders() {
      return [{ value: 'name', text: this.$tc('objects.lookups.skills.skills', 1) }];
    },
  },

  methods: {
    readSupervisor(item) {
      this.agentId = item.id;
      this.openSupervisorPopup();
    },
    openSupervisorPopup() {
      this.isSupervisorPopup = true;
    },
    closeSupervisorPopup() {
      this.isSupervisorPopup = false;
      this.agentId = null;
    },

    readSkills(item) {
      this.agentId = item.id;
      this.openSkillsPopup();
    },
    openPopup() {
      this.isAgentPopup = true;
    },
    closePopup() {
      this.isAgentPopup = false;
    },
    openSkillsPopup() {
      this.isSkillsPopup = true;
    },
    closeSkillsPopup() {
      this.isSkillsPopup = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
