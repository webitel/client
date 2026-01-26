<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header hide-primary>
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>
    <template #main>
      <section class="settings-section">
        <wt-tabs
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        />
        <section class="settings-wrapper">
          <component :is="currentTab.component" />
        </section>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import SettingsRouteNames from '../routes/_internals/SettingsRouteNames.enum';
import GeneralSettings from './general-settings.vue';
import NotificationSettings from './notification-settings.vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const path = computed(() => [
  { name: t('settings.settings', 2) },
]);

const tabs = computed(() => [
  {
    text: t('objects.general'),
    component: GeneralSettings,
    pathName: SettingsRouteNames.GENERAL,
  },
  {
    text: t('vocabulary.notification', 2),
    component: NotificationSettings,
    pathName: SettingsRouteNames.NOTIFICATIONS,
  },
]);

const currentTab = computed(() =>
  tabs.value.find((tab) => tab.pathName === route.name) || tabs.value[0]
);

function changeTab(tab: { pathName: string }) {
  router.push({ name: tab.pathName });
}
</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/main' as *;

.settings-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  width: 100%;
}

.settings-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-sm);
  width: 100%;
}
</style>
