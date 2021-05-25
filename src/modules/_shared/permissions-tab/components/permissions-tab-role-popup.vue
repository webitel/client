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
      <wt-select
        v-model="newGrantee"
        :placeholder="$tc('objects.permissions.permissionsRole', 1)"
        :search="getAvailableGrantees"
        :internal-search="false"
        :clearable="false"
      >
        <template slot="singleLabel" slot-scope="{ option, optionLabel }">
          <span class="multiselect__single-label permissions-tab-role-popup__select-option">
            <permissions-role-icon
              :user="option.user"
            ></permissions-role-icon>
            {{ option[optionLabel] || option }}
          </span>
        </template>

        <template slot="option" slot-scope="{ option, optionLabel }">
          <span class="permissions-tab-role-popup__select-option">
            <permissions-role-icon
              :user="option.user"
            ></permissions-role-icon>
            {{ option[optionLabel] || option }}
          </span>
        </template>
      </wt-select>
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
import PermissionsRoleIcon from './permissions-role-icon.vue';

export default {
  name: 'permissions-tab-role-popup',
  mixins: [permissionsTabRolePopupMixins],
  components: { PermissionsRoleIcon },
};
</script>

<style lang="scss" scoped>
//  elevating specificity
.permissions-tab-role-popup .multiselect .permissions-tab-role-popup__select-option {
  display: flex;
  align-items: center;
}

.permissions-role-icon {
  margin-right: var(--component-spacing);
}
</style>
