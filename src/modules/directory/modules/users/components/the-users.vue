<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="table-page"
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
        v-model:shown="isLogoutConfirmationPopup"
        :logout-message="$t('objects.directory.users.logout.endMultipleSessionsConfirmationText', {
          count: selectedRows.length,
        })"
        @logout="logoutUsers"
      />
      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ $t('objects.directory.users.allUsers') }}
          </h3>
          <div class="table-title__actions-wrap">
            <wt-search-bar
              :value="search"
              debounce
              @enter="loadList"
              @input="setSearch"
              @search="loadList"
            />
            <wt-action-bar
              :include="[IconAction.REFRESH, IconAction.DELETE, IconAction.UPLOAD, IconAction.LOGOUT]"
              :disabled:logout="!hasUpdateAccess || anySelected"
              :disabled:delete="!hasDeleteAccess || anySelected"
              @click:logout="openLogoutConfirmationPopup"
              @click:refresh="loadList"
              @click:delete="askDeleteConfirmation({
                deleted: selectedRows,
                callback:() => deleteData(selectedRows),
              })"
            >
              <template #upload>
                <upload-file-icon-btn
                  :disabled="!hasCreateAccess"
                  accept=".csv"
                  class="icon-action"
                  @change="processCSV"
                />
              </template>
            </wt-action-bar>
          </div>
        </header>

        <wt-loader v-show="!isLoaded" />
        <wt-dummy
          v-if="dummy && isLoaded"
          :src="dummy.src"
          :dark-mode="darkMode"
          :text="dummy.text && $t(dummy.text)"
          class="dummy-wrapper"
        />
        <div
          v-show="dataList.length && isLoaded"
          class="table-section__table-wrapper"
        >
          <wt-table
            :data="dataList"
            :headers="headers"
            sortable
            @sort="sort"
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
                @update:model-value="setDND({ item, value: $event })"
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
                  callback: () => deleteData(item),
                })"
              />
            </template>
          </wt-table>
          <wt-pagination
            :next="isNext"
            :prev="page > 1"
            :size="size"
            debounce
            @change="loadList"
            @input="setSize"
            @next="nextPage"
            @prev="prevPage"
          />
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script>
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { mapActions } from 'vuex';
import { UsersAPI } from '../../../../../../../webitel-ui-sdk/packages/api-services/src/api/clients/users/users.ts';
import IconAction from '../../../../../../../webitel-ui-sdk/src/enums/IconAction/IconAction.enum.js';
import UploadFileIconBtn from '../../../../../app/components/utils/upload-file-icon-btn.vue';
import { useDummy } from '../../../../../app/composables/useDummy';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import { useUserinfoStore } from '../../../../../modules/userinfo/stores/userinfoStore';
import LogoutConfirmationPopup from '../../../../_shared/logout-action/logout-confirmation-popup.vue';
import UserStatus from './_internals/user-status-chips.vue';
import UploadPopup from './upload-users-popup.vue';

const namespace = 'directory/users';

export default {
	name: 'TheUsers',
	components: {
		LogoutConfirmationPopup,
		UploadPopup,
		UserStatus,
		UploadFileIconBtn,
		DeleteConfirmationPopup,
	},
	mixins: [
		tableComponentMixin,
	],

	setup() {
		const { t } = useI18n();
		const { clearStorageNotifications } = useUserinfoStore();

		const { dummy } = useDummy({
			namespace,
			hiddenText: true,
		});
		const {
			isVisible: isDeleteConfirmationPopup,
			deleteCount,
			deleteCallback,

			askDeleteConfirmation,
			closeDelete,
		} = useDeleteConfirmationPopup();

		// TODO: add Access for Logout action, now it is the same as Update action
		const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } =
			useUserAccessControl();

		const isLogoutConfirmationPopup = ref(false);

		return {
			t,
			clearStorageNotifications,
			dummy,
			isDeleteConfirmationPopup,
			deleteCount,
			deleteCallback,

			isLogoutConfirmationPopup,

			hasCreateAccess,
			hasUpdateAccess,
			hasDeleteAccess,

			askDeleteConfirmation,
			closeDelete,
		};
	},
	data: () => ({
		csvFile: null,
		namespace,
		routeName: RouteNames.USERS,
		IconAction,
	}),

	computed: {
		path() {
			return [
				{
					name: this.$t('objects.directory.directory'),
				},
				{
					name: this.$t('objects.user', 2),
					route: '/directory/users',
				},
			];
		},
	},

	methods: {
		...mapActions({
			setDND(dispatch, payload) {
				return dispatch(`${this.namespace}/SET_USER_DND`, payload);
			},
		}),

		getDND(value) {
			if (value?.status) {
				return value.status.includes('dnd');
			}
			return false;
		},

		processCSV(files) {
			const file = files[0];
			if (file) {
				this.csvFile = file;
			}
		},

		closeCSVPopup() {
			this.csvFile = null;
			this.loadList();
		},

		openLogoutConfirmationPopup() {
			this.isLogoutConfirmationPopup = true;
		},

		async logoutUsers() {
			const selection = this.selectedRows.map((user) => user.id);
			await UsersAPI.logoutMultipleUsers(selection);
			this.isLogoutConfirmationPopup = false;
			this.clearStorageNotifications(selection);
		},
	},
};
</script>
