<template>
  <section>
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
            v-model="stateForAll"
            :label="$t('objects.ccenter.agents.stateForAll')"
            @change="changeStateForAll"
          >
          </wt-switcher>
          <wt-icon-btn
            v-if="!disableUserInput"
            class="icon-action"
            :class="{'hidden': anySelected}"
            icon="arrow-mix"
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
            @input="handlePatchInput(item, index, 'capacity', $event)"
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
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import objectTableAccessControlMixin
  from '../../../../../../../app/mixins/objectPagesMixins/objectTableMixin/_internals/objectTableAccessControlMixin';
import AgentSkillsAPI from '../api/skillAgents';

export default {
  name: 'opened-skill-agents',
  mixins: [openedObjectTableTabMixin, objectTableAccessControlMixin],

  data: () => ({
    namespace: 'lookups/skills',
    subNamespace: 'agents',
    tableObjectRouteName: RouteNames.AGENTS, // this.editLink() computing
    isAgentPopup: false,
    agentSkillPopup: false,
    agentSkillStatePopup: false,
    stateForAll: false,
  }),
  methods: {
    changeStateForAll() {
      const { parentId } = this;
      const changes = {
        enabled: !this.stateForAll,
      };
      AgentSkillsAPI.patch({ parentId, changes });
    },
    handlePatchInput(item, index, propertyToPatch, $event) {
      this.debounce(() => {
        this.patchItem({ item, index, prop: propertyToPatch, value: $event });
      }, 500);
    },

    debounce(func, delay) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(func, delay);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
