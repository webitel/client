<template>
    <settings-switcher-row v-model="isNotificationOn" @update:modelValue="changeNotificationState">
      <template #label>
        {{ t(`settings.notifications.${notificationType}`) }}
      </template>
    </settings-switcher-row>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import SettingsSwitcherRow from '../utils/settings-switcher-row.vue';
import { NotificationType } from '../../../enums/NotificationType';

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


