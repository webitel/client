<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.ccenter.queues.amd') }}
      </h3>
    </header>
    <form class="object-input-grid">
      <wt-switcher :disabled="disableUserInput" :label="$t('objects.ccenter.queues.enabled')"
        :model-value="itemInstance.payload.amd.enabled"
        @update:model-value="setAmdItemProp({ prop: 'enabled', value: $event })" />
      <wt-switcher v-if="itemInstance.payload.amd.enabled" :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.ai')" :model-value="itemInstance.payload.amd.ai"
        @update:model-value="setAmdItemProp({ prop: 'ai', value: $event })" />
      <div v-if="!itemInstance.payload.amd.ai && itemInstance.payload.amd.enabled" class="amd-content-block">
        <wt-input-number :disabled="disableUserInput" :label="$t('objects.ccenter.queues.maxNumberOfWords')"
          :model-value="itemInstance.payload.amd.maxNumberOfWords"
          @update:model-value="setAmdItemProp({ prop: 'maxNumberOfWords', value: +$event })" />
        <wt-input-number :disabled="disableUserInput" :label="$t('objects.ccenter.queues.betweenWordsSilence')"
          :model-value="itemInstance.payload.amd.betweenWordsSilence"
          @update:model-value="setAmdItemProp({ prop: 'betweenWordsSilence', value: + $event })" />
        <wt-input-number :disabled="disableUserInput" :label="$t('objects.ccenter.queues.maxWordLength')"
          :model-value="itemInstance.payload.amd.maxWordLength"
          @update:model-value="setAmdItemProp({ prop: 'maxWordLength', value: +$event })" />
        <wt-input-number :disabled="disableUserInput" :label="$t('objects.ccenter.queues.minWordLength')"
          :model-value="itemInstance.payload.amd.minWordLength"
          @update:model-value="setAmdItemProp({ prop: 'minWordLength', value: +$event })" />
        <wt-input-number :disabled="disableUserInput" :label="$t('objects.ccenter.queues.totalAnalysisTime')"
          :model-value="itemInstance.payload.amd.totalAnalysisTime"
          @update:model-value="setAmdItemProp({ prop: 'totalAnalysisTime', value: +$event })" />
        <wt-input-number :disabled="disableUserInput" :label="$t('objects.ccenter.queues.silenceThreshold')"
          :model-value="itemInstance.payload.amd.silenceThreshold"
          @update:model-value="setAmdItemProp({ prop: 'silenceThreshold', value: +$event })" />
        <wt-input-number :disabled="disableUserInput" :label="$t('objects.ccenter.queues.afterGreetingSilence')"
          :model-value="itemInstance.payload.amd.afterGreetingSilence"
          @update:model-value="setAmdItemProp({ prop: 'afterGreetingSilence', value: +$event })" />
        <wt-input-number :disabled="disableUserInput" :label="$t('objects.ccenter.queues.greeting')"
          :model-value="itemInstance.payload.amd.greeting"
          @update:model-value="setAmdItemProp({ prop: 'greeting', value: +$event })" />
        <wt-input-number :disabled="disableUserInput" :label="$t('objects.ccenter.queues.initialSilence')"
          :model-value="itemInstance.payload.amd.initialSilence"
          @update:model-value="setAmdItemProp({ prop: 'initialSilence', value: +$event })" />
        <div />
        <wt-switcher :disabled="disableUserInput" :label="$t('objects.ccenter.queues.allowNotSure')"
          :model-value="itemInstance.payload.amd.allowNotSure"
          @update:model-value="setAmdItemProp({ prop: 'allowNotSure', value: $event })" />
        <wt-switcher v-if="itemInstance.payload.amd.allowNotSure" :disabled="disableUserInput"
          :label="$t('objects.ccenter.queues.silenceNotSure')" :model-value="itemInstance.payload.amd.silenceNotSure"
          @update:model-value="setAmdItemProp({ prop: 'silenceNotSure', value: $event })" />
      </div>
      <div v-else-if="itemInstance.payload.amd.enabled" class="amd-content-block">
        <wt-tags-input :disabled="disableUserInput" :label="$t('objects.ccenter.queues.positiveLabels')"
          :options="AmdAiLabels" :value="itemInstance.payload.amd.positive" taggable
          @input="setAmdItemProp({ prop: 'positive', value: $event })" />
        <wt-select :clearable="true" :disabled="disableUserInput" :label="$t('objects.ccenter.queues.aiPlayback')"
          :search-method="loadDropdownOptionsMediaList" :value="itemInstance.payload.amd.playback"
          @input="setAmdItemProp({ prop: 'playback', value: $event })" />
      </div>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

import openedTabComponentMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import MediaAPI from '../../../../../../lookups/modules/media/api/media';
import AmdAiLabels from '../../../enums/AmdAiLabels.enum';

export default {
  name: 'OpenedQueueAmd',
  mixins: [openedTabComponentMixin],
  data() {
    return {
      AmdAiLabels: [...AmdAiLabels],
    };
  },
  methods: {
    ...mapActions({
      setAmdItemProp(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_AMD_ITEM_PROPERTY`, payload);
      },
    }),
    loadDropdownOptionsMediaList(params) {
      return MediaAPI.getLookup(params);
    },
  },
};
</script>

<style lang="scss" scoped>
.amd-content-block {
  display: contents;
}
</style>
