<template>
  <section>
    <resource-popup
      v-if="isResGroupPopup"
      @close="closePopup"
    ></resource-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.ccenter.resGroups.resGroups', 2) }}</h3>
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
        :grid-actions="!disableUserInput"
        :headers="headers"
        sortable
        @sort="sort"
      >
        <template slot="name" slot-scope="{ item }">
          <div v-if="item.resourceGroup">
            {{ item.resourceGroup.name }}
          </div>
        </template>
        <template slot="communication-type" slot-scope="{ item }">
          <div v-if="item.communication">
            {{ item.communication.name }}
          </div>
        </template>
        <template slot="actions" slot-scope="{ item, index }">
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
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import resourcePopup from './opened-queue-resources-popup.vue';

export default {
  name: 'opened-queue-resources',
  mixins: [openedObjectTableTabMixin],
  components: { resourcePopup },
  data: () => ({
    subNamespace: 'resGroups',
    isResGroupPopup: false,

    isDeleteConfirmation: false,
  }),

  methods: {
    openPopup() {
      this.isResGroupPopup = true;
    },

    closePopup() {
      this.isResGroupPopup = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
