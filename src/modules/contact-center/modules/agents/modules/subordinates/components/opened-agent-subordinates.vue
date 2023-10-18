<template>
  <section>
    <subordinate-popup
      v-if="isSubordinatePopup"
      @close="closeSubordinatePopup"
    ></subordinate-popup>
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
      <h3 class="content-title">{{ $tc('objects.ccenter.agents.subordinates', 2) }}</h3>
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

    <wt-loader v-show="!isLoaded"></wt-loader>
    <wt-dummy
      v-if="dummy && isLoaded"
      :src="dummy.src"
      :text="dummy.text && $t(dummy.text)"
      class="dummy-wrapper"
    ></wt-dummy>
    <div
      v-show="dataList.length && isLoaded"
      class="table-wrapper"
    >
      <wt-table
        :data="dataList"
        :grid-actions="!disableUserInput"
        :headers="headers"
        sortable
        @sort="sort"
      >
        <template v-slot:name="{ item }">
          <wt-item-link
            :link="editLink(item)"
            target="_blank"
          >
            {{ item.name }}
          </wt-item-link>
        </template>
        <template v-slot:supervisor="{ item }">
          <one-plus-many
            :collection="item.supervisor"
            @input="readSupervisor(item)"
          ></one-plus-many>
        </template>
        <template v-slot:skills="{ item }">
          <one-plus-many
            :collection="item.skills"
            @input="readSkills(item)"
          ></one-plus-many>
        </template>
        <template v-slot:actions="{ item }">
          <wt-icon-action
            action="edit"
            @click="edit(item)"
          ></wt-icon-action>
          <wt-icon-action
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
import ObjectListPopup from '../../../../../../../app/components/utils/object-list-popup/object-list-popup.vue';
import { useDummy } from '../../../../../../../app/composables/useDummy';
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import agentSupervisorsAndSkillsPopupMixin from '../../../../../mixins/agentSupervisorsAndSkillsPopupMixin';
import SubordinatePopup from './opened-agent-subordinates-popup.vue';

const namespace = 'ccenter/agents';
const subNamespace = 'subordinates';

export default {
  name: 'opened-agent-subordinates',
  mixins: [openedObjectTableTabMixin, agentSupervisorsAndSkillsPopupMixin],
  components: { SubordinatePopup, ObjectListPopup },
  data: () => ({
    namespace,
    subNamespace, // used in mixin map actions
    tableObjectRouteName: RouteNames.AGENTS, // this.editLink() computing
    isSubordinatePopup: false,

    isDeleteConfirmation: false,
  }),
  setup() {
    const { dummy } = useDummy({ namespace: `${namespace}/${subNamespace}`, hiddenText: true });
    return { dummy };
  },
  methods: {
    openPopup() {
      return this.openSubordinatePopup();
    },
    openSubordinatePopup() {
      this.isSubordinatePopup = true;
    },
    closeSubordinatePopup() {
      this.isSubordinatePopup = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
