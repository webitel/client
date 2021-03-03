<template>
  <wt-popup class="permissions-role-defaults-popup" min-width="480" overflow @close="close">
    <template slot="title">
      {{ $t('objects.permissions.object.newPermissionRole') }}
    </template>
    <template slot="main">
      <wt-select
        v-model="newGrantor"
        :placeholder="$t('objects.permissions.object.grantor')"
        :search="loadRoles"
        :internal-search="false"
        :clearable="false"
      ></wt-select>
      <wt-select
        v-model="newGrantee"
        :placeholder="$t('objects.permissions.object.grantee')"
        :search="loadRoles"
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
import permissionsTabRolePopupMixins from '../../../../mixins/objectPagesMixins/permissionsTabMixin/permissionsTabRolePopupMixin';

export default {
  name: 'opened-object-permissions-rbac-role-popup',
  mixins: [permissionsTabRolePopupMixins],
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
  .wt-select:not(:last-child) {
    margin-bottom: var(--component-spacing);
  }
}
</style>
