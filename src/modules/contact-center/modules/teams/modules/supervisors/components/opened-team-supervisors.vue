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
    <delete-confirmation-popup
      v-show="deleteConfirmation.isDeleteConfirmationPopup"
      :payload="deleteConfirmation"
      @close="closeDelete"
    ></delete-confirmation-popup>

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
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        >
          <wt-icon-btn
            v-if="!disableUserInput"
            :class="{'hidden': anySelected}"
            :tooltip="actionPanelDeleteTooltip"
            class="icon-action"
            icon="bucket"
            @click="callDelete(selectedRows)"
          ></wt-icon-btn>
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
    <div v-show="isLoaded" class="table-wrapper">
      <wt-table
        :headers="headers"
        :data="dataList"
        :grid-actions="!disableUserInput"
        sortable
        @sort="sort"
      >
        <template slot="name" slot-scope="{ item }">
          <item-link :link="itemLink(item)" target="_blank">
            {{ item.name }}
          </item-link>
        </template>

        <template slot="actions" slot-scope="{ item }">
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
import SupervisorPopup from './opened-team-supervisors-popup.vue';
import SupervisorSubordinatesPopup from './opened-team-supervisor-subordinates-popup.vue';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';

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
