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
          :value="settingsList[type]"
          @update-notification="(value) => updateNotifications(type, value)"
        />
    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import { UserSettingsAPI } from '@webitel/api-services/api';

import { NotificationType } from '../../../enums/NotificationType';
import SettingsSectionWrapper from '../utils/settings-section-wrapper.vue';
import NotificationsSoundState from "./notifications-sound-state.vue";
import { onMounted, ref } from "vue";

const { t } = useI18n();

const settingsList = ref({})

onMounted(async () => {
  settingsList.value = await UserSettingsAPI.get({
    key: 'notification',
  })
})

const updateNotifications = async (type, value) => {
  settingsList.value[type] = value
  try {
    await UserSettingsAPI.set({
      key: 'notification',
      value: settingsList.value
    })
  } catch {
    settingsList.value[type] = !value
  }
}
</script>

<style scoped>

</style> 
