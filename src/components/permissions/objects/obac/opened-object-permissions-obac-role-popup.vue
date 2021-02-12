<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $t('objects.permissions.object.newPermissionRole') }}
    </template>
    <template slot="main">
    <wt-select
        v-model="newGrantee"
        :placeholder="$tc('objects.permissions.permissionsRole', 1)"
        :search="getAvailableGrantees"
        :internal-search="false"
        :clearable="false"
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
import { getRoleList } from '../../../../api/permissions/roles/roles';

export default {
  name: 'opened-object-permissions-obac-role-popup',
  data() {
    return {
      newGrantee: '',
    };
  },

  computed: {
    ...mapState('permissions/objects/obac', {
      dataList: (state) => state.dataList,
    }),
  },

  methods: {
    ...mapActions('permissions/objects/obac', {
      addRolePermissions: 'ADD_ROLE_PERMISSIONS',
    }),
    async save() {
      try {
        await this.addRolePermissions(this.newGrantee);
        this.close();
      } catch (err) {
        throw err;
      }
    },

    // filter new roles
    async getAvailableGrantees(search) {
      const roles = await this.loadRoles(search);
      return roles.filter((role) => (
        !this.dataList.some((usedRoles) => role.id === usedRoles.grantee.id)));
    },
    async loadRoles(search) {
      const response = await getRoleList(1, 10, search);
      return response?.list || [];
    },

    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
