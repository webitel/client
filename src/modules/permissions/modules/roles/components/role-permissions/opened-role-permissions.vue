<template>
  <section>
    <permissions-popup
      v-if="isPermissionsPopup"
      :edited-index="editedIndex"
      @close="closePopup"
    ></permissions-popup>
    <delete-confirmation-popup
      v-show="deleteConfirmation.isDeleteConfirmationPopup"
      :payload="deleteConfirmation"
      @close="closeDelete"
    ></delete-confirmation-popup>

    <header class="content-header">
      <h3 class="content-title">
        {{ $tc('objects.permissions.roles.permissions.permissions', 2) }}
      </h3>
      <div class="content-header__actions-wrap">
        <delete-all-action
          v-if="!disableUserInput"
          :class="{'hidden': anySelected}"
          :selected-count="selectedRows.length"
          @click="callDelete(selectedRows)"
        ></delete-all-action>
        <wt-icon-btn
          v-if="!disableUserInput"
          class="icon-action"
          icon="plus"
          @click="create"
        ></wt-icon-btn>
      </div>
    </header>

    <div class="table-wrapper">
      <wt-table
        :data="dataList"
        :headers="headers"
        :grid-actions="!disableUserInput"
      >
        <template slot="name" slot-scope="{ item }">
          {{ permissionNameLocale[item.id] }}
        </template>
        <template slot="usage" slot-scope="{ item }">
          {{ permissionUsageLocale[item.id] }}
        </template>
        <template slot="actions" slot-scope="{ item, index }">
          <edit-action
            @click="edit(index)"
          ></edit-action>
          <delete-action
            @click="callDelete(item)"
          ></delete-action>
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PermissionsPopup from './opened-role-permissions-popup.vue';
import openedObjectTableTabMixin
  from '../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';

export default {
  name: 'opened-role-permissions',
  mixins: [openedObjectTableTabMixin],
  components: { PermissionsPopup },
  data: () => ({
    dataListValue: [],
    searchValue: '',
    isPermissionsPopup: false,
    editedIndex: null,
  }),
  watch: {
    permissionsList() {
      this.loadList();
    },
  },
  computed: {
    ...mapState('permissions/roles', {
      permissionsList: (state) => state.itemInstance.permissions,
    }),
    // override mixin map state
    dataList: {
      get() { return this.dataListValue; },
      set(value) { this.dataListValue = value; },
    },
    // override mixin map state
    search: {
      get() { return this.searchValue; },
      set(value) { this.searchValue = value; },
    },
    headers() {
      return [
        { value: 'name', text: this.$t('objects.name') },
        { value: 'usage', text: this.$t('objects.permissions.roles.usage') },
      ];
    },
    permissionNameLocale() {
      return {
        add: this.$t('objects.permissions.roles.permissions.add'),
        delete: this.$t('objects.permissions.roles.permissions.delete'),
        read: this.$t('objects.permissions.roles.permissions.read'),
        write: this.$t('objects.permissions.roles.permissions.write'),
        eavesdrop_call: this.$t('objects.permissions.roles.permissions.eavesdropCall'),
        playback_record_file: this.$t('objects.permissions.roles.permissions.playbackRecordFile'),
        export_data_grid: this.$t('objects.permissions.roles.permissions.exportDataGrid'),
        view_cdr_phone_numbers: this.$t('objects.permissions.roles.permissions.viewCdrPhoneNumbers'),
      };
    },
    permissionUsageLocale() {
      return {
        add: this.$t('objects.permissions.roles.permissions.addDescription'),
        delete: this.$t('objects.permissions.roles.permissions.deleteDescription'),
        read: this.$t('objects.permissions.roles.permissions.readDescription'),
        write: this.$t('objects.permissions.roles.permissions.writeDescription'),
        eavesdrop_call: this.$t('objects.permissions.roles.permissions.eavesdropCallDescription'),
        playback_record_file: this.$t('objects.permissions.roles.permissions.playbackRecordFileDescription'),
        export_data_grid: this.$t('objects.permissions.roles.permissions.exportDataGridDescription'),
        view_cdr_phone_numbers: this.$t('objects.permissions.roles.permissions.viewCdrPhoneNumbersDescription'),
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
    setParentId() {
    },
  },
};
</script>

<style scoped>

</style>
