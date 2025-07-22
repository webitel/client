<template>
  <settings-section-wrapper>
    <template #title>
      {{ t('vocabulary.notification') }}
    </template>
    <template>
        <notifications-sound-state
          v-for="(type) of Object.values(NotificationType)"
          :key="type"
          :notification-type="type"
        />
    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";

import { NotificationType } from '../../../enums/NotificationType';
import SettingsSectionWrapper from '../utils/settings-section-wrapper.vue';
import NotificationsSoundState from "./notifications-sound-state.vue";

const { t } = useI18n();

</script>

<style scoped>

</style> 
