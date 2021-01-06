<template>
  <wt-popup @close="close">
    <template slot="title">
      {{ $t('objects.permissions.object.newPermissionRole') }}
    </template>
    <template slot="main">
      <wt-select
          v-model="newGrantee"
          :label="$tc('objects.permissions.permissionsRole', 1)"
          :search="loadDropdownOptionsList"
          :internal-search="false"
      ></wt-select>
    </template>
    <template slot="actions">
      <wt-button @click="save">{{ $t('objects.add') }}</wt-button>
      <wt-button color="secondary" @click="close">{{ $t('objects.close') }}</wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { getRoleList } from '../../../api/permissions/roles/roles';

export default {
  name: 'opened-user-permissions-role-popup',
  data() {
    return {
      newGrantee: '',
    };
  },

  computed: {
    ...mapState('directory/users/permissions', {
      dataList: (state) => state.dataList,
    }),
  },

  methods: {
    async save() {
      try {
        await this.addRole(this.newGrantee);
        this.close();
      } catch {
      }
    },

    close() {
      this.$emit('close');
    },

    async loadDropdownOptionsList(search) {
      const response = await getRoleList(1, 10, search);
      return response.list
          .map((item) => ({
            name: item.name,
            id: item.id,
          }))
          .filter((grantee) => (
              !this.dataList.some((usedGrantee) => grantee.id === usedGrantee.grantee.id)),
          );
    },

    ...mapActions('directory/users/permissions', {
      addRole: 'ADD_ITEM_ROLE',
    }),
  },
};
</script>

<style lang="scss" scoped>
  .wt-popup ::v-deep .wt-popup__popup {
    min-width: 480px;
    overflow: visible;
  }
</style>
