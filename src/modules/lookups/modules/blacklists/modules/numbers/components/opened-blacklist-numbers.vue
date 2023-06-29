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
          <upload-file-icon-btn
            v-if="!disableUserInput"
            class="icon-action"
            accept=".csv"
            @change="processCSV"
          ></upload-file-icon-btn>
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
      <template v-slot:number="{ item }">
        {{ item.number }}
      </template>

      <template v-slot:description="{ item }">
        {{ item.description }}
      </template>

      <template v-slot:actions="{ item }">
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
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import numberPopup from './opened-blacklist-number-popup.vue';
import uploadPopup from './upload-blacklist-numbers-popup.vue';
import UploadFileIconBtn from '../../../../../../../app/components/utils/upload-file-icon-btn.vue';
import { useDummy } from '../../../../../../../app/composables/useDummy';

const namespace = 'lookups/blacklists';
const subNamespace = 'numbers';

export default {
  name: 'opened-blacklist-numbers',
  mixins: [openedObjectTableTabMixin],
  components: { numberPopup, uploadPopup, UploadFileIconBtn },
  data() {
    return {
      namespace,
      subNamespace,
      isNumberPopup: false,
      isUploadPopup: false,
      csvFile: null,
    };
  },

  setup() {
    const { dummy } = useDummy({ namespace: `${namespace}/${subNamespace}`, hiddenText: true });
    return { dummy };
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
