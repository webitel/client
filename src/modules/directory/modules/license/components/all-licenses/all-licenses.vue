<template>
  <section class="all-licenses table-section">
    <license-popup
      :shown="isLicensePopup"
      @close="closeLicensePopup"
    />
    <license-users-popup
      v-if="isLicenseUsersPopup"
      @close="closeLicenseUsersPopup"
    />

    <header class="table-title">
      <h3 class="table-title__title" />
      <wt-action-bar
        :include="[IconAction.REFRESH, IconAction.ADD, IconAction.COLUMNS]"
        :disabled:add="!hasCreateAccess"
        @click:refresh="loadDataList"
        @click:add="openLicensePopup"
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
        <template #id="{ item }">
          <wt-copy-action :value="item.id" />
        </template>
        <template #product="{ item }">
          <div class="all-licenses__product-cell">
            <wt-icon
              icon="license"
              icon-prefix="adm"
            />
            {{ item.name || item.product }}
          </div>
        </template>

        <template #valid-from="{ item }">
          {{ prettifyDate(item.notBefore) }}
        </template>

        <template #valid-till="{ item }">
          {{ prettifyDate(item.notAfter) }}
        </template>

        <template #used="{ item }">
          <wt-item-link
            :link="{
              name: `${LicencesRouteNames.ALL}-card`,
              params: { id: item.id },
            }"
          >
            <wt-icon
              icon="license-users"
              icon-prefix="adm"
            />
            {{ (item.limit ?? 0) - (item.remain ?? 0) }}
          </wt-item-link>
        </template>

        <template #competitive="{ item }">
          {{ item.competitive ? t('reusable.true') : '' }}
        </template>

        <template #status="{ item }">
          <wt-chip
            :color="statusColor(item.notAfter)"
            class="license-status"
          >
            {{ statusText(item.notAfter) }}
          </wt-chip>
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
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { FormatDateMode, IconAction } from '@webitel/ui-sdk/enums';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { formatDate } from '@webitel/ui-sdk/utils';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../../app/composables/useUserAccessControl';
import LicenseUsersPopup from '../../modules/license-users/components/license-users-popup.vue';
import LicencesRouteNames from '../../router/_internals/LicencesRouteNames.enum';
import { useLicenseDatalistStore } from '../../stores';
import LicensePopup from './license-popup.vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { hasCreateAccess } = useUserAccessControl();

const tableStore = useLicenseDatalistStore();

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

initialize();

const licenseId = computed(() => route.params.id as string | undefined);

const isLicensePopup = computed(() => licenseId.value === 'new');
const isLicenseUsersPopup = computed(
	() => !!licenseId.value && licenseId.value !== 'new',
);

const openLicensePopup = () =>
	router.push({
		name: `${LicencesRouteNames.ALL}-card`,
		params: {
			id: 'new',
		},
		query: route.query,
	});

const closeLicensePopup = () => {
	router.push({
		name: `${LicencesRouteNames.ALL}-card`,
		query: route.query,
	});
};

const closeLicenseUsersPopup = () => {
	router.push({
		name: `${LicencesRouteNames.ALL}-card`,
		query: route.query,
	});
};

const prettifyDate = (date?: string | number) => {
	if (!date) return '';
	return formatDate(+date, FormatDateMode.DATE);
};

const daysLeft = (endDate?: string | number) => {
	if (!endDate) return 0;
	return Math.ceil((+endDate - Date.now()) / 1000 / 60 / 60 / 24);
};

const statusText = (endDate?: string | number) => {
	const left = daysLeft(endDate);
	if (left <= 0) return t('objects.directory.license.daysToExpire.0');
	if (left < 30) return t('objects.directory.license.daysToExpire.30');
	if (left < 90) return t('objects.directory.license.daysToExpire.90');
	return left + t('objects.directory.license.daysToExpire.days');
};

const statusColor = (endDate?: string | number) => {
	const left = daysLeft(endDate);
	if (left <= 0) return 'error';
	if (left < 30) return 'warning';
	return 'success';
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

<style lang="scss" scoped>
.all-licenses__product-cell {
  display: flex;
  align-items: center;

  .wt-icon {
    margin-right: var(--spacing-2xs);
  }
}

.wt-item-link .wt-icon {
  margin-right: var(--spacing-2xs);
}

.license-status {
  align-self: flex-end;
  text-align: center;
}
</style>
