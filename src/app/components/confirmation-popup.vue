<template>
  <wt-popup
    v-if="shown"
    class="confirmation-popup"
    size="sm"
    @close="emit('close')"
  >
    <template #title>
      {{ title ?? t('objects.ccenter.globalStateConfirmation.title') }}
    </template>
    <template #main>
      <div class="confirmation-popup__main">
        <wt-icon
          icon="attention"
          color="error"
        />
        <p>{{ description ?? t('objects.ccenter.globalStateConfirmation.message', { count: affectedCount }) }}</p>
      </div>
    </template>
    <template #actions>
      <wt-button
        :color="confirmColor"
        :loading="loading"
        @click="emit('confirm')"
      >
        {{ t('vocabulary.yes') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="emit('close')"
      >
        {{ t('vocabulary.no') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { ButtonColor } from '@webitel/ui-sdk/enums';
import { useI18n } from 'vue-i18n';

interface Props {
	title?: string | null;
	description?: string | null;
	shown?: boolean;
	affectedCount?: number;
	/** [Claude] spinner on "yes" while the confirmed action runs */
	loading?: boolean;
	confirmColor?: ButtonColor;
}

withDefaults(defineProps<Props>(), {
	shown: false,
	affectedCount: 0,
	title: null,
	description: null,
	loading: false,
	confirmColor: ButtonColor.PRIMARY,
});

const emit = defineEmits<{
	(e: 'close'): void;
	(e: 'confirm'): void;
}>();

const { t } = useI18n();
</script>

<style scoped>
.confirmation-popup__main {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.confirmation-popup__main .wt-icon {
  margin-bottom: var(--spacing-sm);
}
</style>

