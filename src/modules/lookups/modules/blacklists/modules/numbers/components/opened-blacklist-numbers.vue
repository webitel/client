<template>
  <section>
    <number-popup
      v-if="isNumberPopup"
      @close="closePopup"
    ></number-popup>
    <upload-popup
      v-if="isUploadPopup"
      :file="csvFile"
      :parent-id="parentId"
      @close="closeCSVPopup"
    ></upload-popup>
    <delete-confirmation-popup
      v-show="deleteConfirmation.isDeleteConfirmationPopup"
      :payload="deleteConfirmation"
      @close="closeDelete"
    ></delete-confirmation-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.lookups.blacklist.number', 2) }}</h3>
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
        <upload-file-icon-btn
          v-if="!disableUserInput"
          class="icon-action"
          accept=".csv"
          @change="processCSV"
        ></upload-file-icon-btn>
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
      <template slot="number" slot-scope="{ item }">
        {{ item.number }}
      </template>

      <template slot="description" slot-scope="{ item }">
        {{ item.description }}
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
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import numberPopup from './opened-blacklist-number-popup.vue';
import uploadPopup from './upload-blacklist-numbers-popup.vue';
import UploadFileIconBtn from '../../../../../../../app/components/utils/upload-file-ucon-btn.vue';

export default {
  name: 'opened-blacklist-numbers',
  mixins: [openedObjectTableTabMixin],
  components: { numberPopup, uploadPopup, UploadFileIconBtn },
  data() {
    return {
      subNamespace: 'numbers',
      isNumberPopup: false,
      isUploadPopup: false,
      csvFile: null,
    };
  },

  methods: {
    processCSV(files) {
      const file = files[0];
      if (file) {
        this.csvFile = file;
        this.isUploadPopup = true;
      }
    },
    closeCSVPopup() {
      this.loadDataList();
      this.isUploadPopup = false;
    },
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
