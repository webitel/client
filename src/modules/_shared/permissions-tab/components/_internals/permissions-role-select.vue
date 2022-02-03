<template>
  <wt-select
    class="permissions-role-select"
    v-bind="$attrs"
    v-on="$listeners"
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

<script>
import PermissionsRoleIcon from './permissions-role-icon.vue';

export default {
  name: 'permissions-role-select',
  components: { PermissionsRoleIcon },
};
</script>

<style lang="scss" scoped>
//  elevating specificity
.wt-select.permissions-role-select .permissions-tab-role-popup__select-option {
  display: flex;
  align-items: center;
}

.permissions-role-icon {
  margin-right: var(--spacing-sm);
}
</style>
