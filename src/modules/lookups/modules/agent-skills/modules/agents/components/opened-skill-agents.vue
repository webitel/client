<template>
  <section>
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
            :label-left="true"
            :value="aggs.enabled"
            :label="$t('objects.ccenter.agents.stateForAll')"
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
          <div v-if="item.team">
            {{ item.team.name }}
          </div>
        </template>
        <template v-slot:capacity="{ item, index }">
          <wt-input
            v-model="item.capacity"
            type="number"
            @input="handlePatchInput({item, index, prop:'capacity', value:$event})"
          ></wt-input>
        </template>
        <template v-slot:state="{ item, index }">
          <wt-switcher
            :value="item.enabled"
            @change="handlePatchEnabled({ item, index, prop: 'enabled', value: $event })"
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
import debounce from '@webitel/ui-sdk/src/scripts/debounce';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import objectTableAccessControlMixin
  from '../../../../../../../app/mixins/objectPagesMixins/objectTableMixin/_internals/objectTableAccessControlMixin';
import AgentSkillsAPI from '../api/skillAgents';
import ChangeSkillPopup from './opened-skill-agent-change-popup.vue';

export default {
  name: 'opened-skill-agents',
  mixins: [openedObjectTableTabMixin, objectTableAccessControlMixin],
  components: { ChangeSkillPopup },

  data: () => ({
    namespace: 'lookups/skills',
    subNamespace: 'agents',
    tableObjectRouteName: RouteNames.AGENTS, // this.editLink() computing
    isAgentPopup: false,
    agentSkillPopup: false,
    agentSkillStatePopup: false,
  }),
  methods: {
    openAgentSkillPopup() {
      this.agentSkillPopup = true;
    },
    closeAgentSkillPopup() {
      this.agentSkillPopup = false;
    },
    async changeStateForAll(enabled) {
      const { parentId } = this;
      const changes = {
        enabled,
      };
      await AgentSkillsAPI.patch({ parentId, changes });
      this.loadDataList();
    },
    handlePatchInput(payload) {
      this.patchItem(payload);
    },
    async handlePatchEnabled(payload) {
      await this.patchItem(payload);
      await this.loadDataList();
    },
  },
  mounted() {
    this.handlePatchInput = debounce(this.handlePatchInput);
  },
};
</script>

<style lang="scss" scoped>
</style>
