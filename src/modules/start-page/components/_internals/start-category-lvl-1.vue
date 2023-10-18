<template>
  <ul class="start-nav__category start-nav__category--lvl-1">
    <li
      v-for="(category, key) of categories"
      :key="key"
      class="start-nav__category-option__wrapper"
    >
      <button
        :class="{ 'start-nav__category-option--selected': selected.value === category.value }"
        class="start-nav__category-option start-nav__category-option--lvl-1"
        @click="select(category)"
      >
        <wt-icon :icon="category.value" icon-prefix="adm"></wt-icon>
        {{ category.name }}
      </button>
      <div v-show="selected.value === category.value">
        <slot></slot>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'start-category-lvl-1',
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    select(category) {
      this.$emit('select', category);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../css/start-category';

.start-nav__category-option--lvl-1 {
  background: var(--lvl-1-bg);

  &.start-nav__category-option--selected,
  &:hover {
    background: var(--lvl-1-bg--hover);
  }
}
</style>
