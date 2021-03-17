<template>
  <section>
    <subordinate-popup
      v-if="isSubordinatePopup"
      @close="closeSubordinatePopup"
    ></subordinate-popup>
    <skills-popup
      v-if="isSkillsPopup"
      :itemId="subordinateId"
      @close="closeSkillsPopup"
    ></skills-popup>

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
          :tooltip="$t('iconHints.deleteSelected')"
          class="icon-action"
          icon="bucket"
          @click="deleteSelected"
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
      >
        <template slot="name" slot-scope="{ item }">
          <item-link :link="itemLink(item)" target="_blank">
            {{ item.name }}
          </item-link>
        </template>
        <template slot="supervisor" slot-scope="{ item }">
          <div>
            {{ item.supervisor.name }}
          </div>
        </template>
        <template slot="skills" slot-scope="{ item }">
          <one-plus-many
            :collection="item.skills"
            @input="readSkills(item)"
          ></one-plus-many>
        </template>
        <template slot="actions" slot-scope="{ item, index }">
          <edit-action
            @click="edit(item)"
          ></edit-action>
          <delete-action
            @click="remove(index)"
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
import { mapState } from 'vuex';
import SubordinatePopup from './opened-agent-subordinates-popup.vue';
import SkillsPopup from './opened-agent-subordinate-skills-popup.vue';
import openedObjectTableTabMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../../../app/router/_internals/RouteNames.enum';

export default {
  name: 'opened-agent-subordinates',
  mixins: [openedObjectTableTabMixin],
  components: { SubordinatePopup, SkillsPopup },
  data: () => ({
    subNamespace: 'subordinates', // used in mixin map actions
    tableObjectRouteName: RouteNames.AGENTS, // this.itemLink() computing
    isSubordinatePopup: false,
    isSkillsPopup: false,
    subordinateId: null,
  }),

  computed: {
    ...mapState('ccenter/agents', {
      parentId: (state) => state.itemId,
    }),
    ...mapState('ccenter/agents/subordinates', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      size: (state) => state.size,
      search: (state) => state.search,
      isNext: (state) => state.isNextPage,
    }),
    headers() {
      return [
        { value: 'name', text: this.$t('objects.name') },
        { value: 'supervisor', text: this.$tc('objects.ccenter.agents.supervisors', 1) },
        { value: 'skills', text: this.$tc('objects.lookups.skills.skills', 2) },
      ];
    },
  },

  methods: {
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
