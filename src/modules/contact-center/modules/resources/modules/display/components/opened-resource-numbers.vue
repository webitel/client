<template>
  <section>
    <number-popup
      v-if="isNumberPopup"
      @close="closePopup"
    ></number-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.ccenter.res.numbers', 1) }}</h3>
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
        :headers="headers"
        :data="dataList"
        :grid-actions="!disableUserInput"
        sortable
        @sort="sort"
      >
        <template slot="name" slot-scope="{ item }">
          {{ item.display }}
        </template>
        <template slot="actions" slot-scope="{ item }">
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
import NumberPopup from './opened-resource-numbers-popup.vue';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';

export default {
  name: 'opened-resource-number',
  mixins: [openedObjectTableTabMixin],
  components: { NumberPopup },
  data: () => ({
    subNamespace: 'numbers',
    isNumberPopup: false,

    isDeleteConfirmation: false,
  }),

  methods: {
    openPopup() {
      this.isNumberPopup = true;
    },
    closePopup() {
      this.isNumberPopup = false;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
