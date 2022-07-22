<template>
  <router-link
    :target="target"
    :to="to"
    class="name-link"
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
    routeName: {
      type: String,
    },
    id: {
      type: [String, Number],
    },
  },
  computed: {
    to() {
      return this.link || {
        name: `${this.routeName}-edit`,
        params: { id: this.id },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.name-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    text-decoration: underline;
  }
}
</style>
