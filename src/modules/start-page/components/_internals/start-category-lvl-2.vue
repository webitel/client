<template>
  <ul class="start-nav__category start-nav__category--lvl-2">
    <li class="
            start-nav__category-option__wrapper
            start-nav__category-option
            start-nav__category-option--lvl-2
          "
        v-for="(category, key) of categories"
        :key="key"
    >
      <span class="start-nav__category-indicator"></span>
      <router-link
        class="start-nav__link"
        :to="category.route"
      >{{ category.name }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'start-category-lvl-2',
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../css/start-category';

.start-nav__category--lvl-2 {
  @extend %wt-scrollbar;
  overflow-y: scroll;
}

.start-nav__category-option--lvl-2 {
  .start-nav__category-indicator {
    position: relative;
    display: block;
    width: 24px;
    height: 24px;

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      background: var(--contrast-color);
    }
  }
}

.start-nav__link:hover, .start-nav__link:active {
  text-decoration: underline;
}
</style>
