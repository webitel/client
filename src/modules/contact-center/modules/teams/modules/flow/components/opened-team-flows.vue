<template>
  <section class="content-wrapper">
    <flow-popup
      @close="closePopup"
    />
    <delete-confirmation-popup
      :shown="isDeleteConfirmationPopup"
      :delete-count="deleteCount"
      :callback="deleteCallback"
      @close="closeDelete"
    />

    <header class="content-header">
        <h3 class="content-title">
          {{ $tc('objects.routing.flow.flow', 2) }}
        </h3>
      <div class="content-header__actions-wrap">
        <wt-search-bar
          :value="search"
          debounce
          @enter="loadList"
          @input="setSearch"
          @search="loadList"
        />
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        >
          <delete-all-action
            v-if="!disableUserInput"
            :class="{'hidden': anySelected}"
            :selected-count="selectedRows.length"
            @click="askDeleteConfirmation({
              deleted: selectedRows,
              callback: () => deleteData(selectedRows),
            })"
          />
          <wt-icon-btn
            v-if="!disableUserInput"
            class="icon-action"
            icon="plus"
            @click="create"
          />
        </wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded" />
    <wt-dummy
      v-if="dummy && isLoaded"
      :src="dummy.src"
      :dark-mode="darkMode"
      :text="dummy.text && $t(dummy.text)"
      class="dummy-wrapper"
    />
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
        <template #schema="{ item }">
          <adm-item-link
            :id="item.schema.id"
            target="_blank"
            :route-name="RouteNames.FLOW"
          >
            {{ item.name }}
          </adm-item-link>
        </template>
        <template #state="{ item, index }">
          <wt-switcher
            :value="item.enabled"
            @change="patchItem({ item, index, prop: 'enabled', value: $event })"
          />
        </template>
        <template #actions="{ item }">
          <wt-icon-action
            action="edit"
            @click="editItem(item)"
          />
          <wt-icon-action
            action="delete"
            @click="askDeleteConfirmation({
              deleted: [item],
              callback: () => deleteData(item),
            })"
          />
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
      />
    </div>
  </section>
</template>

<script>
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';

import { useDummy } from '../../../../../../../app/composables/useDummy.js';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import FlowPopup from './opened-team-flow-popup.vue';

const namespace = 'ccenter/teams';
const subNamespace = 'flow';

export default {
  name: 'OpenedTeamFlows',
  components: { FlowPopup, DeleteConfirmationPopup },
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
  }),

  methods: {
    addItem() {
      this.$router.push({
        ...this.$route,
        params: {flowId: 'new'}
      })
    },
    editItem(item) {
      this.$router.push({
        ...this.$route,
        params: {flowId: item.id}
      })
    },
    closePopup() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
