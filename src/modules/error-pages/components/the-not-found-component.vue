<template>
  <section class="error-page">
    <article class="error-page__wrapper">
      <img
        class="error-page__img"
        src="../assets/img/404.png"
        alt="not found pic"
      >
      <h2
        class="error-page__title">{{ $t('errorPages.page404.title') }}</h2>
      <p class="error-page__text">{{ $t('errorPages.page404.text') }}</p>
      <wt-button
        class="error-page__action"
        @click.native="goToHome"
      >{{ $t('errorPages.goToHome') }}
      </wt-button>
    </article>
  </section>
</template>

<script>
import errorPageMixin from '../mixins/errorPageMixin';

export default {
  name: 'the-not-found-component',
  mixins: [errorPageMixin],
};
</script>

<style lang="scss" scoped>
@import '../css/error-page';
</style>
