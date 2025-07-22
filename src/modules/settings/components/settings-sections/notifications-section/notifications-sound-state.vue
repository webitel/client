<template>
    <settings-switcher-row
     :model-value="isNotificationOn"
      @update:model-value="changeNotificationState"
      >
      <template #label>
        {{ t(`settings.notifications.${notificationType}`) }}
      </template>
    </settings-switcher-row>
</template>

<script setup lang="ts">
import { defineProps,ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { NotificationType } from '../../../enums/NotificationType';
import SettingsSwitcherRow from '../utils/settings-switcher-row.vue';

const props = defineProps<{ notificationType: NotificationType }>();
const { t } = useI18n();

const isNotificationOn = ref(localStorage.getItem(`settings/${props.notificationType}`) === 'true');

function changeNotificationState(value: boolean) {
  value
    ? localStorage.setItem(`settings/${props.notificationType}`, 'true')
    : localStorage.removeItem(`settings/${props.notificationType}`);
  isNotificationOn.value = value;
}
</script>


