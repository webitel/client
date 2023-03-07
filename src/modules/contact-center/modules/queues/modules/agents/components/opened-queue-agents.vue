<template>
  <section>
    <object-list-popup
      v-if="isSupervisorPopup"
      :data-list="openedItemSupervisors"
      :headers="openedItemSupervisorHeaders"
      :title="$tc('objects.ccenter.agents.supervisors', 2)"
      @close="closeSupervisorPopup"
    ></object-list-popup>
    <object-list-popup
      v-if="isSkillsPopup"
      :data-list="openedItemSkills"
      :headers="openedItemSkillsHeaders"
      :title="$tc('objects.lookups.skills.skills', 2)"
      @close="closeSkillsPopup"
    ></object-list-popup>

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
        :data="dataList"
        :grid-actions="false"
        :headers="headers"
        sortable
        @sort="sort"
      >
        <template v-slot:name="{ item }">
          <item-link :link="editLink(item)" target="_blank">
            {{ item.name }}
          </item-link>
        </template>
        <template v-slot:supervisor="{ item }">
          <one-plus-many
            :collection="item.supervisor"
            @input="readSupervisor(item)"
          ></one-plus-many>
        </template>
        <template v-slot:state="{ item }">
          <wt-indicator
            :color="statusIndicatorColor[snakeToCamel(item.status)]"
            :text="statusIndicatorText[snakeToCamel(item.status)]"
          ></wt-indicator>
        </template>
        <template v-slot:skills="{ item }">
          <one-plus-many
            :collection="item.skills"
            @input="readSkills(item)"
          ></one-plus-many>
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
import ObjectListPopup from '../../../../../../../app/components/utils/object-list-popup/object-list-popup.vue';
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import agentStatusMixin from '../../../../../mixins/agentStatusMixin';
import agentSupervisorsAndSkillsPopupMixin from '../../../../../mixins/agentSupervisorsAndSkillsPopupMixin';

export default {
  name: 'opened-queue-agents',
  mixins: [openedObjectTableTabMixin, agentSupervisorsAndSkillsPopupMixin, agentStatusMixin],
  components: { ObjectListPopup },
  data: () => ({
    subNamespace: 'agents',
    tableObjectRouteName: RouteNames.AGENTS, // this.editLink() computing

    isDeleteConfirmation: false,
  }),
  methods: {
    snakeToCamel,
  },
};
</script>

<style lang="scss" scoped>
</style>
