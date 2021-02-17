<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.ccenter.queues.timing') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-timepicker
        :value="originateTimeout"
        :label="$t('objects.ccenter.queues.originateTimeout')"
        :disabled="disableUserInput"
        @input="setItemPayloadProp({ prop: 'originateTimeout', value: $event })"
      ></wt-timepicker>
      <wt-input
        :value="maxAttempts"
        :label="$t('objects.ccenter.queues.maxAttempts')"
        :disabled="disableUserInput"
        type="number"
        @input="setItemPayloadProp({ prop: 'maxAttempts', value: $event })"
      ></wt-input>
      <wt-timepicker
        :value="waitBetweenRetries"
        :label="$t('objects.ccenter.queues.waitBetweenRetries')"
        :disabled="disableUserInput"
        @input="setItemPayloadProp({ prop: 'waitBetweenRetries', value: $event })"
      ></wt-timepicker>
      <wt-switcher
        :value="recordings"
        :label="$t('objects.ccenter.queues.recordings')"
        :disabled="disableUserInput"
        @change="setItemPayloadProp({ prop: 'recordings', value: $event })"
      ></wt-switcher>
      <wt-switcher
        :value="allowGreetingAgent"
        :label="$t('objects.ccenter.queues.allowGreetingAgent')"
        :disabled="disableUserInput"
        @change="setItemPayloadProp({ prop: 'allowGreetingAgent', value: $event })"
      ></wt-switcher>
      <wt-switcher
        :value="processing"
        :label="$t('objects.ccenter.queues.processing')"
        :disabled="disableUserInput"
        @change="setItemProp({ prop: 'processing', value: $event })"
      ></wt-switcher>
      <wt-input
        v-show="processing"
        :value="processingSec"
        :label="$t('objects.ccenter.queues.processingSec')"
        :disabled="disableUserInput"
        type="number"
        @input="setItemProp({ prop: 'processingSec', value: $event })"
      ></wt-input>
      <wt-input
        v-show="processing"
        :value="processingRenewalSec"
        :label="$t('objects.ccenter.queues.processingRenewalSec')"
        :disabled="disableUserInput"
        type="number"
        @input="setItemProp({ prop: 'processingRenewalSec', value: $event })"
      ></wt-input>
    </form>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import openedTabComponentMixin from '../../../../mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-queue-progressive-dialer-timing',
  mixins: [openedTabComponentMixin],

  computed: {
    ...mapState('ccenter/queues', {
      maxAttempts: (state) => state.itemInstance.payload.maxAttempts,
      originateTimeout: (state) => state.itemInstance.payload.originateTimeout,
      waitBetweenRetries: (state) => state.itemInstance.payload.waitBetweenRetries,
      recordings: (state) => state.itemInstance.payload.recordings,
      allowGreetingAgent: (state) => state.itemInstance.payload.allowGreetingAgent,
      processing: (state) => state.itemInstance.processing,
      processingSec: (state) => state.itemInstance.processingSec,
      processingRenewalSec: (state) => state.itemInstance.processingRenewalSec,
    }),
  },

  methods: {
    ...mapActions('ccenter/queues', {
      setItemProp: 'SET_ITEM_PROPERTY',
      setItemPayloadProp: 'SET_ITEM_PAYLOAD_PROPERTY',
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>
