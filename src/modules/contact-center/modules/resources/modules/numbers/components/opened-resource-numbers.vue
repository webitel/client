<template>
  <section class="table-section">
    <number-popup
      :parent-id="resourceId"
      @saved="loadDataList"
    />
    <upload-popup
      v-if="csvFile && resourceId"
      :file="csvFile"
      :parent-id="resourceId"
      @close="closeCsvPopup"
    />
    <delete-confirmation-popup
      :shown="isDeleteConfirmationPopup"
      :delete-count="deleteCount"
      :callback="deleteCallback"
      @close="closeDelete"
    />

    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('objects.ccenter.res.numbers', 1) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-action-bar
          :include="[
            IconAction.ADD,
            IconAction.UPLOAD,
            IconAction.REFRESH,
            IconAction.DELETE,
            IconAction.COLUMNS,
          ]"
          :disabled:add="disableUserInput || !resourceId"
          :disabled:delete="disableUserInput || !selected.length"
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
              :disabled="disableUserInput || !resourceId"
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
        <template #name="{ item }">
          {{ item.display }}
        </template>
        <template #actions="{ item }">
          <wt-icon-action
            :disabled="disableUserInput"
            action="edit"
            @click="open(item.id)"
          />
          <wt-icon-action
            :disabled="disableUserInput"
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
import { IconAction } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import UploadFileIconBtn from '../../../../../../../app/components/utils/upload-file-icon-btn.vue';
import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import { useResourcesCardStore } from '../../../stores/card/resourcesCardStore';
import { useResourceNumbersDatalistStore } from '../stores/datalist/resourceNumbersDatalistStore';
import NumberPopup from './opened-resource-numbers-popup.vue';
import UploadPopup from './upload-resource-numbers-popup.vue';

const { t } = useI18n();

const { disableUserInput } = useUserAccessControl({
	useUpdateAccessAsAllMutableChecksSource: true,
});

const resourcesCardStore = useResourcesCardStore();
const { itemId: resourceId } = storeToRefs(resourcesCardStore);

const resourceNumbersDatalistStore = useNestedTableList({
	useTableStore: useResourceNumbersDatalistStore,
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
} = storeToRefs(resourceNumbersDatalistStore);
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
} = resourceNumbersDatalistStore;

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
