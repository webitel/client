<template>
  <section class="error-page">
    <article class="error-page__wrapper">
      <img
        class="error-page__img"
        src="../assets/img/403.svg"
        alt="access denied pic"
      >
      <h2 class="error-page__title">{{ $t('errorPages.page403.title') }}</h2>
      <p class="error-page__text">{{ $t('errorPages.page403.text') }}</p>
      <wt-button
        class="error-page__action"
        @click="goToHome"
      >{{ $t('errorPages.goToHome') }}
      </wt-button>
    </article>
  </section>
</template>

<script>
import errorPageMixin from '../mixins/errorPageMixin';

export default {
  name: 'the-access-denied-component',
  mixins: [errorPageMixin],
};
</script>

<style lang="scss" scoped>
@import '../css/error-page';
</style>
