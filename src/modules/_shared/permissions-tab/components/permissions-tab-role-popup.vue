<template>
  <wt-popup
    class="permissions-tab-role-popup"
    min-width="480"
    overflow
    @close="close"
  >
    <template slot="title">
      {{ $t('objects.permissions.object.newPermissionRole') }}
    </template>
    <template slot="main">
      <permissions-role-select
        v-model="newGrantee"
        :placeholder="$tc('objects.permissions.permissionsRole', 1)"
        :search="getAvailableGrantees"
        :internal-search="false"
        :clearable="false"
      ></permissions-role-select>
    </template>
    <template slot="actions">
      <wt-button @click="save">{{ $t('objects.add') }}</wt-button>
      <wt-button color="secondary" @click="close">{{ $t('objects.close') }}</wt-button>
    </template>
  </wt-popup>
</template>

<script>
import permissionsTabRolePopupMixins
  from '../../../../app/mixins/objectPagesMixins/permissionsTabMixin/permissionsTabRolePopupMixin';
import PermissionsRoleSelect from './permissions-role-select.vue';

export default {
  name: 'permissions-tab-role-popup',
  mixins: [permissionsTabRolePopupMixins],
  components: { PermissionsRoleSelect },
};
</script>

<style lang="scss" scoped>
</style>
