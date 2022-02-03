<template>
  <div class="permissions-role-column">
    <permissions-role-icon :user="role.user"></permissions-role-icon>
    {{ role.name }}
  </div>
</template>

<script>
import PermissionsRoleIcon from './permissions-role-icon.vue';

export default {
  name: 'permissions-role-column',
  components: { PermissionsRoleIcon },
  props: {
    role: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.permissions-role-column {
  display: flex;
  align-items: center;
  .permissions-role-icon {
    margin-right: var(--spacing-sm);
  }
}
</style>
