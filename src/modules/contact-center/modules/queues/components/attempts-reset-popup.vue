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
        <wt-select
          disabled
          :value="selectedAttemptTypeOption"
          :options="attemptsResetTypesOptions"
          :label="t('objects.ccenter.queues.attemptsReset.attemptType')"
          :placeholder="t('objects.ccenter.queues.attemptsReset.attemptType')"
          track-by="value"
          @input="attemptTypeInputHandler"
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
import { computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import { AttemptsResetTypeEnum } from '../enums/AttemptsResetType.enum';

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

const attemptsResetTypesOptions = computed(() => {
	return Object.values(AttemptsResetTypeEnum).map((type) => ({
		value: type,
		locale: `objects.ccenter.queues.attemptsReset.${type}`,
	}));
});

const resetAttemptsForm = reactive<ResetAttemptsFormType>({
	attemptType: [
		AttemptsResetTypeEnum.CALLS,
	],
	idleForMinutes: 1,
	result: 'Error',
});

const selectedAttemptTypeOption = computed(() =>
	attemptsResetTypesOptions.value.find(
		(option) => option.value === resetAttemptsForm.attemptType[0],
	),
);

function attemptTypeInputHandler(option: { value: string; locale: string }) {
	resetAttemptsForm.attemptType = [
		option.value,
	];
}

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
