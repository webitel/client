<template>
  <settings-section-wrapper>
    <template #title>
      {{ t('vocabulary.notification') }}
    </template>
    <template v-if="isLoaded">
        <notifications-sound-state
          v-for="(type) of Object.values(NotificationType)"
          :key="type"
          :notification-type="type"
          :value="settingsList[type]"
          @change="updateNotifications(type, $event)"
        />
    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import { UserSettingsAPI } from '@webitel/api-services/api';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { NotificationType } from '../../../enums/NotificationType';
import SettingsSectionWrapper from '../utils/settings-section-wrapper.vue';
import NotificationsSoundState from './notifications-sound-state.vue';

const { t } = useI18n();

const settingsList = ref({});
const isLoaded = ref(false);

const loadNotifications = async () => {
	try {
		settingsList.value = await UserSettingsAPI.get({
			key: 'notification',
		});
	} finally {
		isLoaded.value = true;
	}
};

onMounted(loadNotifications);

const updateNotifications = async (type, value) => {
	settingsList.value[type] = value;
	try {
		await UserSettingsAPI.set({
			key: 'notification',
			value: settingsList.value,
		});
	} catch {
		settingsList.value[type] = !value;
	}
};
</script>

<style scoped>

</style> 
