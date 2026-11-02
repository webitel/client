<template>
  <settings-section-wrapper>
    <template #title>
      {{ t('vocabulary.notification') }}
    </template>
    <template v-if="isLoaded">
      <settings-switcher-row
        v-for="notification of notifications"
        :key="notification.type"
        :model-value="notification.value"
        @update:model-value="changeNotification(notification.type, $event)"
      >
        <template #label>
          {{ t(`settings.notifications.${notification.type}`) }}
        </template>
      </settings-switcher-row>
    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import SettingsSectionWrapper from '../../../../components/_internals/settings-section-wrapper.vue';
import SettingsSwitcherRow from '../../../../components/_internals/settings-switcher-row.vue';
import { useNotificationSettings } from '../../composables/useNotificationSettings';

const { t } = useI18n();

const { notifications, isLoaded, changeNotification } =
	useNotificationSettings();
</script>
