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
        <wt-input :disabled="disableUserInput" :label="$t('objects.ccenter.queues.maxNumberOfWords')"
          :value="itemInstance.payload.amd.maxNumberOfWords" type="number"
          @input="setAmdItemProp({ prop: 'maxNumberOfWords', value: +$event })" />
        <wt-input :disabled="disableUserInput" :label="$t('objects.ccenter.queues.betweenWordsSilence')"
          :value="itemInstance.payload.amd.betweenWordsSilence" type="number"
          @input="setAmdItemProp({ prop: 'betweenWordsSilence', value: + $event })" />
        <wt-input :disabled="disableUserInput" :label="$t('objects.ccenter.queues.maxWordLength')"
          :value="itemInstance.payload.amd.maxWordLength" type="number"
          @input="setAmdItemProp({ prop: 'maxWordLength', value: +$event })" />
        <wt-input :disabled="disableUserInput" :label="$t('objects.ccenter.queues.minWordLength')"
          :value="itemInstance.payload.amd.minWordLength" type="number"
          @input="setAmdItemProp({ prop: 'minWordLength', value: +$event })" />
        <wt-input :disabled="disableUserInput" :label="$t('objects.ccenter.queues.totalAnalysisTime')"
          :value="itemInstance.payload.amd.totalAnalysisTime" type="number"
          @input="setAmdItemProp({ prop: 'totalAnalysisTime', value: +$event })" />
        <wt-input :disabled="disableUserInput" :label="$t('objects.ccenter.queues.silenceThreshold')"
          :value="itemInstance.payload.amd.silenceThreshold" type="number"
          @input="setAmdItemProp({ prop: 'silenceThreshold', value: +$event })" />
        <wt-input :disabled="disableUserInput" :label="$t('objects.ccenter.queues.afterGreetingSilence')"
          :value="itemInstance.payload.amd.afterGreetingSilence" type="number"
          @input="setAmdItemProp({ prop: 'afterGreetingSilence', value: +$event })" />
        <wt-input :disabled="disableUserInput" :label="$t('objects.ccenter.queues.greeting')"
          :value="itemInstance.payload.amd.greeting" type="number"
          @input="setAmdItemProp({ prop: 'greeting', value: +$event })" />
        <wt-input :disabled="disableUserInput" :label="$t('objects.ccenter.queues.initialSilence')"
          :value="itemInstance.payload.amd.initialSilence" type="number"
          @input="setAmdItemProp({ prop: 'initialSilence', value: +$event })" />
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
