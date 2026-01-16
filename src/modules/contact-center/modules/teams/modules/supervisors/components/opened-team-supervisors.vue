<template>
  <section class="table-section">
    <supervisor-popup @close="closePopup" />
    <supervisor-subordinates-popup :shown="isSupervisorSubordinatesPopup" :item-id="supervisorId"
      @close="closeSubordinates" />
    <delete-confirmation-popup :shown="isDeleteConfirmationPopup" :delete-count="deleteCount" :callback="deleteCallback"
      @close="closeDelete" />

    <header class="table-title">
      <h3 class="table-title__title">
        {{ $t('objects.ccenter.agents.supervisors', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-search-bar :value="search" debounce @enter="loadList" @input="setSearch" @search="loadList" />
        <wt-table-actions :icons="['refresh']" @input="tableActionsHandler">
          <delete-all-action v-if="!disableUserInput" :class="{ 'hidden': anySelected }"
            :selected-count="selectedRows.length" @click="askDeleteConfirmation({
              deleted: selectedRows,
              callback: () => deleteData(selectedRows),
            })" />
          <wt-icon-btn v-if="!disableUserInput" class="icon-action" icon="plus" @click="create" />
        </wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded" />
    <wt-dummy v-if="dummy && isLoaded" :src="dummy.src" :dark-mode="darkMode" :text="dummy.text && $t(dummy.text)"
      class="dummy-wrapper" />
    <div
      v-show="dataList.length && isLoaded"
      class="table-section__table-wrapper"
    >
      <wt-table :data="dataList" :grid-actions="!disableUserInput" :headers="headers" sortable @sort="sort">
        <template #name="{ item }">
          <wt-item-link :link="editLink(item)" target="_blank">
            {{ item.name }}
          </wt-item-link>
        </template>

        <template #actions="{ item }">
          <wt-icon-btn v-tooltip="$t('objects.ccenter.agents.subordinates', 2)" icon="queue-member"
            @click="openSubordinates(item)" />

          <wt-icon-action action="edit" @click="editItem(item)" />
          <wt-icon-action action="delete" @click="askDeleteConfirmation({
            deleted: [item],
            callback: () => deleteData(item),
          })" />
        </template>
      </wt-table>
      <wt-pagination :next="isNext" :prev="page > 1" :size="size" debounce @change="loadList" @input="setSize"
        @next="nextPage" @prev="prevPage" />
    </div>
  </section>
</template>

<script>
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';

import { useDummy } from '../../../../../../../app/composables/useDummy';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import TeamsRouteNames from '../../../router/_internals/TeamsRouteNames.enum.js';
import SupervisorSubordinatesPopup from './opened-team-supervisor-subordinates-popup.vue';
import SupervisorPopup from './opened-team-supervisors-popup.vue';

const namespace = 'ccenter/teams';
const subNamespace = 'supervisors';

export default {
  name: 'OpenedTeamSupervisors',
  components: {
    SupervisorPopup,
    SupervisorSubordinatesPopup,
    DeleteConfirmationPopup,
  },
  mixins: [openedObjectTableTabMixin],

  setup() {
    const { dummy } = useDummy({
      namespace: `${namespace}/${subNamespace}`,
      hiddenText: true,
    });
    const {
      isVisible: isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    } = useDeleteConfirmationPopup();

    return {
      dummy,
      isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    };
  },
  data: () => ({
    namespace,
    subNamespace,
    tableObjectRouteName: RouteNames.AGENTS, // this.editLink() computing
    supervisorId: null,
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
    addItem() {
      return this.$router.push({
        ...this.route,
        params: { supervisorId: 'new' }
      })
    },
    editItem(item) {
      return this.$router.push({
        ...this.route,
        params: { supervisorId: item.id }
      })
    },
    closePopup() {
      this.$router.go(-1);
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

<style lang="scss" scoped></style>
