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
import permissionsTabRolePopupMixins from '../../../../mixins/objectPagesMixins/permissionsTabMixin/permissionsTabRolePopupMixin';

export default {
  name: 'permissions-tab-role-popup',
  mixins: [permissionsTabRolePopupMixins],
};
</script>

<style lang="scss" scoped>

</style>
