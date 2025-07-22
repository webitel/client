<template>
  <settings-section-wrapper>
    <template #title>
      {{ t('vocabulary.notification') }}
    </template>
    <template>
        <notifications-sound-state
          v-for="(type) of Object.values(NotificationType)"
          :notification-type="type"
          :key="type"
        />
    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import NotificationsSoundState from "./notifications-sound-state.vue";
import {useI18n} from "vue-i18n";
import SettingsSectionWrapper from '../utils/settings-section-wrapper.vue';
import { NotificationType } from '../../../enums/NotificationType';

const { t } = useI18n();

</script>

<style scoped>

</style> 
