<template>
  <section>
    <agent-popup
      v-if="isAgentPopup"
      @close="closePopup"
    ></agent-popup>
    <delete-confirmation-popup
      v-show="deleteConfirmation.isDeleteConfirmationPopup"
      :payload="deleteConfirmation"
      @close="closeDelete"
    ></delete-confirmation-popup>
    <object-list-popup
      v-if="isSupervisorPopup"
      :title="$tc('objects.ccenter.agents.supervisors', 2)"
      :data-list="openedItemSupervisors"
      :headers="openedItemSupervisorHeaders"
      @close="closeSupervisorPopup"
    ></object-list-popup>
    <object-list-popup
      v-if="isSkillsPopup"
      :title="$tc('objects.lookups.skills.skills', 2)"
      :data-list="openedItemSkills"
      :headers="openedItemSkillsHeaders"
      @close="closeSkillsPopup"
    ></object-list-popup>

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
            :label="'State for all'"
          >
          </wt-switcher>
          <wt-icon-btn
            v-if="!disableUserInput"
            class="icon-action"
            icon="plus"
            @click="create"
          ></wt-icon-btn>
          <delete-all-action
            v-if="!disableUserInput"
            :selected-count="selectedRows.length"
            @click="callDelete(selectedRows)"
          ></delete-all-action>
        </wt-table-actions>
      </div>
    </header>

    <div v-show="isLoaded" class="table-wrapper">
      {{headers}}
      <wt-table
      :headers="headers"
      :data="dataList"
      :grid-actions="!disableUserInput"
      sortable
      @sort="sort"
    >
      <template v-slot:name="{ item }">
        <item-link :link="editLink(item)" target="_blank">
          {{ item.name }}
        </item-link>
      </template>
      <template v-slot:team="{ item }">
        <item-link :link="editLink(item)" target="_blank">
          {{ item.team.name }}
        </item-link>
      </template>
      <template v-slot:capacity="{ item }">
        <wt-input
          v-model="item.capacity"
          type="number"
        ></wt-input>
      </template>
      <template v-slot:state="{ item }">
        <wt-switcher v-model="item.enabled"></wt-switcher>
      </template>
      <template v-slot:actions="{ item }">
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
import { snakeToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import agentSupervisorsAndSkillsPopupMixin from '../../../../../mixins/agentSupervisorsAndSkillsPopupMixin';
import agentStatusMixin from '../../../../../mixins/agentStatusMixin';

export default {
  name: 'opened-skill-agents',
  mixins: [openedObjectTableTabMixin, agentSupervisorsAndSkillsPopupMixin, agentStatusMixin],

  data: () => ({
    subNamespace: 'agents',
    tableObjectRouteName: RouteNames.AGENTS, // this.editLink() computing
    isAgentPopup: false,
 }),

  methods: {
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
    snakeToCamel,
  },
};
</script>

<style lang="scss" scoped>
</style>
