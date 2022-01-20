<template>
  <section>
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
        <one-plus-many
          :collection="item.supervisor"
          @input="readSupervisor(item)"
        ></one-plus-many>
      </template>
      <template slot="state" slot-scope="{ item }">
        <wt-indicator
          :color="statusIndicatorColor[item.status]"
          :text="statusIndicatorText[item.status]"
        ></wt-indicator>
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
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import agentSupervisorsAndSkillsPopupMixin from '../../../../../mixins/agentSupervisorsAndSkillsPopupMixin';
import agentStatusMixin from '../../../../../mixins/agentStatusMixin';

export default {
  name: 'opened-queue-agents',
  mixins: [openedObjectTableTabMixin, agentSupervisorsAndSkillsPopupMixin, agentStatusMixin],
  components: { ObjectListPopup },
  data: () => ({
    subNamespace: 'agents',
    tableObjectRouteName: RouteNames.AGENTS, // this.itemLink() computing

    isDeleteConfirmation: false,
  }),
};
</script>

<style lang="scss" scoped>
</style>
