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
      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ t('objects.integrations.storage.allStorages') }}
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

        <delete-confirmation-popup
          :shown="isDeleteConfirmationPopup"
          :callback="deleteCallback"
          :delete-count="deleteCount"
          @close="closeDelete"
        />

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
            sortable
            @sort="updateSort"
            @update:selected="updateSelected"
          >
            <template #name="{ item }">
              <wt-item-link
                :link="{
                  name: `${RouteNames.STORAGE}-card`,
                  params: { id: item.id },
                }"
              >
                {{ item.name }}
              </wt-item-link>
            </template>
            <template #type="{ item }">
              {{ typeText(item.type) }}
            </template>
            <template #maxSize="{ item }">
              {{ item.maxSize }}
            </template>
            <template #expireDays="{ item }">
              {{ item.expireDays }}
            </template>
            <template #state="{ item, index }">
              <wt-switcher
                :disabled="!hasUpdateAccess"
                :model-value="!item.disabled"
                @update:model-value="patchItemProperty({ index, path: 'disabled', value: !$event })"
              />
            </template>
            <template #actions="{ item }">
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
import { StorageType } from '@webitel/api-services/enums';
import type { StorageBackendProfile } from '@webitel/api-services/gen/models';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { IconAction } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import emptyPicDark from '../assets/adm-empty-storage-dark.svg';
import emptyPicLight from '../assets/adm-empty-storage-light.svg';
import { useStorageDatalistStore } from '../stores/datalist/storageDatalistStore';

const { t } = useI18n();
const router = useRouter();

const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } =
	useUserAccessControl();

const storageDatalistStore = useStorageDatalistStore();
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
} = storeToRefs(storageDatalistStore);

const {
	initialize,
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	patchItemProperty,
	deleteEls,
	addFilter,
	updateFilter,
	deleteFilter,
	updateSelected,
} = storageDatalistStore;

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
		name: t('objects.integrations.storage.storage'),
		route: '/integrations/storage',
	},
]);

const typeLocale: Record<string, string> = {
	[StorageType.Local]: 'objects.integrations.storage.local',
	[StorageType.S3]: 'objects.integrations.storage.s3',
	[StorageType.Backblaze]: 'objects.integrations.storage.backblaze',
	[StorageType.Dropbox]: 'objects.integrations.storage.dropbox',
	[StorageType.Drive]: 'objects.integrations.storage.drive',
};

const typeText = (type?: string) =>
	type && typeLocale[type] ? t(typeLocale[type]) : '';

const edit = ({ id }: StorageBackendProfile) =>
	router.push({
		name: `${RouteNames.STORAGE}-card`,
		params: {
			id,
		},
	});

const add = () =>
	router.push({
		name: `${RouteNames.STORAGE}-card`,
		params: {
			id: 'new',
		},
	});

const {
	showEmpty,
	image: imageEmpty,
	text: textEmpty,
	primaryActionText: primaryActionTextEmpty,
} = useTableEmpty(
	{
		dataList,
		error,
		filters: computed(() => filtersManager.value.getAllValues()),
		isLoading,
	},
	{
		image: {
			empty: {
				dark: emptyPicDark,
				light: emptyPicLight,
			},
		},
	},
);
</script>
