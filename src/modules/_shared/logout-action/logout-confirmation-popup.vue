<template>
  <wt-popup
    :shown="shown"
    :size="ComponentSize.SM"
    overflow
    @close="close"
    class='logout-confirmation-popup'
  >
    <template #title>
      {{ t('objects.directory.users.logout.endSessionConfirmation') }}
    </template>
    <template #main>
      <div class="logout-confirmation-popup__message">
        {{ text }}
      </div>
    </template>

    <template #actions>
      <wt-button
        color="secondary"
        @click="close"
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
	shown: boolean;
  text: string;
}>();

const emit = defineEmits<{
  'update:shown': [value: boolean];
  logout: [];
}>();

const { t } = useI18n();

const close = () => {
	emit('update:shown', false);
};

const logout = async () => {
	emit('logout');
  close();
};
</script>

<style scoped>
.logout-confirmation-popup__message {
  display: flex;
  justify-content: center;
  padding: var(--spacing-lg);
}
</style>