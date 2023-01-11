<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.ccenter.queues.amd') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-switcher
        :value="itemInstance.payload.amd.enabled"
        :label="$t('objects.ccenter.queues.enabled')"
        :disabled="disableUserInput"
        @change="setAmdItemProp({ prop: 'enabled', value: $event })"
      ></wt-switcher>
      <wt-switcher
        v-if="itemInstance.payload.amd.enabled"
        :value="itemInstance.payload.amd.ai"
        :label="$t('objects.ccenter.queues.ai')"
        :disabled="disableUserInput"
        @change="setAmdItemProp({ prop: 'ai', value: $event })"
      ></wt-switcher>
      <div class="amd-content-block"
           v-if="!itemInstance.payload.amd.ai && itemInstance.payload.amd.enabled">
        <wt-input
          :value="itemInstance.payload.amd.maxNumberOfWords"
          :label="$t('objects.ccenter.queues.maxNumberOfWords')"
          :disabled="disableUserInput"
          type="number"
          @input="setAmdItemProp({ prop: 'maxNumberOfWords', value: +$event })"
        ></wt-input>
        <wt-input
          :value="itemInstance.payload.amd.betweenWordsSilence"
          :label="$t('objects.ccenter.queues.betweenWordsSilence')"
          :disabled="disableUserInput"
          type="number"
          @input="setAmdItemProp({ prop: 'betweenWordsSilence', value:+ $event })"
        ></wt-input>
        <wt-input
          :value="itemInstance.payload.amd.maxWordLength"
          :label="$t('objects.ccenter.queues.maxWordLength')"
          :disabled="disableUserInput"
          type="number"
          @input="setAmdItemProp({ prop: 'maxWordLength', value: +$event })"
        ></wt-input>
        <wt-input
          :value="itemInstance.payload.amd.minWordLength"
          :label="$t('objects.ccenter.queues.minWordLength')"
          :disabled="disableUserInput"
          type="number"
          @input="setAmdItemProp({ prop: 'minWordLength', value: +$event })"
        ></wt-input>
        <wt-input
          :value="itemInstance.payload.amd.totalAnalysisTime"
          :label="$t('objects.ccenter.queues.totalAnalysisTime')"
          :disabled="disableUserInput"
          type="number"
          @input="setAmdItemProp({ prop: 'totalAnalysisTime', value: +$event })"
        ></wt-input>
        <wt-input
          :value="itemInstance.payload.amd.silenceThreshold"
          :label="$t('objects.ccenter.queues.silenceThreshold')"
          :disabled="disableUserInput"
          type="number"
          @input="setAmdItemProp({ prop: 'silenceThreshold', value: +$event })"
        ></wt-input>
        <wt-input
          :value="itemInstance.payload.amd.afterGreetingSilence"
          :label="$t('objects.ccenter.queues.afterGreetingSilence')"
          :disabled="disableUserInput"
          type="number"
          @input="setAmdItemProp({ prop: 'afterGreetingSilence', value: +$event })"
        ></wt-input>
        <wt-input
          :value="itemInstance.payload.amd.greeting"
          :label="$t('objects.ccenter.queues.greeting')"
          :disabled="disableUserInput"
          type="number"
          @input="setAmdItemProp({ prop: 'greeting', value: +$event })"
        ></wt-input>
        <wt-input
          :value="itemInstance.payload.amd.initialSilence"
          :label="$t('objects.ccenter.queues.initialSilence')"
          :disabled="disableUserInput"
          type="number"
          @input="setAmdItemProp({ prop: 'initialSilence', value: +$event })"
        ></wt-input>
        <div></div>
        <wt-switcher
          :value="itemInstance.payload.amd.allowNotSure"
          :label="$t('objects.ccenter.queues.allowNotSure')"
          :disabled="disableUserInput"
          @change="setAmdItemProp({ prop: 'allowNotSure', value: $event })"
        ></wt-switcher>
        <wt-switcher
          v-if="itemInstance.payload.amd.allowNotSure"
          :value="itemInstance.payload.amd.silenceNotSure"
          :label="$t('objects.ccenter.queues.silenceNotSure')"
          :disabled="disableUserInput"
          @change="setAmdItemProp({ prop: 'silenceNotSure', value: $event })"
        ></wt-switcher>
      </div>
      <div class="amd-content-block" v-else-if="itemInstance.payload.amd.enabled">
        <wt-tags-input
          :label="$tc('objects.ccenter.queues.positiveLabels')"
          :value="itemInstance.payload.amd.positive"
          :options="AmdAiLabels"
          :disabled="disableUserInput"
          taggable
          @input="setAmdItemProp({ prop: 'positive', value: $event })"
        ></wt-tags-input>
        <wt-select
          :clearable="true"
          :disabled="disableUserInput"
          :label="$t('objects.ccenter.queues.aiPlayback')"
          :search-method="loadDropdownOptionsMediaList"
          :value="itemInstance.payload.amd.playback"
          @input="setAmdItemProp({ prop: 'playback', value: $event })"
        ></wt-select>
      </div>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import openedTabComponentMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import AmdAiLabels from '../../../lookups/AmdAiLabels.lookup';
import MediaAPI from '../../../../../../lookups/modules/media/api/media';

export default {
  name: 'opened-queue-amd',
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
