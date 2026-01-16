<template>
  <main class="object-wrap wt-scrollbar">
    <section class="object">
      <wt-notifications-bar />
      <app-header />
      <div class="object-content-wrap">
        <router-view />
      </div>
    </section>
  </main>
</template>

<script>
import AppHeader from '../../_reusable/app-header/components/app-header.vue';

export default {
  name: 'ModuleWrap',
  components: { AppHeader },
};
</script>

<style scoped>
.object-wrap {
  display: flex;
  width: 100%;
  min-height: 100%;
  height: 100%;
  overflow: auto;
}

.object {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 100%;
  min-height: 100%;
  background: var(--wt-page-wrapper-background-color);
}

.object-content-wrap {
  display: flex;
  flex: 1;
  min-height: 0;
}
</style>
