<template>
  <main class="object-wrap">
    <section class="object wt-scrollbar">
      <app-header />
      <div class="object-content-wrap">
        <router-view />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import AppHeader from './app-header.vue';
</script>

<style scoped>
.object-wrap {
  display: flex;
  width: 100%;
  min-height: 100%;
  height: 100%;
}

.object {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 100%;
  min-height: 0;
  background: var(--wt-page-wrapper-background-color);
  overflow: auto;
}

.object-content-wrap {
  display: flex;
  flex: 1;
}

.object-content-wrap:has(.table-section) {
  min-height: 0;
}
</style>
