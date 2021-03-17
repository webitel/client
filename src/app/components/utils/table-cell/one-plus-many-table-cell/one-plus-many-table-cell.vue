<template>
  <div>
    <a
      v-if="collection.length"
      class="nameLink"
      tabIndex="0"
      @click.prevent="inputHandler"
      @keypress.enter.prevent="inputHandler"
    >{{ collection[0].name }}</a>
    <wt-badge v-if="collection.length > 1">
      +{{ collection.length - 1 }}
    </wt-badge>
  </div>
</template>

<script>
export default {
  name: 'one-plus-many-table-cell',
  props: {
    collection: {
      required: true,
    },
  },
  methods: {
    inputHandler() {
      this.$emit('input');
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-badge {
  margin-left: var(--component-spacing);
}
</style>
