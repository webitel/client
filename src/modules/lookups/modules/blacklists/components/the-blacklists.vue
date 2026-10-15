<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="blacklists table-page"
  >
    <template #header>
      <wt-page-header
        :primary-disabled="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      />

      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ t('objects.lookups.blacklist.allBlacklists') }}
          </h3>
          <wt-action-bar
            :include="[
              IconAction.REFRESH,
              IconAction.DELETE,
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
                @filter:add="addFilter"
                @filter:update="updateFilter"
                @filter:delete="deleteFilter"
              />
            </template>
            <template #columns>
              <wt-table-column-select
                :headers="headers"
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
            @click:primary="create()"
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
                  name: `${RouteNames.BLACKLIST}-card`,
                  params: { id: item.id },
                }"
              >
                {{ item.name }}
              </wt-item-link>
            </template>
            <template #numbers="{ item }">
              {{ item.count }}
            </template>
            <template #actions="{ item }">
              <wt-icon-action
                action="download"
                @click="download(item)"
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
import { BlacklistNumbersAPI } from '@webitel/api-services/api';
import type { EngineList } from '@webitel/api-services/gen/models';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { IconAction } from '@webitel/ui-sdk/enums';
import { useCSVExport } from '@webitel/ui-sdk/src/modules/CSVExport/composables/useCSVExport';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import dummyPicDark from '../assets/adm-dummy-blacklist-dark.svg';
import dummyPicLight from '../assets/adm-dummy-blacklist-light.svg';
import { useBlacklistsDatalistStore } from '../stores/datalist/blacklistsDatalistStore';

const { t } = useI18n();
const router = useRouter();
const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } =
	useUserAccessControl();

const blacklistsDatalistStore = useBlacklistsDatalistStore();

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
} = storeToRefs(blacklistsDatalistStore);

const {
	initialize,
	loadDataList,
	updateSelected,
	updatePage,
	updateSize,
	updateSort,
	columnResize,
	columnReorder,
	updateShownHeaders,
	deleteEls,
	addFilter,
	updateFilter,
	deleteFilter,
} = blacklistsDatalistStore;

initialize();

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

/* [Claude] exports numbers of one blacklist, so table selection (blacklist ids) must not leak into the request */
const { initCSVExport, exportCSV } = useCSVExport({
	selected: ref([]),
});

initCSVExport(BlacklistNumbersAPI.getList, {
	filename: 'numbers',
});

const download = ({ id }: EngineList) =>
	exportCSV({
		parentId: id,
		fields: [
			'number',
			'description',
		],
	});

const path = computed(() => [
	{
		name: t('objects.lookups.lookups'),
	},
	{
		name: t('objects.lookups.blacklist.blacklist', 2),
		route: '/lookups/blacklist',
	},
]);

const create = () =>
	router.push({
		name: `${RouteNames.BLACKLIST}-card`,
		params: {
			id: 'new',
		},
	});

const edit = (item: EngineList) =>
	router.push({
		name: `${RouteNames.BLACKLIST}-card`,
		params: {
			id: item.id,
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
				dark: dummyPicDark,
				light: dummyPicLight,
			},
		},
	},
);
</script>
