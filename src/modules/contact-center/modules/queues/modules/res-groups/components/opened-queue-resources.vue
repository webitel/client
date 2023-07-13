<template>
  <section class="content-wrapper">
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
      class="table-wrapper">
      <wt-table
        :data="dataList"
        :grid-actions="!disableUserInput"
        :headers="headers"
        sortable
        @sort="sort"
      >
        <template v-slot:name="{ item }">
          <div v-if="item.resourceGroup">
            {{ item.resourceGroup.name }}
          </div>
        </template>
        <template v-slot:communication="{ item }">
          <div v-if="item.communication">
            {{ item.communication.name }}
          </div>
        </template>
        <template v-slot:actions="{ item, index }">
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
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import resourcePopup from './opened-queue-resources-popup.vue';
import { useDummy } from '../../../../../../../app/composables/useDummy';

const namespace = 'ccenter/queues';
const subNamespace = 'resGroups';

export default {
  name: 'opened-queue-resources',
  mixins: [openedObjectTableTabMixin],
  components: { resourcePopup },
  data: () => ({
    namespace,
    subNamespace,
    isResGroupPopup: false,
    isDeleteConfirmation: false,
  }),
  setup() {
    const { dummy } = useDummy({ namespace: `${namespace}/${subNamespace}`, hiddenText: true });
    return { dummy };
  },
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
