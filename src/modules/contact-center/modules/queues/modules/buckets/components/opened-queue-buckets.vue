<template>
  <section>
    <bucket-popup
      v-if="isBucketPopup"
      @close="closePopup"
    ></bucket-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.lookups.buckets.buckets', 2) }}</h3>
      <div class="content-header__actions-wrap">
        <wt-search-bar
          :value="search"
          debounce
          @input="setSearch"
          @search="loadList"
          @enter="loadList"
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
    <div v-show="isLoaded" class="table-wrapper">
      <wt-table
        :headers="headers"
        :data="dataList"
        :grid-actions="!disableUserInput"
        sortable
        @sort="sort"
      >
        <template v-slot:name="{ item }">
          {{ item.bucket.name }}
        </template>
        <template v-slot:priority="{ item }">
          {{ item.priority }}
        </template>
        <template v-slot:state="{ item, index }">
          <wt-switcher
            :value="!item.disabled"
            :disabled="!hasEditAccess"
            @change="patchItem({ item, index, prop: 'disabled', value: !$event })"
          ></wt-switcher>
        </template>
        <template v-slot:actions="{ item }">
          <edit-action
            @click="edit(item)"
          ></edit-action>
          <delete-action
            @click="callDelete(item)"
          ></delete-action>
        </template>
      </wt-table>
      <wt-pagination
        :size="size"
        :next="isNext"
        :prev="page > 1"
        debounce
        @next="nextPage"
        @prev="prevPage"
        @input="setSize"
        @change="loadList"
      ></wt-pagination>
    </div>
  </section>
</template>

<script>
import BucketPopup from './opened-queue-buckets-popup.vue';
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';

export default {
  name: 'opened-queue-outbound-ivr-buckets',
  mixins: [openedObjectTableTabMixin],
  components: { BucketPopup },
  data: () => ({
    subNamespace: 'buckets',
    isBucketPopup: null,

    isDeleteConfirmation: false,
  }),

  methods: {
    openPopup() {
      this.isBucketPopup = true;
    },
    closePopup() {
      this.isBucketPopup = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
