<template>
  <wt-popup
    v-if="shown"
    class="global-state-confirmation-popup"
    size="sm"
    @close="handleClose"
  >
    <template #title>
      {{ t('objects.ccenter.queues.globalStateConfirmation.title') }}
    </template>
    <template #main>
      <div class="global-state-confirmation-popup__main">
        <wt-icon
          icon="attention"
          color="error"
        />
        <p>{{ t('objects.ccenter.queues.globalStateConfirmation.message', { count: affectedQueuesCount }) }}</p>
      </div>
    </template>
    <template #actions>
      <wt-button
        @click="handleConfirm"
      >
        {{ t('vocabulary.yes') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="handleClose"
      >
        {{ t('vocabulary.no') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

interface Props {
  shown?: boolean;
  affectedQueuesCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
  shown: false,
  affectedQueuesCount: 0,
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'confirm'): void;
}>();

const { t } = useI18n();

function handleConfirm() {
  emit('confirm');
}

function handleClose() {
  emit('close');
}
</script>

<style lang="scss" scoped>
.global-state-confirmation-popup__main {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .wt-icon {
    margin-bottom: var(--spacing-sm);
  }
}
</style>

