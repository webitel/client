<template>
  <wt-popup class="permissions-role-defaults-popup" min-width="480" overflow @close="close">
    <template slot="title">
      {{ $t('objects.permissions.object.newPermissionRole') }}
    </template>
    <template slot="main">
      <wt-select
        v-model="newGrantor"
        :placeholder="$t('objects.permissions.object.grantor')"
        :search="getAvailableGrantors"
        :internal-search="false"
        :clearable="false"
      ></wt-select>
      <wt-select
        v-model="newGrantee"
        :placeholder="$t('objects.permissions.object.grantee')"
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
  name: 'opened-object-permissions-rbac-role-popup',
  data() {
    return {
      newGrantee: '',
      newGrantor: '',
    };
  },

  computed: {
    ...mapState('permissions/objects/rbac', {
      dataList: (state) => state.dataList,
    }),
  },

  methods: {
    ...mapActions('permissions/objects/rbac', {
      patchItem: 'ADD_DEFAULT_ITEM_ROLE',
    }),
    async save() {
      try {
        await this.patchItem({ grantee: this.newGrantee, grantor: this.newGrantor });
        this.$emit('close');
      } catch (err) {
        throw err;
      }
    },

    async getAvailableGrantors(search) {
       const roles = await this.loadRoles(search);
       return roles.filter((roles) => (
         !this.dataList.some((usedGrantee) => roles.id === usedGrantee.grantor.id)));
     },

    async getAvailableGrantees(search) {
    //  },
    // getFilteredRoles(filterProp) {
    //   return async function (search) {
        const roles = await this.loadRoles(search);
        return roles.filter((role) => (
          !this.dataList.some((usedRoles) => role.id === usedRoles['grantee'].id)));
      // }
    },

    // get all roles to choose which to add
    async loadRoles(search) {
      const response = await getRoleList(1, 10, search);
      return response.list || [];
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.permissions-role-defaults-popup {
  .wt-select:not(:last-child) {
    margin-bottom: var(--component-spacing);
  }
}
</style>
