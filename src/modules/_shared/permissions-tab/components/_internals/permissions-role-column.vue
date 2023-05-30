<template>
  <div class="permissions-role-column">
    <wt-icon
      class="permissions-role-icon"
      :icon="role.user ? 'user' : 'role'"
      color="active"
    ></wt-icon>
    {{ role.name }}
  </div>
</template>

<script>

export default {
  name: 'permissions-role-column',
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
