<template>
  <section class="table-section">
    <resource-popup
      :parent-id="resourceGroupId"
      @saved="loadDataList"
    />
    <delete-confirmation-popup
      :shown="isDeleteConfirmationPopup"
      :delete-count="deleteCount"
      :callback="deleteCallback"
      @close="closeDelete"
    />

    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('objects.ccenter.res.res', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-action-bar
          :include="[IconAction.ADD, IconAction.REFRESH, IconAction.DELETE]"
          :disabled:add="disableUserInput || !resourceGroupId"
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
          <span v-if="item.resource">
            {{ item.resource.name }}
          </span>
        </template>
        <template #priority="{ item }">
          {{ item.priority }}
        </template>
        <template #reserveResource="{ item }">
          <span v-if="item.reserveResource">
            {{ item.reserveResource.name }}
          </span>
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
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import { useResourceGroupsCardStore } from '../../../stores/card/resourceGroupsCardStore';
import { useResourceGroupResourcesDatalistStore } from '../stores/datalist/resourceGroupResourcesDatalistStore';
import ResourcePopup from './opened-resource-group-resource-popup.vue';

const { t } = useI18n();

const { disableUserInput } = useUserAccessControl({
	useUpdateAccessAsAllMutableChecksSource: true,
});

const resourceGroupsCardStore = useResourceGroupsCardStore();
const { itemId: resourceGroupId } = storeToRefs(resourceGroupsCardStore);

const resourceGroupResourcesDatalistStore = useNestedTableList({
	useTableStore: useResourceGroupResourcesDatalistStore,
});
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
} = storeToRefs(resourceGroupResourcesDatalistStore);
const {
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	updateSelected,
	columnResize,
	columnReorder,
	deleteEls,
	addFilter,
	updateFilter,
	deleteFilter,
} = resourceGroupResourcesDatalistStore;

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const { open } = useCardListNavigation({
	routeParamName: 'resourceId',
});

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
