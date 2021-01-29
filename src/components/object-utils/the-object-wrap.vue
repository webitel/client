<template>
  <div class="object-wrap">
    <main class="object">
      <wt-notifications-bar/>
      <app-header></app-header>
      <div class="object-content-wrap">
        <wt-loader v-if="isLoading"></wt-loader>
        <router-view v-else></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppHeader from '../shared/app-header/app-header.vue';

export default {
  name: 'module-wrap',
  components: { AppHeader },
  computed: mapState('userinfo', {
    isLoading: (state) => state.isLoading,
  }),
};
</script>

<style lang="scss" scoped>
.object {
  display: flex;
  flex-direction: column;
  background: var(--main-page-bg-color);
}

.object-content-wrap {
  flex-grow: 1;
  display: flex;
  padding: 20px 30px;
}

.wt-loader {
  align-self: center;
  justify-self: center;
}
</style>
