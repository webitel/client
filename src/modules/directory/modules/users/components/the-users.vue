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
          count: selected.length,
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
          <wt-action-bar
            :include="[
              IconAction.REFRESH,
              IconAction.DELETE,
              IconAction.UPLOAD,
              IconAction.LOGOUT,
            ]"
            :disabled:logout="!hasLogoutAccess || !selected.length"
            :disabled:delete="!hasDeleteAccess || !selected.length"
            @click:logout="isLogoutConfirmationPopup = true"
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
            sortable
            @sort="updateSort"
            @update:selected="updateSelected"
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
            <template #status="{ item }">
              <user-status-chips :presence="item.presence" />
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
                :model-value="isDnd(item)"
                @update:model-value="setDnd(item, $event)"
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
import UserStatusChips from './_internals/user-status-chips.vue';
import UploadPopup from './upload-users-popup.vue';

const { t } = useI18n();
const router = useRouter();
const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } =
	useUserAccessControl();

const userinfoStore = useUserinfoStore();
const { clearStorageNotifications } = userinfoStore;

const tableStore = useUsersDatalistStore();

const {
	dataList,
	selected,
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
	loadDataList,
	updateSelected,
	updatePage,
	updateSize,
	updateSort,
	deleteEls,
	addFilter,
	updateFilter,
	deleteFilter,
} = tableStore;

initialize();

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const csvFile = ref<File | null>(null);
const isLogoutConfirmationPopup = ref(false);
const isLoadingUsersLogout = ref(false);

const hasLogoutAccess = computed(
	() => hasCreateAccess.value || hasUpdateAccess.value || hasDeleteAccess.value,
);

const path = computed(() => [
	{
		name: t('objects.directory.directory'),
	},
	{
		name: t('objects.user', 2),
		route: '/directory/users',
	},
]);

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

const isDnd = (item: ApiUser) => !!item.presence?.status?.includes('dnd');

const setDnd = async (item: ApiUser, value: boolean) => {
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
	isLoadingUsersLogout.value = true;
	const selection = selected.value.map((user: ApiUser) => user.id);
	await UsersAPI.logoutMultipleUsers(selection);
	isLogoutConfirmationPopup.value = false;
	isLoadingUsersLogout.value = false;
	clearStorageNotifications(selection);
	await loadDataList();
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
