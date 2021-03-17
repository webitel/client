<template>
  <main class="object-wrap">
    <section class="object">
      <wt-notifications-bar/>
      <app-header></app-header>
      <div class="object-content-wrap">
        <router-view></router-view>
      </div>
    </section>
  </main>
</template>

<script>
import AppHeader from '../../_reusable/app-header/components/app-header.vue';

export default {
  name: 'module-wrap',
  components: { AppHeader },
};
</script>

<style lang="scss" scoped>
// outer wrap of module- page
.object-wrap {
  width: 100%;
  min-height: 100%;
  overflow-y: scroll;
}

// main content itself, without nav but with main header
.object {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: var(--main-page-bg-color);
}

.object-content-wrap {
  flex-grow: 1;
  display: flex;

  & > * {
    box-sizing: border-box;
    width: 100%; // FIXME: delete after complete refactor with wt-page-wrapper
    &:not(.wt-page-wrapper) {
      padding: 20px 30px;
    }
  }
}
</style>
