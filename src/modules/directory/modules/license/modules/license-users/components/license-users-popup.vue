<template>
  <wt-popup
    :shown="!!licenseId"
    :size="ComponentSize.LG"
    @close="close"
  >
    <template #header>
      <h3 class="license-users-popup__title">
        <wt-icon
          icon="license"
          icon-prefix="adm"
          size="lg"
        />
        {{ license?.product }}
      </h3>
    </template>
    <template #main>
      <section class="table-section">
        <header class="table-title">
          <dynamic-filter-search
            :filters-manager="filtersManager"
            :is-filters-restoring="isFiltersRestoring"
            full-width
            single-search-name="q"
            @filter:add="addFilter"
            @filter:update="updateFilter"
            @filter:delete="deleteFilter"
          />
        </header>

        <div class="table-section__table-wrapper license-users-popup__table-wrapper">
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
            <template #domain="{ item }">
              <div v-if="item.domain">
                {{ item.domain.name }}
              </div>
            </template>
            <template #name="{ item }">
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
            <template #used="{ item }">
              <user-logout-control
                :item="item"
                @logout="logoutUser"
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
  </wt-popup>
</template>

<script setup lang="ts">
import { UsersAPI } from '@webitel/api-services/api';
import type {
	ApiObjectId,
	ApiProductUser,
} from '@webitel/api-services/gen/models';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { ComponentSize } from '@webitel/ui-sdk/enums';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import {
	useLicenseDatalistStore,
	useLicenseUsersDatalistStore,
} from '../../../stores';
import UserLogoutControl from './user-logout-control.vue';

const emit = defineEmits<{
	close: [];
}>();

const route = useRoute();

const licenseStore = useLicenseDatalistStore();
const { dataList: licenses } = storeToRefs(licenseStore);

const tableStore = useLicenseUsersDatalistStore();

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
} = storeToRefs(tableStore);

const {
	initialize,
	updatePage,
	updateSize,
	updateSort,
	addFilter,
	updateFilter,
	deleteFilter,
	columnResize,
	columnReorder,
} = tableStore;

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

const licenseId = computed(() => route.params.id as string | undefined);

const license = computed(
	() => licenses.value.find(({ id }) => id === licenseId.value) ?? null,
);

const close = () => emit('close');

const logoutUser = async (user: ApiObjectId) => {
	await UsersAPI.logoutUser({
		id: user.id as string,
	});
	const row = dataList.value.find(
		(item: ApiProductUser) => item.user === user || item.user?.id === user.id,
	);
	if (row) row.sessions = 0;
};

watch(
	licenseId,
	(id) => {
		if (!id || id === 'new') return;
		initialize({
			parentId: id,
		});
	},
	{
		immediate: true,
	},
);
</script>

<style lang="scss" scoped>
.license-users-popup__title {
  display: flex;
  align-items: center;
  justify-content: center;

  .wt-icon {
    margin-right: var(--spacing-sm);
  }
}

.license-users-popup__table-wrapper {
  flex: 0 0 440px;
}
</style>
