<template>
  <main class="object-wrap">
    <section class="object">
      <wt-notifications-bar />
      <app-header />
      <route-transition class="object-content-wrap">
        <router-view />
      </route-transition>
    </section>
  </main>
</template>

<script>
import AppHeader from '../../_reusable/app-header/components/app-header.vue';
import routeTransition
  from '@webitel/ui-sdk/src/components/on-demand/wt-route-transition/wt-route-transition.vue';

export default {
  name: 'ModuleWrap',
  components: {
    AppHeader,
    routeTransition,
  },
};
</script>

<style lang="scss" scoped>
// outer wrap of module- page
.object-wrap {
  display: flex;
  width: 100%;
  min-height: 100%;
}

// main content itself, without nav but with main header
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
  flex-grow: 1;
}
</style>
