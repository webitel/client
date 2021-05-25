<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.ccenter.queues.timing') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-timepicker
          :value="itemInstance.payload.maxWaitTime"
          :label="$t('objects.ccenter.queues.maxWaitTime')"
          :disabled="disableUserInput"
          @input="setItemPayloadProp({ prop: 'maxWaitTime', value: +$event })"
      ></wt-timepicker>
      <wt-timepicker
          :value="itemInstance.payload.discardAbandonedAfter"
          :label="$t('objects.ccenter.queues.discardAbandonedAfter')"
          :disabled="disableUserInput"
          @input="setItemPayloadProp({ prop: 'discardAbandonedAfter', value: +$event })"
      ></wt-timepicker>
      <wt-switcher
        :value="itemInstance.payload.allowGreetingAgent"
        :label="$t('objects.ccenter.queues.allowGreetingAgent')"
        :disabled="disableUserInput"
        @change="setItemPayloadProp({ prop: 'allowGreetingAgent', value: $event })"
      ></wt-switcher>
      <!-- empty for grid cell -->
      <div></div>
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
        @input="setItemProp({ prop: 'processingSec', value: +$event })"
      ></wt-input>
      <wt-input
        v-show="itemInstance.processing"
        :value="itemInstance.processingRenewalSec"
        :label="$t('objects.ccenter.queues.processingRenewalSec')"
        :disabled="disableUserInput"
        type="number"
        @input="setItemProp({ prop: 'processingRenewalSec', value: +$event })"
      ></wt-input>
      <!-- empty for grid cell -->
      <div></div>
      <wt-switcher
        :value="itemInstance.stickyAgent"
        :label="$t('objects.ccenter.queues.stickyAgent')"
        :disabled="disableUserInput"
        @change="setItemProp({ prop: 'stickyAgent', value: $event })"
      ></wt-switcher>
      <wt-input
        v-show="itemInstance.stickyAgent"
        :value="itemInstance.payload.stickyAgentSec"
        :label="$t('objects.ccenter.queues.stickyAgentSec')"
        :disabled="disableUserInput"
        type="number"
        @input="setItemPayloadProp({ prop: 'stickyAgentSec', value: +$event })"
      ></wt-input>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import { TimeBaseScore } from '../../store/_internals/enums/TimeBaseScore.enum';

export default {
  name: 'opened-queue-inbound-queue-timing',
  mixins: [openedTabComponentMixin],
  computed: {
    timeBaseScoreOptions() {
      return Object.values(TimeBaseScore);
    },
  },
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
