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
          <router-link
            class="nameLink"
            :to="agentLink(item)"
            target="_blank"
          >
            {{ item.user.name }}
          </router-link>
        </template>
        <template slot="supervisor" slot-scope="{ item }">
          <div>
            {{ item.supervisor.name }}
          </div>
        </template>
        <template slot="skills" slot-scope="{ item }">
          <div>
            <a
              v-if="item.skills.length"
              class="nameLink"
              tabIndex="0"
              @click.prevent="openSkillsPopup(item)"
              @keypress.enter.prevent="openSkillsPopup(item)"
            >{{ item.skills[0].name }}</a>
            <wt-badge v-if="item.skills.length > 1">
              +{{ item.skills.length - 1 }}
            </wt-badge>
          </div>
        </template>
        <template slot="actions" slot-scope="{ item, index }">
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
import openedObjectTableTabMixin from '../../../../mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../router/_internals/RouteNames.enum';

export default {
  name: 'opened-agent-subordinates',
  mixins: [openedObjectTableTabMixin],
  components: { SubordinatePopup, SkillsPopup },
  data: () => ({
    subNamespace: 'subordinates',
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
        { value: 'name', text: this.$tc('objects.ccenter.agents.subordinates', 1) },
        { value: 'supervisor', text: this.$tc('objects.ccenter.agents.supervisors', 1) },
        { value: 'skills', text: this.$tc('objects.ccenter.skills.skills', 2) },
      ];
    },
  },

  methods: {
    agentLink(item) {
      return { name: `${RouteNames.AGENTS}-edit`, params: { id: item.id } };
    },
    openSkillsPopup(item) {
      this.subordinateId = item.id;
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
.wt-badge {
  margin-left: var(--component-spacing);
}
</style>
