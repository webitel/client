<template>
  <div class="object-wrap">
    <main class="object">
      <wt-notifications-bar/>
      <app-header></app-header>
      <div class="object-content-wrap">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import AppHeader from '../shared/app-header/app-header.vue';

export default {
  name: 'module-wrap',
  components: { AppHeader },
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
  padding: 20px 30px;
}
</style>
