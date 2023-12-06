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
        <wt-icon
          :color="selected.value === category.value ? 'on-primary' : 'default'"
          :icon="category.value"
          icon-prefix="adm"
        />
        {{ category.name }}
      </button>
      <div v-show="selected.value === category.value">
        <slot />
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'StartCategoryLvl1',
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

  &:hover {
    background: var(--lvl-1-bg--hover);
  }

  &.start-nav__category-option--selected {
    color: var(--lvl-1-text--selected);
    background: var(--lvl-1-bg--selected);
  }
}
</style>
