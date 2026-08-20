<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ t('objects.ccenter.queues.params') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-timepicker
        v-if="specificControls.originateTimeout"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.originateTimeout')"
        :model-value="payload.originateTimeout"
        :regle-validation="payloadValidation?.originateTimeout"
        no-max-hours
        @update:model-value="payload.originateTimeout = +$event"
      />
      <wt-timepicker
        v-if="specificControls.maxWaitTime"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.maxWaitTime')"
        :model-value="payload.maxWaitTime"
        :regle-validation="payloadValidation?.maxWaitTime"
        no-max-hours
        @update:model-value="payload.maxWaitTime = +$event"
      />
      <wt-timepicker
        v-if="specificControls.discardAbandonedAfter"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.discardAbandonedAfter')"
        :model-value="payload.discardAbandonedAfter"
        :regle-validation="payloadValidation?.discardAbandonedAfter"
        no-max-hours
        @update:model-value="payload.discardAbandonedAfter = +$event"
      />
      <wt-timepicker
        v-if="specificControls.maxIdleAgent"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.maxIdleAgent')"
        :model-value="payload.maxIdleAgent"
        no-max-hours
        @update:model-value="payload.maxIdleAgent = +$event"
      />
      <wt-timepicker
        v-if="specificControls.maxIdleClient"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.maxIdleClient')"
        :model-value="payload.maxIdleClient"
        no-max-hours
        @update:model-value="payload.maxIdleClient = +$event"
      />
      <wt-timepicker
        v-if="specificControls.maxIdleDialog"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.maxIdleDialog')"
        :model-value="payload.maxIdleDialog"
        no-max-hours
        @update:model-value="payload.maxIdleDialog = +$event"
      />
      <wt-timepicker
        v-if="specificControls.waitBetweenRetries"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.waitBetweenRetries')"
        :model-value="payload.waitBetweenRetries"
        :regle-validation="payloadValidation?.waitBetweenRetries"
        no-max-hours
        @update:model-value="payload.waitBetweenRetries = +$event"
      />
      <wt-timepicker
        v-if="specificControls.minDuration"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.minDuration')"
        :model-value="payload.minDuration"
        :regle-validation="payloadValidation?.minDuration"
        no-max-hours
        @update:model-value="payload.minDuration = +$event"
      />
      <wt-single-select
        v-if="specificControls.statisticTime"
        v-model="payload.statisticTime"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.statisticTime')"
        :options="statisticTimeOptions"
        :show-clear="false"
        data-key="value"
        option-value="value"
      />
      <wt-input-number
        v-if="specificControls.maxCalls"
        v-model="payload.maxCalls"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.maxCalls')"
        :label-props="{ hint: t('objects.ccenter.queues.maxCallsHint') }"
      />
      <wt-input-number
        v-if="specificControls.minAttempts"
        v-model="payload.minAttempts"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.minAttempts')"
      />
      <wt-input-number
        v-if="specificControls.maxAttempts"
        v-model="payload.maxAttempts"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.maxAttempts')"
        :regle-validation="payloadValidation?.maxAttempts"
        :required="isFieldRequired('payload.maxAttempts')"
      />
      <wt-input-number
        v-if="specificControls.maxAgentLine"
        v-model="payload.maxAgentLine"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.maxAgentLine')"
      />
      <wt-input-number
        v-if="specificControls.dialingRate"
        v-model="payload.dialingRate"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.dialingRate')"
      />
      <wt-input-number
        v-if="specificControls.maxAgentLose"
        v-model="payload.maxAgentLose"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.maxAgentLose')"
      />
      <wt-input-number
        v-if="specificControls.playbackSilence"
        v-model="payload.playbackSilence"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.playbackSilence')"
      />
      <wt-input-number
        v-if="specificControls.abandonRateAdjustment"
        v-model="payload.abandonRateAdjustment"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.abandonRateAdjustment')"
      />
      <wt-single-select
        v-if="specificControls.autoAnswerTone"
        v-model="autoAnswerTone"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.autoAnswerTone')"
        :options="ToneList"
        data-key="value"
      />
      <wt-input-number
        v-if="specificControls.maxWaitingSize"
        v-model="payload.maxWaitingSize"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.maxWaitingSize')"
      />
      <wt-input-number
        v-if="specificControls.targetAbandonedRate"
        v-model="payload.targetAbandonedRate"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.targetAbandonedRate')"
      />
      <wt-input-number
        v-if="specificControls.minOnlineAgents"
        v-model="payload.minOnlineAgents"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.minOnlineAgents')"
        :regle-validation="payloadValidation?.minOnlineAgents"
      />
      <wt-input-number
        v-if="specificControls.maxAbandonedRate"
        v-model="payload.maxAbandonedRate"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.maxAbandonedRate')"
      />
      <wt-input-number
        v-if="specificControls.maxMemberLimit"
        v-model="payload.maxMemberLimit"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.maxMemberLimit')"
      />
      <wt-input-number
        v-if="specificControls.progressiveCount"
        v-model="payload.progressiveCount"
        :disabled="disableUserInput"
        :label="t('objects.queue.progressiveCount')"
        :regle-validation="payloadValidation?.progressiveCount"
        required
      />
      <wt-switcher
        v-if="specificControls.waitBetweenRetriesDesc"
        v-model="payload.waitBetweenRetriesDesc"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.waitBetweenRetriesDesc')"
      />
      <div v-if="specificControls.loadFactor">
        <wt-label>{{ t('objects.ccenter.queues.loadFactor') }}</wt-label>
        <div class="load-factor">
          <wt-slider
            :max="100"
            :min="1"
            :model-value="payload.loadFactor"
            :step="1"
            @update:model-value="payload.loadFactor = +$event"
          />
          <wt-input-number
            v-model="payload.loadFactor"
            :max="100"
            :min="0"
          />
        </div>
      </div>
      <wt-switcher
        v-if="specificControls.strictCircuit"
        v-model="payload.strictCircuit"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.strictCircuit')"
      />
      <wt-switcher
        v-if="specificControls.perNumbers"
        v-model="payload.perNumbers"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.perNumbers')"
      />
      <wt-switcher
        v-if="specificControls.retryAbandoned"
        v-model="payload.retryAbandoned"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.retryAbandoned')"
      />
      <wt-switcher
        v-if="specificControls.recordings && payload.recordings"
        v-model="payload.recordAll"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.recordAll')"
      />
      <wt-switcher
        v-if="specificControls.recordings"
        v-model="payload.recordings"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.recordings')"
      />
      <wt-switcher
        v-if="specificControls.allowGreetingAgent"
        v-model="payload.allowGreetingAgent"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.allowGreetingAgent')"
      />
      <wt-switcher
        v-if="specificControls.endless"
        v-show="!modelValue.processing"
        v-model="payload.endless"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.endless')"
      />
      <wt-switcher
        v-if="specificControls.stickyAgent"
        v-model="modelValue.stickyAgent"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.stickyAgent')"
      />
      <wt-input-number
        v-if="specificControls.stickyAgentSec"
        v-show="modelValue.stickyAgent"
        v-model="payload.stickyAgentSec"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.stickyAgentSec')"
      />
      <wt-switcher
        v-if="specificControls.stickyIgnoreStatus"
        v-show="modelValue.stickyAgent"
        v-model="payload.stickyIgnoreStatus"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.stickyIgnoreStatus')"
      />
      <wt-switcher
        v-if="specificControls.ignoreCalendar"
        v-model="payload.ignoreCalendar"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.ignoreCalendar')"
      />
      <wt-switcher
        v-if="specificControls.manualDistribution"
        v-model="payload.manualDistribution"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.manualDistribution')"
      />
      <wt-switcher
        v-if="specificControls.lastMessageTimeout"
        v-model="payload.lastMessageTimeout"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.lastMessageTimeout')"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { QueueType } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import { useQueueTypeControls } from '../composables/useQueueTypeControls';
import StatisticTimeList from '../lookups/StatisticTime.lookup';
import { type Tone, ToneList, type ToneValue } from '../lookups/Tone.lookup';
import type { Queue } from '../types/Queue';

const modelValue = defineModel<Queue>({
	required: true,
});

const props = defineProps<{
	// biome-ignore lint/suspicious/noExplicitAny: regle's field status shape
	validationFields?: Record<string, any>;
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();

const { specificControls, isFieldRequired } = useQueueTypeControls(
	() => modelValue.value?.type as number | undefined,
);

/** every control on this tab writes into `payload` */
const payload = computed<Record<string, unknown>>(() => {
	if (!modelValue.value.payload) modelValue.value.payload = {};
	return modelValue.value.payload as Record<string, unknown>;
});

/** regle nests: a field under `payload` lives in that group's `$fields` */
const payloadValidation = computed(
	() => props.validationFields?.payload?.$fields,
);

const statisticTimeOptions = computed(() =>
	StatisticTimeList.map(({ name, value }) => ({
		value,
		name: t(`reusable.time.${name}`),
	})),
);

/**
 * Inbound and the two auto-dialers fall back to the default alert tone when
 * none is stored. https://my.webitel.com/browse/WTEL-3268
 */
const toneDefaultingTypes: number[] = [
	QueueType.INBOUND_QUEUE,
	QueueType.PROGRESSIVE_DIALER,
	QueueType.PREDICTIVE_DIALER,
];

const autoAnswerTone = computed<Tone | undefined>({
	get: () => {
		const stored = payload.value.autoAnswerTone as ToneValue | undefined;
		if (stored) return ToneList.find((tone) => tone.value === stored);
		if (toneDefaultingTypes.includes(modelValue.value?.type as number)) {
			return ToneList.find((tone) => tone.value === 'default');
		}
		return undefined;
	},
	set: (option) => {
		payload.value.autoAnswerTone = option?.value;
	},
});
</script>

<style
  lang="scss"
  scoped
>
.load-factor {
  display: grid;
  align-items: center;
  grid-template-columns: 5fr 1fr;
  gap: var(--spacing-sm);

  .wt-slider {
    height: auto;
  }
}
</style>
