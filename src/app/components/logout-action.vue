<template>
  <div class="logout-action">
    <div class="logout-action__title-wrapper">
      <header class="logout-action__header">
        <wt-icon
          icon="logout"
          color="error"
        />
        <p>{{ t('settings.security.logoutTitle' )}}</p>
      </header>
      <wt-button
        v-tooltip="t('objects.directory.users.logout.tooltip')"
        :disabled="disabled"
        :wide="wide"
        color="error"
        @click="openPopup"
      >
        {{ buttonText }}
      </wt-button>
    </div>
    <confirmation-popup
      :confirm-color="ButtonColor.ERROR"
      :description="t('objects.directory.users.logout.endSessionConfirmationText')"
      :loading="isLoadingUsersLogout"
      :shown="isPopupOpened"
      :title="t('objects.directory.users.logout.endSessionConfirmation')"
      @close="closePopup"
      @confirm="logoutUser"
    />
  </div>
</template>

<script setup lang="ts">
import { UsersAPI } from '@webitel/api-services/api';
import { ButtonColor } from '@webitel/ui-sdk/enums';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserinfoStore } from '../../modules/userinfo/stores/userinfoStore';
import ConfirmationPopup from './confirmation-popup.vue';

const props = withDefaults(
	defineProps<{
		id: string;
		mySessions?: boolean;
		disabled?: boolean;
		wide?: boolean;
	}>(),
	{
		mySessions: false,
		disabled: false,
		wide: false,
	},
);

const { t } = useI18n();
const { clearStorageNotifications } = useUserinfoStore();

const isPopupOpened = ref(false);
const isLoadingUsersLogout = ref(false);

const buttonText = computed(() =>
	props.mySessions
		? t('objects.directory.users.logout.endAllMySessions')
		: t('objects.directory.users.logout.endAllSessions'),
);

const openPopup = () => (isPopupOpened.value = true);
const closePopup = () => (isPopupOpened.value = false);

const logoutUser = async () => {
	isLoadingUsersLogout.value = true;
	try {
		await UsersAPI.logoutUser({
			id: props.id,
		});
		closePopup();
		clearStorageNotifications(props.id);
	} finally {
		// [Claude] reset even on a failed request, or the button spins forever
		isLoadingUsersLogout.value = false;
	}
};
</script>

<style scoped>
.logout-action__title-wrapper {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: var(--spacing-xs);
}

.logout-action__header {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-xs);
}
</style>
