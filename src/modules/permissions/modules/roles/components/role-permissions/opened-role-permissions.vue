<template>
  <section>
    <permissions-popup
      v-if="isPermissionsPopup"
      :edited-index="editedIndex"
      @close="closePopup"
    />
    <delete-confirmation-popup
      v-show="isDeleteConfirmationPopup"
      :delete-count="deleteCount"
      :callback="deleteCallback"
      @close="closeDelete"
    />

    <header class="content-header">
      <h3 class="content-title">
        {{ $tc('objects.permissions.roles.permissions.permissions', 2) }}
      </h3>
      <div class="content-header__actions-wrap">
        <delete-all-action
          v-if="!disableUserInput"
          :class="{'hidden': anySelected}"
          :selected-count="selectedRows.length"
          @click="askDeleteConfirmation({
            deleted: selectedRows,
            callback: () => deleteData(selectedRows),
          })"
        />
        <wt-icon-btn
          v-if="!disableUserInput"
          class="icon-action"
          icon="plus"
          @click="create"
        />
      </div>
    </header>

    <div class="table-wrapper">
      <wt-table
        :data="dataList"
        :grid-actions="!disableUserInput"
        :headers="headers"
      >
        <template #name="{ item }">
          {{ permissionNameLocale[item.id] }}
        </template>
        <template #usage="{ item }">
          {{ permissionUsageLocale[item.id] }}
        </template>
        <template #actions="{ item, index }">
          <wt-icon-action
            action="edit"
            @click="edit(index)"
          />
          <wt-icon-action
            action="delete"
            class="table-action"
            @click="askDeleteConfirmation({
              deleted: [item],
              callback: () => deleteData(item),
            })"
          />
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script>
import DeleteConfirmationPopup from "@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue";
import { useDeleteConfirmationPopup } from "@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup";
import { mapActions, mapState } from "vuex";
import openedObjectTableTabMixin from "../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin";
import PermissionsPopup from "./opened-role-permissions-popup.vue";

export default {
	name: "OpenedRolePermissions",
	components: { PermissionsPopup, DeleteConfirmationPopup },
	mixins: [openedObjectTableTabMixin],
	setup() {
		const {
			isVisible: isDeleteConfirmationPopup,
			deleteCount,
			deleteCallback,

			askDeleteConfirmation,
			closeDelete,
		} = useDeleteConfirmationPopup();

		return {
			isDeleteConfirmationPopup,
			deleteCount,
			deleteCallback,

			askDeleteConfirmation,
			closeDelete,
		};
	},
	data: () => ({
		dataListValue: [],
		searchValue: "",
		isPermissionsPopup: false,
		editedIndex: null,
	}),
	watch: {
		permissionsList() {
			this.loadList();
		},
	},
	computed: {
		...mapState("permissions/roles", {
			permissionsList: (state) => state.itemInstance.permissions,
		}),
		// override mixin map state
		dataList: {
			get() {
				return this.dataListValue;
			},
			set(value) {
				this.dataListValue = value;
			},
		},
		// override mixin map state
		search: {
			get() {
				return this.searchValue;
			},
			set(value) {
				this.searchValue = value;
			},
		},
		headers() {
			return [
				{ value: "name", text: this.$t("objects.name") },
				{ value: "usage", text: this.$t("objects.permissions.roles.usage") },
			];
		},
		permissionNameLocale() {
			return {
				add: this.$t("objects.permissions.roles.permissions.add"),
				delete: this.$t("objects.permissions.roles.permissions.delete"),
				read: this.$t("objects.permissions.roles.permissions.read"),
				write: this.$t("objects.permissions.roles.permissions.write"),
				eavesdrop_call: this.$t(
					"objects.permissions.roles.permissions.eavesdropCall",
				),
				playback_record_file: this.$t(
					"objects.permissions.roles.permissions.playbackRecordFile",
				),
				export_data_grid: this.$t(
					"objects.permissions.roles.permissions.exportDataGrid",
				),
				view_cdr_phone_numbers: this.$t(
					"objects.permissions.roles.permissions.viewCdrPhoneNumbers",
				),
				manage_user_roles: this.$t(
					"objects.permissions.roles.permissions.manageUserRoles",
				),
				manage_user_license: this.$t(
					"objects.permissions.roles.permissions.manageUserLicense",
				),
				change_user_password: this.$t(
					"objects.permissions.roles.permissions.changeUserPassword",
				),
				system_setting: this.$t(
					"objects.permissions.roles.permissions.systemSetting",
				),
				scheme_variables: this.$t(
					"objects.permissions.roles.permissions.schemeVariables",
				),
			};
		},
		permissionUsageLocale() {
			return {
				add: this.$t("objects.permissions.roles.permissions.addDescription"),
				delete: this.$t(
					"objects.permissions.roles.permissions.deleteDescription",
				),
				read: this.$t("objects.permissions.roles.permissions.readDescription"),
				write: this.$t(
					"objects.permissions.roles.permissions.writeDescription",
				),
				eavesdrop_call: this.$t(
					"objects.permissions.roles.permissions.eavesdropCallDescription",
				),
				playback_record_file: this.$t(
					"objects.permissions.roles.permissions.playbackRecordFileDescription",
				),
				export_data_grid: this.$t(
					"objects.permissions.roles.permissions.exportDataGridDescription",
				),
				view_cdr_phone_numbers: this.$t(
					"objects.permissions.roles.permissions.viewCdrPhoneNumbersDescription",
				),
				manage_user_roles: this.$t(
					"objects.permissions.roles.permissions.manageUserRolesDescription",
				),
				manage_user_license: this.$t(
					"objects.permissions.roles.permissions.manageUserLicenseDescription",
				),
				change_user_password: this.$t(
					"objects.permissions.roles.permissions.changeUserPasswordDescription",
				),
				system_setting: this.$t(
					"objects.permissions.roles.permissions.systemSettingDescription",
				),
				scheme_variables: this.$t(
					"objects.permissions.roles.permissions.schemeVariablesDescription",
				),
			};
		},
	},
	methods: {
		...mapActions({
			dispatchDelete(dispatch, payload) {
				return dispatch(`${this.namespace}/DELETE_ROLE_PERMISSION`, payload);
			},
		}),
		loadList() {
			this.dataList = this.permissionsList
				.filter((permission) => permission.name.includes(this.search))
				.map((permission) => ({ ...permission, _isSelected: false }));
		},
		create() {
			this.openPopup();
		},
		edit(index) {
			this.editedIndex = index;
			this.openPopup();
		},
		openPopup() {
			this.isPermissionsPopup = true;
		},
		closePopup() {
			this.isPermissionsPopup = false;
			this.editedIndex = null;
		},
		setParentId() {},
	},
};
</script>

<style scoped>

</style>
