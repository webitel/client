<template>
  <section>
    <skill-popup
      @open-agent-skill-state-popup="openAgentSkillStatePopup"
      @selecting-agents="selectingAgents"
      v-if="isAgentPopup"
      @close="closePopup"
    ></skill-popup>
    <skill-state-popup
      @change-agents-state="changeAgentsState"
      @previous-agent-state-popup="closeAgentSkillStatePopup();openPopup();"
      v-if="agentSkillStatePopup"
      @close="closeAgentSkillStatePopup"
    ></skill-state-popup>
    <change-skill-popup
      :selected-rows="selectedRows"
      v-if="agentSkillPopup"
      @close="closeAgentSkillPopup"
    ></change-skill-popup>
    <delete-confirmation-popup
      v-show="deleteConfirmation.isDeleteConfirmationPopup"
      :payload="deleteConfirmation"
      @close="closeDelete"
    ></delete-confirmation-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.ccenter.agents.allAgents') }}</h3>
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
        >
          <wt-switcher
            :labelLeft="true"
            v-model="stateForAll"
            :label="'State for all'"
            @change="changeStateForAll"
          >
          </wt-switcher>
          <wt-icon-btn
            v-if="!disableUserInput"
            class="icon-action"
            :class="{'hidden': anySelected}"
            icon="arrow-mix"
            @click="openAgentSkillPopup"
          ></wt-icon-btn>
          <delete-all-action
            v-if="!disableUserInput"
            :class="{'hidden': anySelected}"
            :selected-count="selectedRows.length"
            @click="callDelete(selectedRows)"
          ></delete-all-action>
          <wt-icon-btn
            v-if="!disableUserInput"
            class="icon-action"
            icon="plus"
            @click="create"
          ></wt-icon-btn>
        </wt-table-actions>
      </div>
    </header>

    <div v-show="isLoaded" class="table-wrapper">
      {{ dataList }}<br>
      {{ parentId }}
      <wt-table
        :headers="headers"
        :data="dataList"
        :grid-actions="hasTableActions"
        sortable
        @sort="sort"
      >
        <template v-slot:name="{ item }">
            {{ item.agent.name }}
        </template>
        <template v-slot:team="{ item }">
            {{ item.team.name }}
        </template>
        <template v-slot:capacity="{ item, index }">
          <wt-input
            v-model="item.capacity"
            type="number"
            @input="patchItem({ item, index, prop: 'capacity', value: $event });"
          ></wt-input>
        </template>
        <template v-slot:state="{ item, index }">
          <wt-switcher
            :value="item.enabled"
            @change="patchItem({ item, index, prop: 'enabled', value: $event });"
          ></wt-switcher>
        </template>
        <template v-slot:actions="{ item }">
          <wt-icon-action
            v-if="hasDeleteAccess"
            action="delete"
            class="table-action"
            @click="callDelete(item)"
          ></wt-icon-action>
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
import { snakeToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import objectTableAccessControlMixin
  from '../../../../../../../app/mixins/objectPagesMixins/objectTableMixin/_internals/objectTableAccessControlMixin';
import SkillPopup from './opened-skill-agent-popup.vue';
import SkillStatePopup from './opened-skill-agent-state-popup.vue';
import ChangeSkillPopup from './opened-skill-agent-change-popup.vue';
import AgentSkillsAPI from '../api/skillAgents';

const namespace = 'lookups/skills';
const subNamespace = 'agents';
export default {
  name: 'opened-skill-agents',
  mixins: [openedObjectTableTabMixin, objectTableAccessControlMixin],
  components: { SkillPopup, ChangeSkillPopup, SkillStatePopup },
  props: {
    selectedSkillsRows: {
      type: Object,
      required: false,
    },
  },

  data: () => ({
    namespace,
    subNamespace,
    tableObjectRouteName: RouteNames.AGENTS, // this.editLink() computing
    isAgentPopup: false,
    agentSkillPopup: false,
    agentSkillStatePopup: false,
    stateForAll: false,
    agentsSelectedRows: [],
 }),

  methods: {
    openPopup() {
      this.isAgentPopup = true;
    },
    closePopup() {
      this.isAgentPopup = false;
    },
    openAgentSkillPopup() {
      this.agentSkillPopup = true;
    },
    closeAgentSkillPopup() {
      this.agentSkillPopup = false;
    },
    openAgentSkillStatePopup() {
      this.agentSkillStatePopup = true;
    },
    closeAgentSkillStatePopup() {
      this.agentSkillStatePopup = false;
    },
    snakeToCamel,
    changeStateForAll() {
      this.dataList.forEach((item, index) => {
        // TODO: Rewrite to BULK_PATCH
        this.patchItem({ item, index, prop: 'enabled', value: !this.stateForAll });
      });
    },
    selectingAgents(selectedRows) {
      this.agentsSelectedRows = selectedRows.map((obj) => ({
        id: obj.id,
      }));
    },
    changeAgentsState(agentsState) {
      const { parentId } = this;
      const itemInstance = { ...agentsState };
      itemInstance.agent = [].concat(this.agentsSelectedRows);
      AgentSkillsAPI.add({ parentId, itemInstance });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
