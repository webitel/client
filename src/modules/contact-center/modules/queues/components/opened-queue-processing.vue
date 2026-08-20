<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ t('objects.ccenter.queues.processing.processing') }}
      </h3>
    </header>
    <div class="object-input-area-grid">
      <wt-switcher
        v-if="specificControls['taskProcessing.enabled']"
        v-model:model-value="taskProcessing.enabled"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.processing.enabled')"
        class="object-input-area-grid__processing-enabled"
      />

      <wt-single-select
        v-if="specificControls['taskProcessing.formSchema']"
        v-model:model-value="taskProcessing.formSchema"
        :disabled="disableFormSchemaInput"
        :label="t('objects.ccenter.queues.processing.formSchema')"
        :search-method="hasFlowsReadAccess && loadFormSchemaOptions"
        class="object-input-area-grid__form-schema"
      />

      <wt-input-number
        v-if="specificControls['taskProcessing.sec']"
        v-show="isProcessingEnabled"
        v-model:model-value="taskProcessing.sec"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.processing.sec')"
        class="object-input-area-grid__processing-sec"
      />

      <wt-switcher
        v-if="specificControls['taskProcessing.prolongationOptions.enabled']"
        v-show="isProcessingEnabled"
        v-model:model-value="prolongationOptions.enabled"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.processing.allowProlongation')"
        class="object-input-area-grid__processing-allow-prolongation"
      />

      <!-- NB: gated on a prolongationOptions control id, but the value lives at
           the top level of taskProcessing — as it always has -->
      <wt-input-number
        v-if="specificControls['taskProcessing.prolongationOptions.renewalSec']"
        v-show="isProlongationEnabled"
        v-model:model-value="taskProcessing.renewalSec"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.processing.renewalSec')"
        class="object-input-area-grid__processing-renewal-sec"
      />

      <wt-input-number
        v-if="specificControls['taskProcessing.prolongationOptions.repeatsNumber']"
        v-show="isProlongationEnabled"
        v-model:model-value="prolongationOptions.repeatsNumber"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.processing.repeatsNumber')"
        :min="1"
        class="object-input-area-grid__processing-repeat-numbers"
      />

      <wt-input-number
        v-if="specificControls['taskProcessing.prolongationOptions.prolongationTimeSec']"
        v-show="isProlongationEnabled"
        v-model:model-value="prolongationOptions.prolongationTimeSec"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.processing.prolongationTimeSec')"
        :min="1"
        class="object-input-area-grid__processing-prolongation-time"
      />

      <wt-switcher
        v-if="specificControls['taskProcessing.prolongationOptions.isTimeoutRetry']"
        v-show="isProlongationEnabled"
        v-model:model-value="prolongationOptions.isTimeoutRetry"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.processing.isTimeoutRetry')"
        class="object-input-area-grid__processing-timeout-retry"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { WtObject } from '@webitel/ui-sdk/enums';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { EngineRoutingSchemaType } from 'webitel-sdk';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import FlowsAPI from '../../../../routing/modules/flow/api/flow';
import { useQueueTypeControls } from '../composables/useQueueTypeControls';
import type { Queue } from '../types/Queue';

const modelValue = defineModel<Queue>({
	required: true,
});

const { t } = useI18n();

const { disableUserInput } = useUserAccessControl();
const { hasReadAccess: hasFlowsReadAccess } = useUserAccessControl(
	WtObject.Flow,
);

const { specificControls } = useQueueTypeControls(
	() => modelValue.value?.type as number | undefined,
);

const taskProcessing = computed<Record<string, unknown>>(() => {
	if (!modelValue.value.taskProcessing) modelValue.value.taskProcessing = {};
	return modelValue.value.taskProcessing as Record<string, unknown>;
});

const prolongationOptions = computed<Record<string, unknown>>(() => {
	if (!taskProcessing.value.prolongationOptions) {
		taskProcessing.value.prolongationOptions = {};
	}
	return taskProcessing.value.prolongationOptions as Record<string, unknown>;
});

const isProcessingEnabled = computed(() => !!taskProcessing.value.enabled);

const isProlongationEnabled = computed(
	() => isProcessingEnabled.value && !!prolongationOptions.value.enabled,
);

const disableFormSchemaInput = computed(
	() =>
		disableUserInput.value ||
		!isProcessingEnabled.value ||
		!hasFlowsReadAccess.value,
);

/**
 * Turning prolongation on for the first time also turns on the timeout retry,
 * so that switcher starts in the state users expect.
 * https://webitel.atlassian.net/browse/WTEL-8174?focusedCommentId=709374
 */
watch(
	() => prolongationOptions.value.enabled,
	(enabled, wasEnabled) => {
		if (enabled && !wasEnabled) {
			prolongationOptions.value.isTimeoutRetry = true;
		}
	},
);

const loadFormSchemaOptions = (params: object) =>
	FlowsAPI.getLookup({
		...params,
		type: [
			EngineRoutingSchemaType.Processing,
			EngineRoutingSchemaType.Default,
		],
	});
</script>

<style
  lang="scss"
  scoped
>
.object-input-area-grid {
  display: grid;
  grid-template-areas:
    'processingEnabled formSchema'
    'sec .'
    'allowProlongation .'
    'renewalSec .'
    'repeatNumbers .'
    'prolongationTime .'
    'timeoutRetry .'
  ;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;

  &__processing-enabled {
    grid-area: processingEnabled;
  }

  &__form-schema {
    grid-area: formSchema;
  }

  &__processing-sec {
    grid-area: sec;
  }

  &__processing-renewal-sec {
    grid-area: renewalSec;
  }

  &__processing-allow-prolongation {
    grid-area: allowProlongation;
  }

  &__processing-repeat-numbers {
    grid-area: repeatNumbers;
  }

  &__processing-prolongation-time {
    grid-area: prolongationTime;
  }

  &__processing-timeout-retry {
    grid-area: timeoutRetry;
  }
}
</style>
