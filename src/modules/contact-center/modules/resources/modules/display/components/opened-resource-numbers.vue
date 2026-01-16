<template>
  <section>
    <number-popup @close="closePopup" />
    <upload-popup :file="csvFile" :parent-id="parentId" @close="closeCSVPopup" />
    <delete-confirmation-popup :shown="isDeleteConfirmationPopup" :delete-count="deleteCount" :callback="deleteCallback"
      @close="closeDelete" />

    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.ccenter.res.numbers', 1) }}
      </h3>
      <div class="content-header__actions-wrap">
        <wt-search-bar :value="search" debounce @enter="loadList" @input="setSearch" @search="loadList" />
        <wt-table-actions :icons="['refresh']" @input="tableActionsHandler">
          <delete-all-action v-if="!disableUserInput" :class="{ 'hidden': anySelected }"
            :selected-count="selectedRows.length" @click="askDeleteConfirmation({
              deleted: selectedRows,
              callback: () => deleteData(selectedRows),
            })" />
          <upload-file-icon-btn v-if="!disableUserInput" accept=".csv" class="icon-action" @change="processCSV" />
          <wt-icon-btn v-if="!disableUserInput" class="icon-action" icon="plus" @click="create" />
        </wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded" />
    <wt-dummy v-if="dummy && isLoaded" :src="dummy.src" :dark-mode="darkMode" :text="dummy.text && $t(dummy.text)"
      class="dummy-wrapper" />
    <div v-show="dataList.length && isLoaded" class="table-wrapper">
      <wt-table :data="dataList" :grid-actions="!disableUserInput" :headers="headers" sortable @sort="sort">
        <template #name="{ item }">
          {{ item.display }}
        </template>
        <template #actions="{ item }">
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

import UploadFileIconBtn from '../../../../../../../app/components/utils/upload-file-icon-btn.vue';
import { useDummy } from '../../../../../../../app/composables/useDummy';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import NumberPopup from './opened-resource-numbers-popup.vue';
import UploadPopup from './upload-resource-numbers-popup.vue';

const namespace = 'ccenter/res';
const subNamespace = 'numbers';

export default {
  name: 'OpenedResourceNumber',
  components: {
    NumberPopup,
    UploadFileIconBtn,
    UploadPopup,
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
    csvFile: null,
  }),

  methods: {
    addItem() {
      this.$router.push({
        ...this.$route,
        params: { numberId: 'new' },
      })
    },
    editItem(item) {
      this.$router.push({
        ...this.$route,
        params: { numberId: item.id },
      })
    },
    closePopup() {
      this.$router.go(-1);
    },
    processCSV(files) {
      const file = files[0];
      if (file) {
        this.csvFile = file;
      }
    },
    closeCSVPopup() {
      this.csvFile = null;
      this.loadDataList();
    },
  },
};
</script>

<style lang="scss" scoped></style>
