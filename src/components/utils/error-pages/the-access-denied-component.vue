<template>
  <section class="error-page">
    <article class="error-page__wrapper">
      <img
        class="error-page__img"
        src="../../../assets/img/admin/error-pages/403.svg"
        alt="access denied pic"
      >
      <h2 class="error-page__title">{{$t('errorPages.page403.title')}}</h2>
      <p class="error-page__text">{{$t('errorPages.page403.text')}}</p>
      <wt-button
        class="error-page__action"
        @click="goToHome"
      >{{$t('errorPages.page403.btn')}}
      </wt-button>
    </article>
  </section>
</template>

<script>
export default {
  name: 'the-access-denied-component',
  methods: {
    goToHome() {
      return this.$router.replace('/admin');
    },
  },
};
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
  padding: 90px;
  background: var(--main-primary-accent-color);

  &__wrapper {
    text-align: center;
    color: var(--text-contrast-color);
  }

  &__img {
    max-width: 65vw;
    width: 778px;
    user-select: none;
  }

  &__title {
    text-transform: uppercase;
    margin-top: 69px;
  }

  &__text {
    margin-top: 21px;
  }

  &__action {
    margin-top: 40px;
  }
}
</style>
