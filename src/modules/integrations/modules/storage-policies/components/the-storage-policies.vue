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
      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :callback="deleteCallback"
        :delete-count="deleteCount"
        @close="closeDelete"
      />

      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ t('objects.integrations.storagePolicies.storagePolicies', 2) }}
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
            :row-reorder="hasUpdateAccess"
            fixed-actions
            reorderable-columns
            resizable-columns
            sortable
            @column-reorder="columnReorder"
            @column-resize="columnResize"
            @reorder:row="handleReorder"
            @sort="updateSort"
            @update:selected="updateSelected"
          >
            <template #name="{ item }">
              <wt-item-link
                :link="{
                  name: `${RouteNames.STORAGE_POLICIES}-card`,
                  params: { id: item.id },
                }"
              >
                {{ item.name }}
              </wt-item-link>
            </template>

            <template #channels="{ item }">
              <wt-display-chip-items
                v-if="item.channels?.length"
                :items="item.channels"
              >
                <template #first-item>
                  <p>
                    {{ t(`objects.integrations.storagePolicies.channels.${item.channels[0]}`) }}
                  </p>
                </template>

                <template #items>
                  <p
                    v-for="channel of item.channels.slice(1)"
                    :key="channel"
                  >
                    {{ t(`objects.integrations.storagePolicies.channels.${channel}`) }}
                  </p>
                </template>
              </wt-display-chip-items>
            </template>

            <template #mimeTypes="{ item }">
              <wt-display-chip-items
                v-if="item.mimeTypes?.length"
                :items="item.mimeTypes"
              >
                <template #first-item>
                  <wt-chip :color="ChipColor.SECONDARY">
                    {{ item.mimeTypes[0] }}
                  </wt-chip>
                </template>

                <template #items>
                  <p
                    v-for="mimeType of item.mimeTypes.slice(1)"
                    :key="mimeType"
                  >
                    {{ mimeType }}
                  </p>
                </template>
              </wt-display-chip-items>
            </template>

            <template #state="{ item, index }">
              <wt-switcher
                :disabled="!hasUpdateAccess"
                :model-value="item.enabled"
                @update:model-value="patchItemProperty({ index, path: 'enabled', value: $event })"
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
import { StoragePoliciesAPI } from '@webitel/api-services/api';
import type { StoragePolicyCard } from '@webitel/api-services/validations';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { WtDisplayChipItems } from '@webitel/ui-sdk/components';
import { ChipColor, IconAction } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import { useStoragePoliciesDatalistStore } from '../stores/datalist/storagePoliciesDatalistStore';

const { t } = useI18n();
const router = useRouter();

const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } =
	useUserAccessControl();

const storagePoliciesDatalistStore = useStoragePoliciesDatalistStore();
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
} = storeToRefs(storagePoliciesDatalistStore);

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
	columnResize,
	columnReorder,
} = storagePoliciesDatalistStore;

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
		name: t('objects.integrations.storagePolicies.storagePolicies', 2),
		route: `/integrations/${RouteNames.STORAGE_POLICIES}`,
	},
]);

const add = () =>
	router.push({
		name: `${RouteNames.STORAGE_POLICIES}-card`,
		params: {
			id: 'new',
		},
	});

const edit = ({ id }: StoragePolicyCard) =>
	router.push({
		name: `${RouteNames.STORAGE_POLICIES}-card`,
		params: {
			id,
		},
	});

/** [Claude] the policies apply in their position order, so a dragged row is moved on the backend and the list reloaded */
const handleReorder = async ({
	oldIndex,
	newIndex,
}: {
	oldIndex: number;
	newIndex: number;
}) => {
	if (oldIndex === newIndex) return;
	try {
		await StoragePoliciesAPI.movePosition({
			fromId: dataList.value[oldIndex].id,
			toId: dataList.value[newIndex].id,
		});
	} finally {
		await loadDataList();
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
