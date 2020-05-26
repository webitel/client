<template>
  <header class="cc-header">
    <div class="cc-header__container">
      <app-navigator/>
      <user-preferences/>
    </div>
  </header>
</template>

<script>
  import AppNavigator from './the-app-navigator.vue';
  import UserPreferences from './user-preferences.vue';

  export default {
    name: 'cc-header',
    components: {
      AppNavigator,
      UserPreferences,
    },

    data: () => ({
    }),
  };
</script>

<style lang="scss" scoped>
  .cc-header {
    padding: (15px) (77px);
    background: $header-bg-color;
  }

  .cc-header__container {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .status-select {
      margin-left: (30px);
    }
  }
</style>
