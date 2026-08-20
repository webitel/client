<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ t('objects.ccenter.queues.amd') }}
      </h3>
    </header>
    <form class="object-input-grid">
      <wt-switcher
        v-model="amd.enabled"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.enabled')"
      />
      <wt-switcher
        v-if="amd.enabled"
        v-model="amd.ai"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.ai')"
      />
      <div
        v-if="!amd.ai && amd.enabled"
        class="amd-content-block"
      >
        <wt-input-number
          v-model="amd.maxNumberOfWords"
          :disabled="disableUserInput"
          :label="t('objects.ccenter.queues.maxNumberOfWords')"
        />
        <wt-input-number
          v-model="amd.betweenWordsSilence"
          :disabled="disableUserInput"
          :label="t('objects.ccenter.queues.betweenWordsSilence')"
        />
        <wt-input-number
          v-model="amd.maxWordLength"
          :disabled="disableUserInput"
          :label="t('objects.ccenter.queues.maxWordLength')"
        />
        <wt-input-number
          v-model="amd.minWordLength"
          :disabled="disableUserInput"
          :label="t('objects.ccenter.queues.minWordLength')"
        />
        <wt-input-number
          v-model="amd.totalAnalysisTime"
          :disabled="disableUserInput"
          :label="t('objects.ccenter.queues.totalAnalysisTime')"
        />
        <wt-input-number
          v-model="amd.silenceThreshold"
          :disabled="disableUserInput"
          :label="t('objects.ccenter.queues.silenceThreshold')"
        />
        <wt-input-number
          v-model="amd.afterGreetingSilence"
          :disabled="disableUserInput"
          :label="t('objects.ccenter.queues.afterGreetingSilence')"
        />
        <wt-input-number
          v-model="amd.greeting"
          :disabled="disableUserInput"
          :label="t('objects.ccenter.queues.greeting')"
        />
        <wt-input-number
          v-model="amd.initialSilence"
          :disabled="disableUserInput"
          :label="t('objects.ccenter.queues.initialSilence')"
        />
        <div />
        <wt-switcher
          v-model="amd.allowNotSure"
          :disabled="disableUserInput"
          :label="t('objects.ccenter.queues.allowNotSure')"
        />
        <wt-switcher
          v-if="amd.allowNotSure"
          v-model="amd.silenceNotSure"
          :disabled="disableUserInput"
          :label="t('objects.ccenter.queues.silenceNotSure')"
        />
      </div>
      <div
        v-else-if="amd.enabled"
        class="amd-content-block"
      >
        <wt-multi-select
          v-model="amd.positive"
          :data-key="null"
          :disabled="disableUserInput"
          :label="t('objects.ccenter.queues.positiveLabels')"
          :options="amdAiLabels"
          allow-custom-values
          chips-view
        />
        <wt-single-select
          v-model="amd.playback"
          :disabled="disableUserInput"
          :label="t('objects.ccenter.queues.aiPlayback')"
          :search-method="MediaAPI.getLookup"
        />
      </div>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import MediaAPI from '../../../../../../lookups/modules/media/api/media';
import AmdAiLabels from '../../../enums/AmdAiLabels.enum';
import type { Queue } from '../../../types/Queue';

const modelValue = defineModel<Queue>({
	required: true,
});

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();

const amdAiLabels = [
	...AmdAiLabels,
];

/**
 * Only the three queue types that show this tab seed `payload.amd`, so the
 * container is created on demand rather than assumed.
 */
const amd = computed<Record<string, unknown>>(() => {
	if (!modelValue.value.payload) modelValue.value.payload = {};
	if (!modelValue.value.payload.amd) modelValue.value.payload.amd = {};
	return modelValue.value.payload.amd as Record<string, unknown>;
});
</script>

<style
  lang="scss"
  scoped
>
.amd-content-block {
  display: contents;
}
</style>
