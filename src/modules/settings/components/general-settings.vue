<template>
  <div class="settings-wrapper-column">
    <change-password-section />
    <language-settings-section />
  </div>
  <div class="settings-wrapper-column">
    <webphone-section />
    <timezone-section />
  </div>
</template>

<script setup lang="ts">
import ChangePasswordSection from './settings-sections/change-password-section.vue';
import LanguageSettingsSection from './settings-sections/language-settings-section.vue';
import TimezoneSection from './settings-sections/timezone-setting-section.vue';
import WebphoneSection from './settings-sections/webphone-section.vue';
</script>

<style lang="scss" scoped>
.settings-wrapper-column {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: var(--spacing-sm);
}
</style>