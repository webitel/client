<template>
  <ul class="home-nav__category home-nav__category--lvl-1">
    <li
      class="home-nav__category-option__wrapper"
      v-for="(category, key) of categories"
      :key="key"
    >
      <button
        class="home-nav__category-option home-nav__category-option--lvl-1"
        :class="{ 'home-nav__category-option--selected': selected === category }"
        @click="select(category)">
        <wt-icon icon-prefix="adm" color="active" :icon="category.value"></wt-icon>
        {{ category.name }}
      </button>
      <div v-show="selected === category">
        <slot></slot>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'home-category-lvl-1',
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
@import '../../../assets/css/admin/home/home-category';

.home-nav__category-option--lvl-1 {
  background: var(--lvl-1-bg);

  &.home-nav__category-option--selected,
  &:hover {
    background: var(--lvl-1-bg--hover);
  }
}
</style>
