<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header hide-primary>
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>
    <template #main>
      <section class="settings-wrapper">
        <div class="settings-wrapper-column">
          <change-password-section />
          <timezone-section />
          <language-settings-section />
          <notifications-sounds-section />
        </div>
        <div class="settings-wrapper-column">
          <webphone-section />
          <ringtones-section />
          <ringtone-volume-control-section />
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import ChangePasswordSection from './settings-sections/change-password-section.vue';
import LanguageSettingsSection from './settings-sections/language-settings-section.vue';
import NotificationsSoundsSection from './settings-sections/notifications-section/notifications-sounds-section.vue';
import RingtoneVolumeControlSection from './settings-sections/ringtone-volume-control-section.vue';
import RingtonesSection from './settings-sections/ringtones-section.vue';
import TimezoneSection from './settings-sections/timezone-setting-section.vue';
import WebphoneSection from './settings-sections/webphone-section.vue';

const { t } = useI18n();

const path = computed(() => [
  { name: t('settings.settings', 2) },
]);

</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/main' as *;

.settings-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-sm);
  width: 100%;
}

.settings-wrapper-column {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: var(--spacing-sm);
}
</style>
