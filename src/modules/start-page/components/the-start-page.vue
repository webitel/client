<template>
  <section class="start-nav">
    <article class="start-nav__wrapper">
      <category-lvl-1
        :categories="categories"
        :selected="selected"
        @select="select"
      >
        <category-lvl-2
          :categories="subcategories"
          class="d-none d-block-xs"
        />
      </category-lvl-1>
      <category-lvl-2
        :categories="subcategories"
        class="d-none-xs"
      />
    </article>
  </section>
</template>

<script>
import navMixin from '../../../app/mixins/navMixin';
import CategoryLvl1 from './_internals/start-category-lvl-1.vue';
import CategoryLvl2 from './_internals/start-category-lvl-2.vue';

export default {
  name: 'TheStartPage',
  components: { CategoryLvl1, CategoryLvl2 },
  mixins: [navMixin],
  data: () => ({
    selected: {},
  }),

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

  mounted() {
    this.initSelected();
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
    var(--spacing-sm) * 2
    + var(--button-min-height) * 7
    + var(--spacing-2xs) * 6
  );

  --lvl-1-bg: var(--dp-18-surface-color);
  --lvl-1-bg--hover: var(--dp-20-surface-color);
  --lvl-1-bg--selected: var(--primary-color);
  --lvl-1-text--selected: var(--primary-on-color);

  @media (#{$media} and #{$media-width-sm}) {
    --wrapper-width: 80%;
  }

  @media (#{$media} and #{$media-width-xs}) {
    --wrapper-width: 100%;
    --wrapper-height: 100%;
  }
}

.start-nav {
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
}

.start-nav__wrapper {
  @extend %wt-scrollbar;

  display: grid;
  box-sizing: border-box;
  width: var(--wrapper-width);
  height: var(--wrapper-height);
  margin: auto;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
  background: var(--dp-20-surface-color);
  grid-template-columns: repeat(2, 1fr);
  grid-gap: var(--spacing-sm);

  @media (#{$media} and #{$media-width-xs}) {
    grid-template-columns: 1fr;
  }
}
</style>
