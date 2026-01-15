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
import { computed, defineProps,ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { EngineSystemSettingName } from '@webitel/api-services/gen/models';

import { NotificationType } from '../../../enums/NotificationType';
import SettingsSwitcherRow from '../utils/settings-switcher-row.vue';

const props = defineProps<{ 
  notificationType: NotificationType,
  value: boolean
}>();

const { t } = useI18n();

const emit = defineEmits(['change']);

const isNotificationTypeInEngineSystemSettingName = computed(() => {
  return Object.values(EngineSystemSettingName).includes(props.notificationType)
})

const localStorageName = computed(() => `settings/${props.notificationType}`)

const isNotificationOn = computed(() => {
  return isNotificationTypeInEngineSystemSettingName.value
    ? props.value
    : localStorage.getItem(localStorageName.value) === 'true'
});

function changeNotificationState(value: boolean) {
  if (isNotificationTypeInEngineSystemSettingName.value) {
    emit('change', value);
  } else {
    localStorage.setItem(localStorageName.value, value);
  }
}
</script>


