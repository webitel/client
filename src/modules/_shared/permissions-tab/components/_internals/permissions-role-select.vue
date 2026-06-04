<template>
  <wt-single-select
    class="permissions-role-select"
    option-label="name"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #value="{ value, getOptionLabel }">
      <span class="multiselect__single-label permissions-tab-role-popup__select-option">
        <wt-icon
          :icon="value.user ? 'user' : 'role'"
          class="permissions-role-icon"
        />
        {{ getOptionLabel(value) || value }}
      </span>
    </template>

    <template #option="{ option, getOptionLabel }">
      <span class="permissions-tab-role-popup__select-option">
        <wt-icon
          :icon="option.user ? 'user' : 'role'"
          class="permissions-role-icon"
        />
        {{ getOptionLabel(option) || option }}
      </span>
    </template>
  </wt-single-select>
</template>

<script>
export default {
	name: 'PermissionsRoleSelect',
};
</script>

<style lang="scss" scoped>
.permissions-tab-role-popup__select-option {
  display: flex;
  align-items: center;
}

.permissions-role-icon {
  margin-right: var(--spacing-sm);
}
</style>
