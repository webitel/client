<template>
  <wt-popup class="permissions-role-defaults-popup" min-width="480" overflow @close="close">
    <template v-slot:title>
      {{ $t('objects.permissions.object.newPermissionRole') }}
    </template>
    <template v-slot:main>
      <permissions-role-select
        v-model="newGrantor"
        :clearable="false"
        :placeholder="$t('objects.permissions.object.grantor')"
        :search-method="loadRoles"
      ></permissions-role-select>
      <permissions-role-select
        v-model="newGrantee"
        :clearable="false"
        :placeholder="$t('objects.permissions.object.grantee')"
        :search-method="loadRoles"
      ></permissions-role-select>
    </template>
    <template v-slot:actions>
      <wt-button @click="save">{{ $t('objects.add') }}</wt-button>
      <wt-button color="secondary" @click="close">{{ $t('objects.close') }}</wt-button>
    </template>
  </wt-popup>
</template>

<script>
import permissionsTabRolePopupMixins
  from '../../../../../../../app/mixins/objectPagesMixins/permissionsTabMixin/permissionsTabRolePopupMixin';
import PermissionsRoleSelect
  from '../../../../../../_shared/permissions-tab/components/_internals/permissions-role-select.vue';

export default {
  name: 'opened-object-permissions-rbac-role-popup',
  mixins: [permissionsTabRolePopupMixins],
  components: { PermissionsRoleSelect },
  data: () => ({
    newGrantor: '',
  }),

  methods: {
    async save() {
      try {
        await this.addRolePermissions({ grantee: this.newGrantee, grantor: this.newGrantor });
        this.$emit('close');
      } catch (err) {
        throw err;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.permissions-role-defaults-popup {
  .permissions-role-select:not(:last-child) {
    margin-bottom: var(--spacing-sm);
  }
}
</style>
