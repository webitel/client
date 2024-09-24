<template>
  <main class="object-wrap">
    <section class="object">
      <wt-notifications-bar />
      <app-header />
      <div class="object-content-wrap">
        <router-view v-slot="{ Component }">
          <transition-slide
            :offset="{
              enter: ['-50%', 0],
              leave: [0, 0]
            }"
            duration="200"
            mode="out-in"
            appear
          >
            <component :is="Component" />
          </transition-slide>
        </router-view>
      </div>
    </section>
  </main>
</template>

<script setup>
import { TransitionSlide } from '@morev/vue-transitions';
import AppHeader from '../../_reusable/app-header/components/app-header.vue';
</script>

<style lang="scss" scoped>
// outer wrap of module- page
.object-wrap {
  display: flex;
  width: 100%;
  height: 100%;
}

// main content itself, without nav but with main header
.object {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: var(--wt-page-wrapper-background-color);
}

.object-content-wrap {
  display: flex;
  flex-grow: 1;
  min-height: 0;
}
</style>
