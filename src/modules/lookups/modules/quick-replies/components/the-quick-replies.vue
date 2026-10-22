<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="quick-replies table-page"
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
            {{ t('objects.lookups.quickReplies.quickReplies') }}
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
              <adm-item-link
                :id="item.id"
                :route-name="RouteNames.QUICK_REPLIES"
              >
                {{ item.name }}
              </adm-item-link>
            </template>
            <template #text="{ item }">
              {{ item.text }}
            </template>
            <template #teams="{ item }">
              <wt-display-chip-items
                v-if="item.teams"
                :items="item.teams"
              />
            </template>
            <template #queues="{ item }">
              <wt-display-chip-items
                v-if="item.queues"
                :items="item.queues"
              />
            </template>
            <template #createdAt="{ item }">
              {{ prettifyDateTime(item.createdAt) }}
            </template>
            <template #createdBy="{ item }">
              {{ item.createdBy?.name }}
            </template>
            <template #updatedAt="{ item }">
              {{ prettifyDateTime(item.updatedAt) }}
            </template>
            <template #updatedBy="{ item }">
              {{ item.updatedBy?.name }}
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

<script setup>
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { WtDisplayChipItems } from '@webitel/ui-sdk/components';
import { FormatDateMode, IconAction } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { formatDate } from '@webitel/ui-sdk/utils';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import { useQuickRepliesDatalistStore } from '../stores';

const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } =
	useUserAccessControl();

const tableStore = useQuickRepliesDatalistStore();

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
} = storeToRefs(tableStore);

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
} = tableStore;

initialize();

const { t } = useI18n();
const router = useRouter();

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const path = computed(() => [
	{
		name: t('objects.lookups.lookups'),
	},
	{
		name: t('objects.lookups.quickReplies.quickReplies', 2),
		route: '/lookups/quick-replies',
	},
]);

const add = () =>
	router.push({
		name: `${RouteNames.QUICK_REPLIES}-card`,
		params: {
			id: 'new',
		},
	});

const edit = (item) =>
	router.push({
		name: `${RouteNames.QUICK_REPLIES}-card`,
		params: {
			id: item.id,
		},
	});

const prettifyDateTime = (timestamp) =>
	formatDate(+timestamp, FormatDateMode.DATETIME);

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
