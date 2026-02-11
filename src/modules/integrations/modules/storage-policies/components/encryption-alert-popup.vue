<template>
  <wt-popup
    class="encryption-alert-popup"
    :shown="shown"
    size="sm"
    @close="close"
  >
    <template #title>
      {{ $t('objects.integrations.storagePolicies.encryptionAlertTitle') }}
    </template>
    <template #main>
      <div class="encryption-alert-popup__content">
        <wt-icon
          class="encryption-alert-popup__icon"
          icon="attention"
          color="error"
          size="md"
        />
        <span class="encryption-alert-popup__message">
          {{ message }}
        </span>
      </div>
    </template>
    <template #actions>
      <wt-button
        @click="confirm"
      >
        {{ $t('objects.ok') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
interface Props {
	shown?: boolean;
	message?: string;
}

const props = withDefaults(defineProps<Props>(), {
	shown: false,
	message: '',
});

const emit = defineEmits<{
	(e: 'close'): void;
	(e: 'confirm'): void;
}>();

const close = () => {
	emit('close');
};

const confirm = () => {
	emit('confirm');
};
</script>

<style scoped lang="scss">
.encryption-alert-popup {
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-xs);
  }

  &__message {
    white-space: pre-line;
    text-align: center;
  }
}
</style>
