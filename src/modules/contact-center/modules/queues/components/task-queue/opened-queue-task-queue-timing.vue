<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.ccenter.queues.timing') }}</h3>
    </header>
    <form class="object-input-grid">
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
import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-queue-task-queue-timing',
  mixins: [openedTabComponentMixin],

  computed: {
    ...mapState('ccenter/queues', {
      maxAttempts: (state) => state.itemInstance.payload.maxAttempts,
      waitBetweenRetries: (state) => state.itemInstance.payload.waitBetweenRetries,
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
