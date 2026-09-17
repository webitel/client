<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="devices table-page"
  >
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <history-popup @close="closeHistoryPopup" />

      <upload-popup
        :file="csvFile"
        @close="closeCSVPopup"
      />

      <device-popup @close="closeDeviceSelectPopup" />

      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      />

      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ t('objects.directory.devices.allDevices') }}
          </h3>
          <wt-action-bar
            :include="[
              IconAction.REFRESH,
              IconAction.DELETE,
              IconAction.UPLOAD,
              IconAction.COLUMNS,
            ]"
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
                :is-filters-restoring="isFiltersRestoring"
                single-search-name="q"
                @filter:add="addFilter"
                @filter:update="updateFilter"
                @filter:delete="deleteFilter"
              />
            </template>
            <template #upload>
              <upload-file-icon-btn
                v-if="hasCreateAccess"
                accept=".csv"
                class="icon-action"
                @change="processCSV"
              />
            </template>
            <template #columns>
              <wt-table-column-select
                :headers="headers"
                enable-search
                @change="updateShownHeaders"
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
            @click:primary="create"
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
              <wt-item-link
                :link="{
                  name: `${RouteNames.DEVICES}-card`,
                  params: { id: item.id },
                }"
              >
                {{ item.name }}
              </wt-item-link>
            </template>

            <template #account="{ item }">
              {{ item.account }}
            </template>

            <template #user="{ item }">
              <wt-item-link
                v-if="item.user"
                :link="{
                  name: `${RouteNames.USERS}-card`,
                  params: { id: item.user.id },
                }"
              >
                {{ item.user.name }}
              </wt-item-link>
            </template>

            <template #state="{ item }">
              <wt-indicator
                :color="stateClass(item.reged ? 1 : 0)"
                :text="stateText(item.reged ? 1 : 0)"
              />
            </template>

            <template #actions="{ item }">
              <wt-icon-action
                action="history"
                @click="openHistory(item.id)"
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
import type { ApiDevice } from '@webitel/api-services/gen/models';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { IconAction } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import UploadFileIconBtn from '../../../../../app/components/utils/upload-file-icon-btn.vue';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import DevicesRouteNames from '../router/_internals/DevicesRouteNames.enum';
import { useDevicesDatalistStore } from '../stores';
import DevicePopup from './create-device-popup.vue';
import HistoryPopup from './device-history-popup.vue';
import UploadPopup from './upload-devices-popup.vue';

const { t } = useI18n();
const router = useRouter();
const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } =
	useUserAccessControl();

const tableStore = useDevicesDatalistStore();

const {
	dataList,
	selected,
	error,
	isLoading,
	page,
	size,
	next,
	headers,
	shownHeaders,
	filtersManager,
	isFiltersRestoring,
} = storeToRefs(tableStore);

const {
	initialize,
	loadDataList,
	updateSelected,
	updatePage,
	updateSize,
	updateSort,
	deleteEls,
	addFilter,
	updateFilter,
	deleteFilter,
	updateShownHeaders,
	columnResize,
	columnReorder,
} = tableStore;

initialize();

const csvFile = ref<File | null>(null);

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const path = computed(() => [
	{
		name: t('objects.directory.directory'),
	},
	{
		name: t('objects.directory.devices.devices', 2),
		route: '/directory/devices',
	},
]);

const create = () =>
	router.push({
		...router.currentRoute.value,
		query: {
			new: 'true',
		},
	});

const edit = (item: ApiDevice) =>
	router.push({
		name: `${RouteNames.DEVICES}-card`,
		params: {
			id: item.id,
		},
	});

const closeDeviceSelectPopup = () => router.go(-1);

const processCSV = (files: FileList | File[]) => {
	const file = files[0];
	if (file) csvFile.value = file;
};

const openHistory = (id: string) =>
	router.push({
		name: DevicesRouteNames.HISTORY,
		params: {
			historyId: id,
		},
		query: router.currentRoute.value.query,
	});

const closeHistoryPopup = () =>
	router.push({
		name: RouteNames.DEVICES,
	});

const closeCSVPopup = () => {
	csvFile.value = null;
	loadDataList();
};

const stateClass = (state: number) => {
	switch (state) {
		case 0:
			return 'disabled';
		case 1:
			return 'success';
		default:
			return '';
	}
};

const stateText = (state: number) => {
	switch (state) {
		case 0:
			return t('objects.directory.devices.state.nonreg');
		case 1:
			return t('objects.directory.devices.state.reged');
		default:
			return 'unknown';
	}
};

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
