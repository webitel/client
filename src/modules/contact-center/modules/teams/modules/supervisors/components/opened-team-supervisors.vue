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
      :text="$t(dummy.text)"
      class="dummy-wrapper"
    ></wt-dummy>
    <div
      v-show="dataList.length && isLoaded"
      class="table-wrapper">
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

        <template v-slot:actions="{ item }">
          <wt-tooltip class="table-action">
            <template v-slot:activator>
              <wt-icon-btn
                icon="queue-member"
                @click="openSubordinates(item)"
              ></wt-icon-btn>
            </template>
              {{ $tc('objects.ccenter.agents.subordinates', 2) }}
          </wt-tooltip>
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
import { useDummy } from '../../../../../../../app/composables/useDummy';

const namespace = 'ccenter/teams';
const subNamespace = 'supervisors';

export default {
  name: 'opened-team-supervisors',
  mixins: [openedObjectTableTabMixin],
  components: { SupervisorPopup, SupervisorSubordinatesPopup },
  data: () => ({
    namespace,
    subNamespace,
    tableObjectRouteName: RouteNames.AGENTS, // this.editLink() computing
    supervisorId: null,
    isSupervisorPopup: false,
    isSupervisorSubordinatesPopup: false,
  }),

  setup() {
    const { dummy } = useDummy({ namespace: `${namespace}/${subNamespace}` });
    return { dummy };
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
