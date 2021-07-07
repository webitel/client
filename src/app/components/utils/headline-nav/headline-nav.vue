<template>
  <nav class="headline-nav">
    <div
      class="headline-nav__nav__wrapper"
      v-for="(singlePath, key) of path"
      :key="key"
    >
      <span v-if="key !== 0" class="headline-nav__nav__indicator"></span>
      <h1 class="headline-nav__nav__title">
        <router-link
          v-if="singlePath.route"
          class="headline-nav__nav__text headline-nav__nav__title-link"
          :to="singlePath.route"
        >{{ singlePath.name }}
        </router-link>
        <span v-else class="headline-nav__nav__text">{{ singlePath.name }}</span>
      </h1>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'headline-nav',
  props: {
    path: {
      type: Array,
      required: true,
      // PATH EXAMPLE
      // default: () => [
      //   { name: 'directory' },
      //   { name: 'users', route: '/directory/users' },
      //   { name: 'adm', route: '/directory/users/3' },
      // ],
    },
  },
};
</script>

<style lang="scss" scoped>
.headline-nav {
  display: flex;
  align-items: center;
  max-width: 80%;
}

.headline-nav__nav__wrapper {
  display: flex;
  align-items: center;
}

.headline-nav__nav__indicator {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin: 0 19px;
  background: var(--icon-primary-color);
  border-radius: 50%;
  flex-shrink: 0;
}

.headline-nav__nav__title {
  @extend %typo-heading-sm;
}

.headline-nav__nav__text {
  color: var(--text-outline-color);
}

.headline-nav__nav__wrapper:last-child {
  min-width: 0;

  .headline-nav__nav__indicator {
    background: var(--icon-accent-color);
  }

  .headline-nav__nav__title {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .headline-nav__nav__text {
    color: var(--text-primary-color);
  }
}
</style>
