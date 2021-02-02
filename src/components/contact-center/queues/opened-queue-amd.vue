<template>
  <section>
    <form class="object-input-grid">
      <wt-switcher
        :value="enabled"
        :label="$t('objects.ccenter.queues.enabled')"
        @change="setAmdItemProp({ prop: 'enabled', value: $event })"
      ></wt-switcher>
      <wt-input
        :value="maxNumberOfWords"
        :label="$t('objects.ccenter.queues.maxNumberOfWords')"
        type="number"
        @input="setAmdItemProp({ prop: 'maxNumberOfWords', value: +$event })"
      ></wt-input>
      <wt-input
        :value="betweenWordsSilence"
        :label="$t('objects.ccenter.queues.betweenWordsSilence')"
        type="number"
        @input="setAmdItemProp({ prop: 'betweenWordsSilence', value:+ $event })"
      ></wt-input>
      <wt-input
        :value="maxWordLength"
        :label="$t('objects.ccenter.queues.maxWordLength')"
        type="number"
        @input="setAmdItemProp({ prop: 'maxWordLength', value: +$event })"
      ></wt-input>
      <wt-input
        :value="minWordLength"
        :label="$t('objects.ccenter.queues.minWordLength')"
        type="number"
        @input="setAmdItemProp({ prop: 'minWordLength', value: +$event })"
      ></wt-input>
      <wt-input
        :value="totalAnalysisTime"
        :label="$t('objects.ccenter.queues.totalAnalysisTime')"
        type="number"
        @input="setAmdItemProp({ prop: 'totalAnalysisTime', value: +$event })"
      ></wt-input>
      <wt-input
        :value="silenceThreshold"
        :label="$t('objects.ccenter.queues.silenceThreshold')"
        type="number"
        @input="setAmdItemProp({ prop: 'silenceThreshold', value: +$event })"
      ></wt-input>
      <wt-input
        :value="afterGreetingSilence"
        :label="$t('objects.ccenter.queues.afterGreetingSilence')"
        type="number"
        @input="setAmdItemProp({ prop: 'afterGreetingSilence', value: +$event })"
      ></wt-input>
      <wt-input
        :value="greeting"
        :label="$t('objects.ccenter.queues.greeting')"
        type="number"
        @input="setAmdItemProp({ prop: 'greeting', value: +$event })"
      ></wt-input>
      <wt-input
        :value="initialSilence"
        :label="$t('objects.ccenter.queues.initialSilence')"
        type="number"
        @input="setAmdItemProp({ prop: 'initialSilence', value: +$event })"
      ></wt-input>
      <wt-switcher
        :value="allowNotSure"
        :label="$t('objects.ccenter.queues.allowNotSure')"
        @change="setAmdItemProp({ prop: 'allowNotSure', value: $event })"
      ></wt-switcher>
    </form>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import openedTabComponentMixin from '../../../mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-queue-outbound-ivr-timing',
  mixins: [openedTabComponentMixin],

  computed: {
    ...mapState('ccenter/queues', {
      enabled: (state) => state.itemInstance.payload.amd.enabled,
      maxNumberOfWords: (state) => state.itemInstance.payload.amd.maxNumberOfWords,
      betweenWordsSilence: (state) => state.itemInstance.payload.amd.betweenWordsSilence,
      maxWordLength: (state) => state.itemInstance.payload.amd.maxWordLength,
      minWordLength: (state) => state.itemInstance.payload.amd.minWordLength,
      totalAnalysisTime: (state) => state.itemInstance.payload.amd.totalAnalysisTime,
      silenceThreshold: (state) => state.itemInstance.payload.amd.silenceThreshold,
      afterGreetingSilence: (state) => state.itemInstance.payload.amd.afterGreetingSilence,
      greeting: (state) => state.itemInstance.payload.amd.greeting,
      initialSilence: (state) => state.itemInstance.payload.amd.initialSilence,
      allowNotSure: (state) => state.itemInstance.payload.amd.allowNotSure,
    }),
  },

  methods: {
    ...mapActions('ccenter/queues', {
      setAmdItemProp: 'SET_AMD_ITEM_PROPERTY',
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>
