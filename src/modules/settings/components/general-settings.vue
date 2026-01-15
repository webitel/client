<template>
  <settings-wrapper-column>
    <change-password-section />
    <language-settings-section />
  </settings-wrapper-column>
  <settings-wrapper-column>
    <webphone-section />
    <timezone-section />
  </settings-wrapper-column>
</template>

<script setup lang="ts">
import ChangePasswordSection from './settings-sections/change-password-section.vue';
import LanguageSettingsSection from './settings-sections/language-settings-section.vue';
import TimezoneSection from './settings-sections/timezone-setting-section.vue';
import WebphoneSection from './settings-sections/webphone-section.vue';

import SettingsWrapperColumn from './_internals/settings-wrapper-column.vue';
</script>