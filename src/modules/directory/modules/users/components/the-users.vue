
<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="users table-page"
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
      <upload-popup
        v-if="csvFile"
        :file="csvFile"
        @close="closeCSVPopup"
      />
      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      />
      <logout-confirmation-popup
        :shown="isLogoutConfirmationPopup"
        :text="t('objects.directory.users.logout.endMultipleSessionsConfirmationText', {
          count: selectedCount,
        })"
        :is-loading="isLoadingUsersLogout"
        @close="isLogoutConfirmationPopup = false"
        @logout="logoutUsers"
      />
      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ t('objects.directory.users.allUsers') }}
          </h3>
          <div class="table-title__actions-wrap">
            <div
              v-if="selectedCount"
              class="users__selection"
            >
              <span class="users__selection-count">
                {{ t('objects.selection.selected', { count: selectedCount }) }}
              </span>
              <wt-icon-btn
                v-tooltip="t('objects.selection.clear')"
                icon="close"
                size="sm"
                @click="clearSelected"
              />
            </div>
            <wt-action-bar
              :include="[IconAction.REFRESH, IconAction.DELETE, IconAction.UPLOAD, IconAction.LOGOUT, IconAction.COLUMNS]"
              :disabled:logout="!hasLogoutAccess || !selectedCount"
              :disabled:delete="!hasDeleteAccess || !selectedCount"
              @click:logout="isLogoutConfirmationPopup = true"
              @click:refresh="loadDataList"
              @click:delete="askDeleteConfirmation({
                deleted: selectedAll,
                callback: () => deleteEls(selectedAll),
              })"
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
                  :disabled="!hasCreateAccess"
                  accept=".csv"
                  class="icon-action"
                  @change="processCSV"
                />
              </template>
              <template #columns>
                <wt-table-column-select
                  :headers="headers"
                  @change="updateShownHeaders"
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
            sortable
            @sort="updateSort"
            @update:selected="updateSelected"
          >
            <template #name="{ item }">
              <adm-item-link
                :id="item.id"
                :route-name="RouteNames.USERS"
              >
                {{ item.name }}
              </adm-item-link>
            </template>
            <template #status="{ item }">
              <user-status :presence="item.presence" />
            </template>
            <template #username="{ item }">
              {{ item.username }}
            </template>
            <template #extensions="{ item }">
              {{ item.extension }}
            </template>
            <template #DnD="{ item }">
              <wt-switcher
                :disabled="!hasUpdateAccess"
                :model-value="getDND(item.presence)"
                @update:model-value="setDND(item, $event)"
              />
            </template>
            <template #actions="{ item }">
              <wt-icon-action
                action="edit"
                :disabled="!hasUpdateAccess"
                @click="edit(item)"
              />
              <wt-icon-action
                action="delete"
                :disabled="!hasDeleteAccess"
                @click="askDeleteConfirmation({
                  deleted: [item],
                  callback: () => deleteEls([item]),
                })"
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
import { UsersAPI } from '@webitel/api-services/api';
import type { ApiUser } from '@webitel/api-services/gen/models';
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
import LogoutConfirmationPopup from '../../../../_shared/logout-action/logout-confirmation-popup.vue';
import { useUserinfoStore } from '../../../../userinfo/stores/userinfoStore';
import { useUsersDatalistStore } from '../stores/datalist/usersDatalistStore';
import UserStatus from './_internals/user-status-chips.vue';
import UploadPopup from './upload-users-popup.vue';

const { t } = useI18n();
const router = useRouter();

const { clearStorageNotifications } = useUserinfoStore();
const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } =
	useUserAccessControl();

const tableStore = useUsersDatalistStore();

const {
	dataList,
	selected,
	selectedAll,
	selectedCount,
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
	clearSelected,
	updatePage,
	updateSize,
	updateSort,
	updateShownHeaders,
	deleteEls,
	addFilter,
	updateFilter,
	deleteFilter,
} = tableStore;

initialize();

const csvFile = ref<File | null>(null);
const isLogoutConfirmationPopup = ref(false);
const isLoadingUsersLogout = ref(false);

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
		name: t('objects.user', 2),
		route: '/directory/users',
	},
]);

const hasLogoutAccess = computed(
	() => hasCreateAccess.value || hasUpdateAccess.value || hasDeleteAccess.value,
);

const create = () =>
	router.push({
		name: `${RouteNames.USERS}-card`,
		params: {
			id: 'new',
		},
	});

const edit = (item: ApiUser) =>
	router.push({
		name: `${RouteNames.USERS}-card`,
		params: {
			id: item.id,
		},
	});

const getDND = (presence?: ApiUser['presence']) =>
	!!presence?.status?.includes('dnd');

const setDND = async (item: ApiUser, value: boolean) => {
	try {
		await UsersAPI.patchUserPresence({
			id: item.id,
			changes: {
				status: value ? 'dnd' : '',
			},
		});
	} finally {
		await loadDataList();
	}
};

const processCSV = (files: FileList | File[]) => {
	const file = files[0];
	if (file) csvFile.value = file;
};

const closeCSVPopup = () => {
	csvFile.value = null;
	loadDataList();
};

const logoutUsers = async () => {
	const selection = selectedAll.value.map(({ id }) => id);

	isLoadingUsersLogout.value = true;
	try {
		await UsersAPI.logoutMultipleUsers(selection);
		clearStorageNotifications(selection);
		clearSelected();
	} finally {
		isLoadingUsersLogout.value = false;
		isLogoutConfirmationPopup.value = false;
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

<style scoped>
.users__selection {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}
</style>
