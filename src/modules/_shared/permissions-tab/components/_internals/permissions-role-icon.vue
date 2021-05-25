<template>
  <wt-icon
    class="permissions-role-icon"
    :icon="icon"
    color="active"
  ></wt-icon>
</template>

<script>
  export default {
    name: 'permissions-role-icon',
    props: {
      user: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      icon() {
        return this.user ? 'user' : 'role';
      },
    },
  };
</script>

<style scoped>

</style>
