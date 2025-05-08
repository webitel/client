<template>
  <section>
    <permissions-popup @close="closePopup" />
    <delete-confirmation-popup
      :callback="deleteCallback"
      :delete-count="deleteCount"
      :shown="isDeleteConfirmationPopup"
      @close="closeDelete"
    />

    <header class="content-header">
      <h3 class="content-title">
        {{ $tc('objects.permissions.roles.permissions.permissions', 2) }}
      </h3>
      <div class="content-header__actions-wrap">
        <delete-all-action
          v-if="!disableUserInput"
          :class="{ hidden: anySelected }"
          :selected-count="selectedRows.length"
          @click="
            askDeleteConfirmation({
              deleted: selectedRows,
              callback: () => deleteData(selectedRows),
            })
          "
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
            @click="
              askDeleteConfirmation({
                deleted: [item],
                callback: () => deleteData(item),
              })
            "
          />
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script>
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
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
        (permission) => permission.id !== 'reset_active_attempts')
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
        add: this.$t('objects.permissions.roles.permissions.add'),
        delete: this.$t('objects.permissions.roles.permissions.delete'),
        read: this.$t('objects.permissions.roles.permissions.read'),
        write: this.$t('objects.permissions.roles.permissions.write'),
        eavesdrop_call: this.$t(
          'objects.permissions.roles.permissions.eavesdropCall',
        ),
        playback_record_file: this.$t(
          'objects.permissions.roles.permissions.playbackRecordFile',
        ),
        time_limited_record_file: this.$t(
          'objects.permissions.roles.permissions.timeLimitedRecordFile',
        ),
        reset_active_attempts: this.$t(
          'objects.permissions.roles.permissions.resetActiveAttempts',
        ),
        export_data_grid: this.$t(
          'objects.permissions.roles.permissions.exportDataGrid',
        ),
        view_cdr_phone_numbers: this.$t(
          'objects.permissions.roles.permissions.viewCdrPhoneNumbers',
        ),
        manage_user_roles: this.$t(
          'objects.permissions.roles.permissions.manageUserRoles',
        ),
        manage_user_license: this.$t(
          'objects.permissions.roles.permissions.manageUserLicense',
        ),
        change_user_password: this.$t(
          'objects.permissions.roles.permissions.changeUserPassword',
        ),
        system_setting: this.$t(
          'objects.permissions.roles.permissions.systemSetting',
        ),
        scheme_variables: this.$t(
          'objects.permissions.roles.permissions.schemeVariables',
        ),
      };
    },
    permissionUsageLocale() {
      return {
        add: this.$t('objects.permissions.roles.permissions.addDescription'),
        delete: this.$t(
          'objects.permissions.roles.permissions.deleteDescription',
        ),
        read: this.$t('objects.permissions.roles.permissions.readDescription'),
        write: this.$t(
          'objects.permissions.roles.permissions.writeDescription',
        ),
        eavesdrop_call: this.$t(
          'objects.permissions.roles.permissions.eavesdropCallDescription',
        ),
        playback_record_file: this.$t(
          'objects.permissions.roles.permissions.playbackRecordFileDescription',
        ),
        time_limited_record_file: this.$t(
          'objects.permissions.roles.permissions.timeLimitedRecordFileDescription',
        ),
        reset_active_attempts: this.$t(
          'objects.permissions.roles.permissions.resetActiveAttemptsDescription',
        ),
        export_data_grid: this.$t(
          'objects.permissions.roles.permissions.exportDataGridDescription',
        ),
        view_cdr_phone_numbers: this.$t(
          'objects.permissions.roles.permissions.viewCdrPhoneNumbersDescription',
        ),
        manage_user_roles: this.$t(
          'objects.permissions.roles.permissions.manageUserRolesDescription',
        ),
        manage_user_license: this.$t(
          'objects.permissions.roles.permissions.manageUserLicenseDescription',
        ),
        change_user_password: this.$t(
          'objects.permissions.roles.permissions.changeUserPasswordDescription',
        ),
        system_setting: this.$t(
          'objects.permissions.roles.permissions.systemSettingDescription',
        ),
        scheme_variables: this.$t(
          'objects.permissions.roles.permissions.schemeVariablesDescription',
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
    setParentId() {},
  },
};
</script>

<style scoped></style>
