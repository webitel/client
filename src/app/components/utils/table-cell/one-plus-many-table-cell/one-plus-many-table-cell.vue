<template>
  <div>
    <a
      v-if="collection.length"
      class="nameLink"
      tabIndex="0"
      @click.prevent="inputHandler"
      @keypress.enter.prevent="inputHandler"
    >{{ collection[0].name }}</a>
    <wt-chip v-if="collection.length > 1">
      +{{ collection.length - 1 }}
    </wt-chip>
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
.wt-chip {
  margin-left: var(--component-spacing);
}
</style>
