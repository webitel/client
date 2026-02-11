<template>
  <div class="logout-action">
    <div class="logout-action__title-wrapper">
      <p>{{ t('settings.security.logoutTitle' )}}</p>
      <wt-button
        v-tooltip="t('objects.directory.users.logout.tooltip')"
        :disabled="disabled"
        color="error"
        @click="openPopup"
      >
        {{ buttonText }}
      </wt-button>
    </div>

    <wt-popup
      :shown="isOpened"
      :size="ComponentSize.SM"
      overflow
      @close="closePopup"
    >
      <template #title>
        {{ t('objects.directory.users.logout.endSessionConfirmation') }}
      </template>
      <template #main>
        <div class="logout-action__wrapper">
          {{ t('objects.directory.users.logout.endSessionConfirmationText')}}
        </div>
      </template>

      <template #actions>
        <wt-button
          color="secondary"
          @click="closePopup"
        >
          {{ t('vocabulary.no') }}
        </wt-button>
        <wt-button
          color="error"
          @click="logoutUser"
        >
          {{ t('vocabulary.yes') }}
        </wt-button>
      </template>
    </wt-popup>
  </div>
</template>

<script setup lang="ts">
import { ComponentSize } from '@webitel/ui-sdk/enums';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import UsersAPI from '../../directory/modules/users/api/users';

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

const isOpened = ref(false);

const buttonText = computed(() =>
	props.mySessions
		? t('objects.directory.users.logout.endAllMySessions')
		: t('objects.directory.users.logout.endAllSessions'),
);

const openPopup = () => (isOpened.value = true);
const closePopup = () => (isOpened.value = false);

const logoutUser = async () => {
	await UsersAPI.logoutUser({
		id: props.id,
	});
	closePopup();
};
</script>

<style lang="scss" scoped>
.logout-action__title-wrapper {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: var(--spacing-xs);
}

.logout-action__wrapper {
  display: flex;
  justify-content: center;
  padding: var(--spacing-lg);
}
</style>
