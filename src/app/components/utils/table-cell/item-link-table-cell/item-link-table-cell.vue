<template>
  <router-link
    class="nameLink"
    :to="link"
    :target="target"
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
    target: {
      type: String,
      default: '_self',
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
