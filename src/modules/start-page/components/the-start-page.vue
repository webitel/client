<template>
  <section class="start-nav">
    <article class="start-nav__wrapper">
      <category-lvl-1
        :categories="categories"
        :selected="selected"
        @select="select"
      >
        <category-lvl-2
          class="d-none d-block-xs"
          :categories="subcategories"
        ></category-lvl-2>
      </category-lvl-1>
      <category-lvl-2
        class="d-none-xs"
        :categories="subcategories"
      ></category-lvl-2>
    </article>
  </section>
</template>

<script>
import CategoryLvl1 from './_internals/start-category-lvl-1.vue';
import CategoryLvl2 from './_internals/start-category-lvl-2.vue';
import navMixin from '../../../app/mixins/navMixin';

export default {
  name: 'the-start-page',
  mixins: [navMixin],
  components: { CategoryLvl1, CategoryLvl2 },
  data: () => ({
    selected: {},
  }),

  mounted() {
    this.initSelected();
  },

  computed: {
    categories() {
      return this.nav;
    },
    subcategories() {
      if (!this.selected.subNav) return [];
      return this.selected.subNav.map((subNav) => {
        const route = `${this.selected.route}/${subNav.route}`;
        return { ...subNav, route };
      });
    },
  },

  methods: {
    initSelected() {
      this.select(this.categories[0]);
    },
    select(category) {
      this.selected = category;
    },
  },
};
</script>

<style lang="scss" scoped>
.start-nav {
  --button-min-height: 60px;
  --wrapper-width: 60%;
  --wrapper-height: calc(
    var(--component-padding) * 2
    + var(--button-min-height) * 6
    + var(--component-padding) * 5
  );

  --lvl-1-bg: hsla(var(--_secondary-color), var(--_opacity--default));
  --lvl-1-bg--hover: hsla(var(--_accent-color), var(--_opacity--default));

  @media (#{$media} and #{$media-width-sm}) {
    --wrapper-width: 80%;
    --wrapper-height: 440px;
  }

  @media (#{$media} and #{$media-width-xs}) {
    --wrapper-width: 100%;
    --wrapper-height: 100%;
  }
}

.start-nav {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.start-nav__wrapper {
  @extend %wt-scrollbar;

  box-sizing: border-box;
  width: var(--wrapper-width);
  height: var(--wrapper-height);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: var(--component-spacing);
  padding: var(--component-padding);
  margin: auto;
  background: var(--main-color);
  border-radius: var(--border-radius);

  @media (#{$media} and #{$media-width-xs}) {
    grid-template-columns: 1fr;
  }
}
</style>
