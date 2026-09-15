<template>
  <section class="table-section">
    <header class="table-title">
      <h3 class="table-title__title" />
      <wt-action-bar
        :include="[IconAction.REFRESH, IconAction.COLUMNS]"
        @click:refresh="loadDataList"
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
        <template #columns>
          <wt-table-column-select
            :headers="headers"
            :static-headers="staticHeaderValues"
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
      />

      <wt-loader v-show="isLoading" />

      <wt-table
        v-show="dataList.length && !isLoading"
        :data="dataList"
        :grid-actions="false"
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
              name: `${RouteNames.USERS}-card`,
              params: { id: item.id },
            }"
          >
            {{ item.name }}
          </wt-item-link>
        </template>

        <template
          v-for="license of licenseHeaders"
          :key="license.value"
          #[license.value]="{ item }"
        >
          <wt-checkbox
            :selected="item.license[license.value]"
            :disabled="!hasUpdateAccess"
            @update:selected="toggleUserLicense({ user: item, license })"
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

<script setup lang="ts">
import { LicenseAPI, UsersAPI } from '@webitel/api-services/api';
import type { ApiLicenseUser } from '@webitel/api-services/gen/models';
import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { IconAction, WtObject } from '@webitel/ui-sdk/enums';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed, getCurrentInstance, onMounted } from 'vue';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import { buildLicenseByUserHeaders } from '../../../scripts/buildLicenseByUserHeaders';
import {
	type LicenseByUserRow,
	useLicenseByUserDatalistStore,
} from '../../../stores';

const { hasUpdateAccess } = useUserAccessControl({
	resource: WtObject.User,
});

const tableStore = useLicenseByUserDatalistStore();

const {
	dataList,
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
	updatePage,
	updateSize,
	updateSort,
	addFilter,
	updateFilter,
	deleteFilter,
	updateShownHeaders,
	columnResize,
	columnReorder,
} = tableStore;

const staticHeaderValues = [
	'name',
];

const licenseHeaders = computed(() => shownHeaders.value.slice(1));

const toggleUserLicense = async ({
	user,
	license,
}: {
	user: LicenseByUserRow;
	license: DatalistTableHeader;
}) => {
	const licenseId = license.value;
	const licenseIndex = user._license.findIndex(({ id }) => id === licenseId);
	const changes: {
		license: Array<Pick<ApiLicenseUser, 'id'>>;
	} = {
		license: [
			...user._license,
		],
	};

	if (licenseIndex !== -1) {
		changes.license.splice(licenseIndex, 1);
	} else {
		changes.license.push({
			id: licenseId,
		});
	}

	await UsersAPI.patch({
		id: user.id as string,
		changes,
	});

	user._license = changes.license;
	user.license = {
		...user.license,
		[licenseId]: !user.license[licenseId],
	};
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

onMounted(async () => {
	const { items: licenses } = await LicenseAPI.getList({
		size: 100,
		fields: [
			'id',
			'name',
			'product',
			'not_after',
		],
	});

	updateShownHeaders(buildLicenseByUserHeaders(licenses));

	const instance = getCurrentInstance();
	instance?.appContext.app.runWithContext(() => initialize());
});
</script>

<style lang="scss" scoped>
:deep(.wt-table th) {
  word-break: normal;
}
</style>
