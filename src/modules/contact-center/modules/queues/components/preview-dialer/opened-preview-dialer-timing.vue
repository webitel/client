<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.ccenter.queues.timing') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-timepicker
        :value="itemInstance.payload.originateTimeout"
        :v="v.itemInstance.payload.originateTimeout"
        :label="$t('objects.ccenter.queues.originateTimeout')"
        :disabled="disableUserInput"
        @input="setItemPayloadProp({ prop: 'originateTimeout', value: $event })"
      ></wt-timepicker>
      <wt-input
        :value="itemInstance.payload.maxAttempts"
        :label="$t('objects.ccenter.queues.maxAttempts')"
        :disabled="disableUserInput"
        type="number"
        @input="setItemPayloadProp({ prop: 'maxAttempts', value: +$event })"
      ></wt-input>
      <wt-timepicker
        :value="itemInstance.payload.waitBetweenRetries"
        :v="v.itemInstance.payload.waitBetweenRetries"
        :label="$t('objects.ccenter.queues.waitBetweenRetries')"
        :disabled="disableUserInput"
        @input="setItemPayloadProp({ prop: 'waitBetweenRetries', value: +$event })"
      ></wt-timepicker>
      <wt-input
        :value="itemInstance.payload.maxCalls"
        :label="$t('objects.ccenter.queues.maxCalls')"
        :disabled="disableUserInput"
        :label-props="{ hint: $t('objects.ccenter.queues.maxCallsHint') }"
        type="number"
        @input="setItemPayloadProp({ prop: 'maxCalls', value: +$event })"
      ></wt-input>
      <wt-switcher
        :value="itemInstance.payload.waitBetweenRetriesDesc"
        :label="$t('objects.ccenter.queues.waitBetweenRetriesDesc')"
        :disabled="disableUserInput"
        @change="setItemPayloadProp({ prop: 'waitBetweenRetriesDesc', value: $event })"
      ></wt-switcher>
      <wt-switcher
        :value="itemInstance.payload.strictCircuit"
        :label="$t('objects.ccenter.queues.strictCircuit')"
        :disabled="disableUserInput"
        @change="setItemPayloadProp({ prop: 'strictCircuit', value: $event })"
      ></wt-switcher>
      <wt-switcher
        :value="itemInstance.payload.recordings"
        :label="$t('objects.ccenter.queues.recordings')"
        :disabled="disableUserInput"
        @change="setItemPayloadProp({ prop: 'recordings', value: $event })"
      ></wt-switcher>
      <wt-switcher
        :value="itemInstance.payload.perNumbers"
        :label="$t('objects.ccenter.queues.perNumbers')"
        :disabled="disableUserInput"
        @change="setItemPayloadProp({ prop: 'perNumbers', value: $event })"
      ></wt-switcher>
      <wt-switcher
        :value="itemInstance.payload.allowGreetingAgent"
        :label="$t('objects.ccenter.queues.allowGreetingAgent')"
        :disabled="disableUserInput"
        @change="setItemPayloadProp({ prop: 'allowGreetingAgent', value: $event })"
      ></wt-switcher>
      <wt-switcher
        :value="itemInstance.processing"
        :label="$t('objects.ccenter.queues.processing')"
        :disabled="disableUserInput"
        @change="setItemProp({ prop: 'processing', value: $event })"
      ></wt-switcher>
      <wt-input
        v-show="itemInstance.processing"
        :value="itemInstance.processingSec"
        :label="$t('objects.ccenter.queues.processingSec')"
        :disabled="disableUserInput"
        type="number"
        @input="setItemProp({ prop: 'processingSec', value: $event })"
      ></wt-input>
      <wt-input
        v-show="itemInstance.processing"
        :value="itemInstance.processingRenewalSec"
        :label="$t('objects.ccenter.queues.processingRenewalSec')"
        :disabled="disableUserInput"
        type="number"
        @input="setItemProp({ prop: 'processingRenewalSec', value: $event })"
      ></wt-input>
      <wt-switcher
        v-show="!itemInstance.processing"
        :value="itemInstance.payload.endless"
        :label="$t('objects.ccenter.queues.endless')"
        :disabled="disableUserInput"
        @change="setItemPayloadProp({ prop: 'endless', value: $event })"
      ></wt-switcher>
      <wt-switcher
        :value="itemInstance.stickyAgent"
        :label="$t('objects.ccenter.queues.stickyAgent')"
        :disabled="disableUserInput"
        @change="setItemProp({ prop: 'stickyAgent', value: $event })"
      ></wt-switcher>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-preview-dialer-timing',
  mixins: [openedTabComponentMixin],
  methods: {
    ...mapActions({
      setItemPayloadProp(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_PAYLOAD_PROPERTY`, payload);
      },
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>
