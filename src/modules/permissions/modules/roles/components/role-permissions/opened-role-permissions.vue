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
      <h3 class="content-title">{{ $tc('objects.permissions.roles.permissions', 2) }}</h3>
      <div class="content-header__actions-wrap">
        <wt-search-bar
          v-model="search"
          debounce
          @enter="loadList"
          @search="loadList"
        ></wt-search-bar>
        <wt-icon-btn
          v-if="!disableUserInput"
          :tooltip="actionPanelDeleteTooltip"
          class="icon-action"
          icon="bucket"
          @click="callDelete(selectedRows)"
        ></wt-icon-btn>
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
          {{ item.name }}
        </template>
        <template slot="usage" slot-scope="{ item }">
          {{ item.usage }}
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
