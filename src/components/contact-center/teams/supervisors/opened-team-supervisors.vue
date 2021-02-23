<template>
  <section>
    <supervisor-popup
      v-if="isSupervisorPopup"
      @close="closePopup"
    ></supervisor-popup>
    <supervisor-subordinates-popup
      v-if="isSupervisorSubordinatesPopup"
      :item-id="supervisorId"
      @close="closeSubordinates"
    ></supervisor-subordinates-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.ccenter.agents.supervisors', 2) }}</h3>
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
        :headers="headers"
        :data="dataList"
        :grid-actions="!disableUserInput"
      >
        <template slot="name" slot-scope="{ item }">
          <item-link :link="itemLink(item)">
            {{ item.user.name }}
          </item-link>
        </template>

        <template slot="actions" slot-scope="{ item, index }">
          <wt-icon-btn
            class="table-action"
            icon="queue-member"
            :tooltip="$tc('objects.ccenter.agents.subordinates', 2)"
            tooltip-position="left"
            @click="openSubordinates(item)"
          ></wt-icon-btn>
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
import SupervisorPopup from './opened-team-supervisors-popup.vue';
import SupervisorSubordinatesPopup from './opened-team-supervisor-subordinates-popup.vue';
import openedObjectTableTabMixin from '../../../../mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../router/_internals/RouteNames.enum';

export default {
  name: 'opened-team-supervisors',
  mixins: [openedObjectTableTabMixin],
  components: { SupervisorPopup, SupervisorSubordinatesPopup },
  data: () => ({
    subNamespace: 'supervisors',
    tableObjectRouteName: RouteNames.AGENTS, // this.itemLink() computing
    supervisorId: null,
    isSupervisorPopup: false,
    isSupervisorSubordinatesPopup: false,
  }),

  computed: {
    ...mapState('ccenter/teams', {
      parentId: (state) => state.itemId,
    }),
    ...mapState('ccenter/teams/supervisors', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      size: (state) => state.size,
      search: (state) => state.search,
      isNext: (state) => state.isNextPage,
    }),
    headers() {
      return [
        { value: 'name', text: this.$tc('objects.ccenter.agents.supervisors', 2) },
      ];
    },
  },

  methods: {
    openSubordinates({ id }) {
      this.supervisorId = id;
      this.openSubordinatesPopup();
    },
    closeSubordinates() {
      this.supervisorId = null;
      this.closeSubordinatesPopup();
    },
    openPopup() {
      this.isSupervisorPopup = true;
    },
    closePopup() {
      this.isSupervisorPopup = false;
    },
    openSubordinatesPopup() {
      this.isSupervisorSubordinatesPopup = true;
    },
    closeSubordinatesPopup() {
      this.isSupervisorSubordinatesPopup = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
