<template>
  <section class="table-section">
    <number-popup
      :parent-id="blacklistId"
      @saved="loadDataList"
    />
    <upload-popup
      v-if="csvFile && blacklistId"
      :file="csvFile"
      :parent-id="blacklistId"
      @close="closeCsvPopup"
    />
    <delete-confirmation-popup
      :shown="isDeleteConfirmationPopup"
      :delete-count="deleteCount"
      :callback="deleteCallback"
      @close="closeDelete"
    />

    <header class="table-title">
      <div class="table-title__actions-wrap">
        <wt-action-bar
          :include="[
            IconAction.ADD,
            IconAction.UPLOAD,
            IconAction.REFRESH,
            IconAction.DELETE,
            IconAction.COLUMNS,
          ]"
          :disabled:add="!hasCreateAccess || !blacklistId"
          :disabled:delete="!hasDeleteAccess || !selected.length"
          @click:add="open"
          @click:refresh="loadDataList"
          @click:delete="
            askDeleteConfirmation({
              deleted: selected,
              callback: () => deleteEls(selected),
            })
          "
        >
          <template #search-bar>
            <dynamic-filter-search
              :filters-manager="filtersManager"
              @filter:add="addFilter"
              @filter:delete="deleteFilter"
              @filter:update="updateFilter"
            />
          </template>
          <template #upload>
            <upload-file-icon-btn
              :disabled="!hasCreateAccess || !blacklistId"
              accept=".csv"
              class="icon-action"
              @change="processCsv"
            />
          </template>
          <template #columns>
            <wt-table-column-select
              :headers="headers"
              @change="updateShownHeaders"
            />
          </template>
        </wt-action-bar>
      </div>
    </header>

    <div class="table-section__table-wrapper">
      <wt-empty
        v-show="showEmpty"
        :image="imageEmpty"
        :text="textEmpty"
      />

      <wt-loader v-show="isLoading" />

      <wt-table
        v-show="dataList.length && !isLoading"
        :data="dataList"
        :headers="shownHeaders"
        :selected="selected"
        reorderable-columns
        resizable-columns
        sortable
        @column-reorder="columnReorder"
        @column-resize="columnResize"
        @sort="updateSort"
        @update:selected="updateSelected"
      >
        <template #number="{ item }">
          {{ item.number }}
        </template>
        <template #description="{ item }">
          {{ item.description }}
        </template>
        <template #expireAt="{ item }">
          {{ prettifyDate(item.expireAt) }}
        </template>
        <template #actions="{ item }">
          <wt-icon-action
            :disabled="!hasUpdateAccess"
            action="edit"
            @click="open(item.id)"
          />
          <wt-icon-action
            :disabled="!hasDeleteAccess"
            action="delete"
            @click="
              askDeleteConfirmation({
                deleted: [item],
                callback: () => deleteEls([item]),
              })
            "
          />
        </template>
      </wt-table>
      <wt-pagination
        :next="next"
        :prev="page > 1"
        :size="size"
        debounce
        @change="updateSize"
        @next="updatePage(page + 1)"
        @prev="updatePage(page - 1)"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useNestedTableList } from '@webitel/ui-datalist';
import { useCardListNavigation } from '@webitel/ui-datalist/card';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { FormatDateMode, IconAction, WtObject } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { formatDate } from '@webitel/ui-sdk/utils';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

import UploadFileIconBtn from '../../../../../../../app/components/utils/upload-file-icon-btn.vue';
import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import { useBlacklistsCardStore } from '../../../stores/card/blacklistsCardStore';
import { useBlacklistNumbersDatalistStore } from '../stores/datalist/blacklistNumbersDatalistStore';
import NumberPopup from './opened-blacklist-number-popup.vue';
import UploadPopup from './upload-blacklist-numbers-popup.vue';

const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } =
	useUserAccessControl(WtObject.ListNumber);

const blacklistsCardStore = useBlacklistsCardStore();
const { itemId: blacklistId } = storeToRefs(blacklistsCardStore);

const blacklistNumbersDatalistStore = useNestedTableList({
	useTableStore: useBlacklistNumbersDatalistStore,
});
const {
	dataList,
	error,
	isLoading,
	page,
	size,
	next,
	selected,
	headers,
	shownHeaders,
	filtersManager,
} = storeToRefs(blacklistNumbersDatalistStore);
const {
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	updateSelected,
	columnResize,
	columnReorder,
	updateShownHeaders,
	deleteEls,
	addFilter,
	updateFilter,
	deleteFilter,
} = blacklistNumbersDatalistStore;

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const { open } = useCardListNavigation({
	routeParamName: 'numberId',
});

const csvFile = ref<File | null>(null);

const processCsv = (files: FileList | File[]) => {
	const file = files[0];
	if (file) csvFile.value = file;
};

const closeCsvPopup = () => {
	csvFile.value = null;
	loadDataList();
};

const prettifyDate = (date?: string | number) => {
	if (Number(date)) return formatDate(+date, FormatDateMode.DATE);
};

const {
	showEmpty,
	image: imageEmpty,
	text: textEmpty,
} = useTableEmpty({
	dataList,
	error,
	filters: computed(() => filtersManager.value.getAllValues()),
	isLoading,
});
</script>
