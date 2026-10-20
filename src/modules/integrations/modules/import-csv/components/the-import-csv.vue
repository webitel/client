<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="table-page"
  >
    <template #header>
      <wt-page-header
        :primary-disabled="!hasCreateAccess"
        :primary-action="add"
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <upload-csv-preview-popup
        :add-bulk-items="saveBulkData"
        :charset="parameters?.charset.value"
        :file="file"
        :mapping-fields="mappingFields"
        :separator="parameters?.separator"
        :shown="!!file"
        :skip-headers="parameters?.skipHeaders"
        @close="closeUpload"
        @save="clearMembersBeforeUpload"
      />

      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :callback="deleteCallback"
        :delete-count="deleteCount"
        @close="closeDelete"
      />

      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ t('objects.integrations.importCsv.allImportsCsv') }}
          </h3>
          <wt-action-bar
            :include="[IconAction.REFRESH, IconAction.DELETE]"
            :disabled:delete="!hasDeleteAccess || !selected.length"
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
                single-search-name="search"
                @filter:add="addFilter"
                @filter:update="updateFilter"
                @filter:delete="deleteFilter"
              />
            </template>
          </wt-action-bar>
        </header>

        <div class="table-section__table-wrapper">
          <wt-empty
            v-show="showEmpty"
            :image="imageEmpty"
            :text="textEmpty"
            :primary-action-text="primaryActionTextEmpty"
            :disabled-primary-action="!hasCreateAccess"
            @click:primary="add"
          />

          <wt-loader v-show="isLoading" />

          <wt-table
            v-show="dataList.length && !isLoading"
            :data="dataList"
            :selected="selected"
            :headers="shownHeaders"
            reorderable-columns
            resizable-columns
            sortable
            @column-reorder="columnReorder"
            @column-resize="columnResize"
            @sort="updateSort"
            @update:selected="updateSelected"
          >
            <template #name="{ item }">
              <wt-item-link
                :link="{
                  name: `${RouteNames.IMPORT_CSV}-card`,
                  params: { id: item.id },
                }"
              >
                {{ item.name }}
              </wt-item-link>
            </template>
            <template #source="{ item }">
              <wt-item-link
                v-if="item.source?.id"
                :link="{
                  name: `${RouteNames.QUEUES}-card`,
                  params: { id: item.source.id },
                }"
              >
                {{ item.source.name }}
              </wt-item-link>
            </template>
            <template #actions="{ item }">
              <wt-upload-file-icon-btn
                :disabled="!hasUploadAccess"
                accept=".csv"
                @change="openUpload(item, $event)"
              />
              <wt-icon-action
                :disabled="!hasUpdateAccess"
                action="edit"
                @click="edit(item)"
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
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import type { ImportTemplateCard } from '@webitel/api-services/validations';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import WtUploadFileIconBtn from '@webitel/ui-sdk/components/on-demand/wt-upload-file-icon-btn/wt-upload-file-icon-btn.vue';
import { IconAction, WtObject } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import { useImportCsvUpload } from '../composables/useImportCsvUpload';
import { useImportCsvDatalistStore } from '../stores/datalist/importCsvDatalistStore';
import UploadCsvPreviewPopup from './upload-csv-preview-popup.vue';

const { t } = useI18n();
const router = useRouter();

const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } =
	useUserAccessControl();
// [Claude] uploading adds members to the source queue, so it is gated by the queue's access
const { hasUpdateAccess: hasUploadAccess } = useUserAccessControl(
	WtObject.Queue,
);

const importCsvDatalistStore = useImportCsvDatalistStore();
const {
	dataList,
	error,
	isLoading,
	page,
	size,
	next,
	selected,
	shownHeaders,
	filtersManager,
} = storeToRefs(importCsvDatalistStore);

const {
	initialize,
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	deleteEls,
	addFilter,
	updateFilter,
	deleteFilter,
	updateSelected,
	columnResize,
	columnReorder,
} = importCsvDatalistStore;

initialize();

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const path = computed(() => [
	{
		name: t('objects.integrations.integrations'),
	},
	{
		name: t('objects.integrations.importCsv.importCsv', 2),
		route: '/integrations/import-csv',
	},
]);

const add = () =>
	router.push({
		name: `${RouteNames.IMPORT_CSV}-card`,
		params: {
			id: 'new',
		},
	});

const edit = ({ id }: ImportTemplateCard) =>
	router.push({
		name: `${RouteNames.IMPORT_CSV}-card`,
		params: {
			id,
		},
	});

const {
	file,
	parameters,
	mappingFields,
	saveBulkData,
	openUpload,
	closeUpload,
	clearMembersBeforeUpload,
} = useImportCsvUpload();

const {
	showEmpty,
	image: imageEmpty,
	text: textEmpty,
	primaryActionText: primaryActionTextEmpty,
} = useTableEmpty({
	dataList,
	error,
	filters: computed(() => filtersManager.value.getAllValues()),
	isLoading,
});
</script>
