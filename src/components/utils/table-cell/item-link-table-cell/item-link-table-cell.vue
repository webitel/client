<template>
  <router-link
    class="nameLink"
    :to="link"
    target="_blank"
  >
  <slot>{{ text }}</slot>
  </router-link>
</template>

<script>
export default {
  name: 'item-link-table-cell',
  props: {
    text: {
      type: String,
      default: '',
    },
    link: {
      type: [String, Object],
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
