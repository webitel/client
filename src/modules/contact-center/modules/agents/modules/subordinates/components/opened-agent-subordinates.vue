<template>
  <section>
    <subordinate-popup
      v-if="isSubordinatePopup"
      @close="closeSubordinatePopup"
    ></subordinate-popup>
    <object-list-popup
      v-if="isSupervisorPopup"
      :title="$tc('objects.ccenter.agents.supervisors', 2)"
      :data-list="subordinateSupervisors"
      :headers="subordinateSupervisorHeaders"
      @close="closeSupervisorPopup"
    ></object-list-popup>
    <object-list-popup
      v-if="isSkillsPopup"
      :title="$tc('objects.lookups.skills.skills', 2)"
      :data-list="subordinateSkills"
      :headers="subordinateSkillsHeaders"
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
        :data="dataList"
        :headers="headers"
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
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import SubordinatePopup from './opened-agent-subordinates-popup.vue';

export default {
  name: 'opened-agent-subordinates',
  mixins: [openedObjectTableTabMixin],
  components: { SubordinatePopup, ObjectListPopup },
  data: () => ({
    subNamespace: 'subordinates', // used in mixin map actions
    tableObjectRouteName: RouteNames.AGENTS, // this.itemLink() computing
    isSubordinatePopup: false,

    subordinateId: null, // "selected" id object list popup
    isSupervisorPopup: false, // object list popup
    isSkillsPopup: false, // object list popup

    isDeleteConfirmation: false,
  }),
  computed: {
    subordinateSupervisors() {
      return this.$store.getters[`${this.namespace}/${this.subNamespace}/GET_SUBORDINATE_SUPERVISORS`](this.subordinateId);
    },
    subordinateSupervisorHeaders() {
      return [{ value: 'name', text: this.$tc('objects.ccenter.agents.supervisors', 1) }];
    },
    subordinateSkills() {
      return this.$store.getters[`${this.namespace}/${this.subNamespace}/GET_SUBORDINATE_SKILLS`](this.subordinateId);
    },
    subordinateSkillsHeaders() {
      return [{ value: 'name', text: this.$tc('objects.lookups.skills.skills', 1) }];
    },
  },
  methods: {
    readSupervisor(item) {
      this.subordinateId = item.id;
      this.openSupervisorPopup();
    },
    openSupervisorPopup() {
      this.isSupervisorPopup = true;
    },
    closeSupervisorPopup() {
      this.isSupervisorPopup = false;
      this.subordinateId = null;
    },

    readSkills(item) {
      this.subordinateId = item.id;
      this.openSkillsPopup();
    },
    openSkillsPopup() {
      this.isSkillsPopup = true;
    },
    closeSkillsPopup() {
      this.isSkillsPopup = false;
      this.subordinateId = null;
    },

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
