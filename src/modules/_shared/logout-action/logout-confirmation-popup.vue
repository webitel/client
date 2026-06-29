<template>
  <wt-popup
    :shown="isPopupOpened"
    :size="ComponentSize.SM"
    overflow
    @close="closePopup"
  >
    <template #title>
      {{ t('objects.directory.users.logout.endSessionConfirmation') }}
    </template>
    <template #main>
      <div class="logout-action__wrapper">
        {{ logoutMessage }}
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
        @click="logout"
      >
        {{ t('vocabulary.yes') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { ComponentSize } from '@webitel/ui-sdk/enums';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
	isPopupOpened: boolean;
	logoutMessage: string;
}>();

const emit = defineEmits<{
	(e: 'update:isPopupOpened', value: boolean): void;
	(e: 'logout'): void;
}>();

const { t } = useI18n();

const closePopup = () => {
	emit('update:isPopupOpened', false);
};

const logout = async () => {
	emit('logout');
	closePopup();
};
</script>

<style scoped>
.logout-action__wrapper {
  display: flex;
  justify-content: center;
  padding: var(--spacing-lg);
}
</style>