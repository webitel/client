<template>
  <section>
    <permissions-popup @close="closePopup" />
    <delete-confirmation-popup :callback="deleteCallback" :delete-count="deleteCount" :shown="isDeleteConfirmationPopup"
      @close="closeDelete" />

    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.permissions.roles.permissions.permissions', 2) }}
      </h3>
      <div class="content-header__actions-wrap">
        <delete-all-action v-if="!disableUserInput" :class="{ hidden: anySelected }"
          :selected-count="selectedRows.length" @click="
            askDeleteConfirmation({
              deleted: selectedRows,
              callback: () => deleteData(selectedRows),
            })
            " />
        <wt-icon-btn v-if="!disableUserInput" class="icon-action" icon="plus" @click="create" />
      </div>
    </header>

    <div class="table-wrapper">
      <wt-table :data="dataList" :grid-actions="!disableUserInput" :headers="headers">
        <template #name="{ item }">
          {{ permissionNameLocale[item.id] }}
        </template>
        <template #usage="{ item }">
          {{ permissionUsageLocale[item.id] }}
        </template>
        <template #actions="{ item, index }">
          <wt-icon-action action="edit" @click="edit(index)" />
          <wt-icon-action action="delete" @click="
            askDeleteConfirmation({
              deleted: [item],
              callback: () => deleteData(item),
            })
            " />
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script>
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { CrudGlobalAction, SpecialGlobalAction } from '@webitel/ui-sdk/src/modules/Userinfo/v2/enums/index';
import { mapActions, mapState } from 'vuex';

import openedObjectTableTabMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import PermissionsPopup from './opened-role-permissions-popup.vue';

export default {
  name: 'OpenedRolePermissions',
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
  }),
  watch: {
    permissionsList() {
      this.loadList();
    },
  },
  computed: {
    ...mapState('permissions/roles', {
      // author @Lera24
      // [WTEL-6858] https://webitel.atlassian.net/browse/WTEL-6858
      // permissionsList: (state) => state.itemInstance.permissions
      permissionsList: (state) => state.itemInstance.permissions.filter(
        (permission) => permission.id !== SpecialGlobalAction.ResetActiveAttempts),
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
    headers() {
      return [
        {
          value: 'name',
          text: this.$t('objects.name'),
        },
        {
          value: 'usage',
          text: this.$t('objects.permissions.roles.usage'),
        },
      ];
    },
    permissionNameLocale() {
      return {
        [CrudGlobalAction.Add]: this.$t('objects.permissions.roles.permissions.add'),
        [CrudGlobalAction.Delete]: this.$t('objects.permissions.roles.permissions.delete'),
        [CrudGlobalAction.Read]: this.$t('objects.permissions.roles.permissions.read'),
        [CrudGlobalAction.Write]: this.$t('objects.permissions.roles.permissions.write'),
        [SpecialGlobalAction.EavesdropCall]: this.$t('objects.permissions.roles.permissions.eavesdropCall'),
        [SpecialGlobalAction.PlaybackRecordFile]: this.$t('objects.permissions.roles.permissions.playbackRecordFile'),
        [SpecialGlobalAction.TimeLimitedRecordFile]: this.$t('objects.permissions.roles.permissions.timeLimitedRecordFile'),
        [SpecialGlobalAction.ResetActiveAttempts]: this.$t('objects.permissions.roles.permissions.resetActiveAttempts'),
        [SpecialGlobalAction.LimitWorkspaceContacts]: this.$t('objects.permissions.roles.permissions.limitWorkspaceContacts'),
        [SpecialGlobalAction.ExportDataGrid]: this.$t('objects.permissions.roles.permissions.exportDataGrid'),
        [SpecialGlobalAction.ViewCdrPhoneNumbers]: this.$t('objects.permissions.roles.permissions.viewCdrPhoneNumbers'),
        [SpecialGlobalAction.ManageUserRoles]: this.$t('objects.permissions.roles.permissions.manageUserRoles'),
        [SpecialGlobalAction.ManageUserLicense]: this.$t('objects.permissions.roles.permissions.manageUserLicense'),
        [SpecialGlobalAction.ChangeUserPassword]: this.$t('objects.permissions.roles.permissions.changeUserPassword'),
        [SpecialGlobalAction.SystemSetting]: this.$t('objects.permissions.roles.permissions.systemSetting'),
        [SpecialGlobalAction.SchemeVariables]: this.$t('objects.permissions.roles.permissions.schemeVariables'),
        [SpecialGlobalAction.ControlAgentScreen]: this.$t('objects.permissions.roles.permissions.controlAgentScreen'),
      };
    },
    permissionUsageLocale() {
      return {
        [CrudGlobalAction.Add]: this.$t('objects.permissions.roles.permissions.addDescription'),
        [CrudGlobalAction.Delete]: this.$t('objects.permissions.roles.permissions.deleteDescription'),
        [CrudGlobalAction.Read]: this.$t('objects.permissions.roles.permissions.readDescription'),
        [CrudGlobalAction.Write]: this.$t('objects.permissions.roles.permissions.writeDescription'),
        [SpecialGlobalAction.EavesdropCall]: this.$t('objects.permissions.roles.permissions.eavesdropCallDescription'),
        [SpecialGlobalAction.PlaybackRecordFile]: this.$t('objects.permissions.roles.permissions.playbackRecordFileDescription'),
        [SpecialGlobalAction.TimeLimitedRecordFile]: this.$t('objects.permissions.roles.permissions.timeLimitedRecordFileDescription'),
        [SpecialGlobalAction.ResetActiveAttempts]: this.$t('objects.permissions.roles.permissions.resetActiveAttemptsDescription'),
        [SpecialGlobalAction.LimitWorkspaceContacts]: this.$t('objects.permissions.roles.permissions.limitWorkspaceContactsDescription'),
        [SpecialGlobalAction.ExportDataGrid]: this.$t('objects.permissions.roles.permissions.exportDataGridDescription'),
        [SpecialGlobalAction.ViewCdrPhoneNumbers]: this.$t('objects.permissions.roles.permissions.viewCdrPhoneNumbersDescription'),
        [SpecialGlobalAction.ManageUserRoles]: this.$t('objects.permissions.roles.permissions.manageUserRolesDescription'),
        [SpecialGlobalAction.ManageUserLicense]: this.$t('objects.permissions.roles.permissions.manageUserLicenseDescription'),
        [SpecialGlobalAction.ChangeUserPassword]: this.$t('objects.permissions.roles.permissions.changeUserPasswordDescription'),
        [SpecialGlobalAction.SystemSetting]: this.$t('objects.permissions.roles.permissions.systemSettingDescription'),
        [SpecialGlobalAction.SchemeVariables]: this.$t('objects.permissions.roles.permissions.schemeVariablesDescription'),
        [SpecialGlobalAction.ControlAgentScreen]: this.$t('objects.permissions.roles.permissions.controlAgentScreenDescription'),
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
      this.dataList = this.permissionsList.map((permission) => ({
        ...permission,
        _isSelected: false,
      }));
    },
    create() {
      this.addItem();
    },
    edit(index) {
      this.$router.push({
        ...this.$route,
        params: { permissionIndex: index.toString() },
      });
    },
    addItem() {
      this.$router.push({
        ...this.$route,
        params: { permissionIndex: 'new' },
      });
    },
    closePopup() {
      this.$router.go(-1);
    },
    setParentId() { },
  },
};
</script>

<style scoped></style>
