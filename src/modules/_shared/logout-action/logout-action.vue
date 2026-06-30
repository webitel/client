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
        color="error"
        @click="openPopup"
      >
        {{ buttonText }}
      </wt-button>
    </div>
    <logout-confirmation-popup
      :shown="isPopupOpened"
      :text="t('objects.directory.users.logout.endSessionConfirmationText')"
      @close="closePopup"
      @logout="logoutUser"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import UsersAPI from '../../directory/modules/users/api/users';
import { useUserinfoStore } from '../../userinfo/stores/userinfoStore';
import LogoutConfirmationPopup from './logout-confirmation-popup.vue';

const props = withDefaults(
	defineProps<{
		id: string;
		mySessions?: boolean;
		disabled?: boolean;
	}>(),
	{
		mySessions: false,
		disabled: false,
	},
);

const { t } = useI18n();
const { clearStorageNotifications } = useUserinfoStore();

const isPopupOpened = ref(false);

const buttonText = computed(() =>
	props.mySessions
		? t('objects.directory.users.logout.endAllMySessions')
		: t('objects.directory.users.logout.endAllSessions'),
);

const openPopup = () => (isPopupOpened.value = true);
const closePopup = () => (isPopupOpened.value = false);

const logoutUser = async () => {
	await UsersAPI.logoutUser({
		id: props.id,
	});
	closePopup();
	clearStorageNotifications(props.id);
};
</script>

<style lang="scss" scoped>
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
