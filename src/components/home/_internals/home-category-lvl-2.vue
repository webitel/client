<template>
  <ul class="home-nav__category home-nav__category--lvl-2">
    <li class="
            home-nav__category-option__wrapper
            home-nav__category-option
            home-nav__category-option--lvl-2
          "
        v-for="(category, key) of categories"
        :key="key"
    >
      <span class="home-nav__category-indicator"></span>
      <router-link
        class="home-nav__link"
        :to="category.route"
      >{{ category.name }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'home-category-lvl-2',
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/admin/home/home-category';

.home-nav__category--lvl-2 {
  @extend %wt-scrollbar;
  overflow-y: scroll;
}

.home-nav__category-option--lvl-2 {
  .home-nav__category-indicator {
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
</style>
