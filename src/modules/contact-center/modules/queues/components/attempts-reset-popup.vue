<template>
  <wt-popup
    v-bind="$attrs"
    size="sm"
    class="attempts-reset-popup"
    overflow
    @close="close"
  >
    <template #title>
      {{ t('objects.ccenter.queues.attemptsReset.title') }}
    </template>
    <template #main>
      <div class="attempts-reset-popup__main">
        <!-- [Claude] calls is the only attempt type: shown, not chosen -->
        <wt-input-text
          :label="t('objects.ccenter.queues.attemptsReset.attemptType')"
          :model-value="t('objects.ccenter.queues.attemptsReset.calls')"
          disabled
        />
        <wt-input-number
          v-model:model-value="resetAttemptsForm.idleForMinutes"
          :placeholder="t('objects.ccenter.queues.attemptsReset.idleTime')"
          :label="t('objects.ccenter.queues.attemptsReset.idleTime')"
        />
        <wt-input-text
          v-model:model-value="resetAttemptsForm.result"
          :placeholder="t('objects.ccenter.queues.attemptsReset.result')"
          :label="t('objects.ccenter.queues.attemptsReset.result')"
        />
      </div>
    </template>

    <template #actions>
      <wt-button
        @click="reset"
      >
        {{ t('vocabulary.reset') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>

</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

type ResetAttemptsFormType = {
	attemptType: string[];
	idleForMinutes: number;
	result: string;
};

const emit = defineEmits([
	'close',
	'reset',
]);

const { t } = useI18n();

const resetAttemptsForm = reactive<ResetAttemptsFormType>({
	attemptType: [
		'calls',
	],
	idleForMinutes: 1,
	result: 'Error',
});

function reset() {
	emit('reset', resetAttemptsForm);
}

function close() {
	emit('close');
}
</script>

<style scoped lang="scss">
.attempts-reset-popup {
  &__main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }
}

</style>
