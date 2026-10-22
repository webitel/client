<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="the-settings"
  >
    <template #header>
      <wt-page-header hide-primary>
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>
    <template #main>
      <section class="the-settings__content">
        <wt-tabs
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        />
        <section class="opened-card-input-grid">
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
import SettingsGeneral from '../modules/general/components/settings-general.vue';
import SettingsNotifications from '../modules/notifications/components/settings-notifications.vue';
import SettingsRouteNames from '../routes/_internals/SettingsRouteNames.enum';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const path = computed(() => [
	{
		name: t('settings.settings', 2),
	},
]);

const tabs = computed(() => [
	{
		text: t('objects.general'),
		value: 'general',
		component: SettingsGeneral,
		pathName: SettingsRouteNames.GENERAL,
	},
	{
		text: t('vocabulary.notification', 2),
		value: 'notifications',
		component: SettingsNotifications,
		pathName: SettingsRouteNames.NOTIFICATIONS,
	},
]);

const currentTab = computed(
	() => tabs.value.find((tab) => tab.pathName === route.name) || tabs.value[0],
);

function changeTab(tab: { pathName: string }) {
	router.push({
		name: tab.pathName,
	});
}
</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/main' as *;

.the-settings__content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  width: 100%;
}
</style>
