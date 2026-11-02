<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="table-page"
  >
    <template #header>
      <wt-page-header hide-primary>
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ t('objects.permissions.object.allObjects') }}
          </h3>
          <wt-action-bar
            :include="[IconAction.REFRESH]"
            @click:refresh="loadDataList"
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
          </wt-action-bar>
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
            :selectable="false"
            reorderable-columns
            resizable-columns
            sortable
            @column-reorder="columnReorder"
            @column-resize="columnResize"
            @sort="updateSort"
          >
            <template #name="{ item }">
              <wt-item-link
                :link="{
                  name: `${RouteNames.OBJECTS}-card`,
                  params: { id: item.id },
                }"
              >
                {{ item.class }}
              </wt-item-link>
            </template>

            <template #obac="{ item, index }">
              <wt-switcher
                :disabled="!hasUpdateAccess || item.rbac"
                :model-value="item.obac"
                @update:model-value="toggleObac({ item, index, value: $event })"
              />
            </template>

            <template #rbac="{ item, index }">
              <wt-switcher
                :disabled="!hasUpdateAccess"
                :model-value="item.rbac"
                @update:model-value="toggleRbac({ item, index, value: $event })"
              />
            </template>

            <template #actions="{ item }">
              <wt-icon-action
                :disabled="!hasUpdateAccess"
                action="edit"
                @click="edit(item)"
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
import type { ApiObjectClass } from '@webitel/api-services/gen-wire/models';
import type { PatchItemPropertyParams } from '@webitel/ui-datalist';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { IconAction } from '@webitel/ui-sdk/enums';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import { useObjectsDatalistStore } from '../stores/datalist/objectsDatalistStore';

/** [Claude] a switcher patches one boolean property of a row */
type ToggleParams = Omit<PatchItemPropertyParams, 'path' | 'value'> & {
	item: ApiObjectClass;
	value: boolean;
};

const { t } = useI18n();
const router = useRouter();
const { hasUpdateAccess } = useUserAccessControl();

const objectsDatalistStore = useObjectsDatalistStore();

const {
	dataList,
	error,
	isLoading,
	page,
	size,
	next,
	shownHeaders,
	filtersManager,
	isFiltersRestoring,
} = storeToRefs(objectsDatalistStore);

const {
	initialize,
	loadDataList,
	patchItemProperty,
	columnResize,
	columnReorder,
	updatePage,
	updateSize,
	updateSort,
	addFilter,
	updateFilter,
	deleteFilter,
} = objectsDatalistStore;

initialize();

const path = computed(() => [
	{
		name: t('objects.permissions.permissions'),
	},
	{
		name: t('objects.permissions.object.object'),
		route: '/permissions/objects',
	},
]);

/** [Claude] RBAC works on top of OBAC, so OBAC can't be switched off while RBAC is on */
const toggleObac = async ({ item, index, value }: ToggleParams) => {
	if (item.rbac && !value) return;

	await patchItemProperty({
		index,
		path: 'obac',
		value,
	});
};

/** [Claude] ...and switching RBAC on switches OBAC on too */
const toggleRbac = async ({ item, index, value }: ToggleParams) => {
	const wasEnabled = item.rbac;

	await patchItemProperty({
		index,
		path: 'rbac',
		value,
	});

	if (!wasEnabled && value && !item.obac) {
		await patchItemProperty({
			index,
			path: 'obac',
			value: true,
		});
	}
};

const edit = (item: ApiObjectClass) =>
	router.push({
		name: `${RouteNames.OBJECTS}-card`,
		params: {
			id: item.id,
		},
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
