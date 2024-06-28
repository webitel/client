<template>
  <ul class="start-nav__category start-nav__category--lvl-2">
    <li
      v-for="(category, key) of categories"
      :key="key"
      class="
            start-nav__category-option__wrapper
            start-nav__category-option
            start-nav__category-option--lvl-2
          "
    >
      <span class="start-nav__category-indicator" />
      <router-link
        :to="category.route"
        class="start-nav__link"
      >
        {{ category.name }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
	name: "StartCategoryLvl2",
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
      position: absolute;
      top: 50%;
      left: 50%;
      width: 4px;
      height: 4px;
      content: '';
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: var(--text-main-color);
    }
  }
}

.start-nav__link {
  color: var(--text-main-color);
}

.start-nav__link:hover, .start-nav__link:active {
  text-decoration: underline;
}
</style>
