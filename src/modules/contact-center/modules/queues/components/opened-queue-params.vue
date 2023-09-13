<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.ccenter.queues.params') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-timepicker
        v-if="specificControls.originateTimeout"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.originateTimeout')"
        :v="v.itemInstance.payload.originateTimeout"
        :value="itemInstance.payload.originateTimeout"
        @input="setItemPayloadProp({ prop: 'originateTimeout', value: +$event })"
      ></wt-timepicker>
      <wt-timepicker
        v-if="specificControls.maxWaitTime"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.maxWaitTime')"
        :v="v.itemInstance.payload.maxWaitTime"
        :value="itemInstance.payload.maxWaitTime"
        @input="setItemPayloadProp({ prop: 'maxWaitTime', value: +$event })"
      ></wt-timepicker>
      <wt-timepicker
        v-if="specificControls.discardAbandonedAfter"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.discardAbandonedAfter')"
        :v="v.itemInstance.payload.discardAbandonedAfter"
        :value="itemInstance.payload.discardAbandonedAfter"
        @input="setItemPayloadProp({ prop: 'discardAbandonedAfter', value: +$event })"
      ></wt-timepicker>
      <wt-timepicker
        v-if="specificControls.maxIdleAgent"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.maxIdleAgent')"
        :v="v.itemInstance.payload.maxIdleAgent"
        :value="itemInstance.payload.maxIdleAgent"
        @input="setItemPayloadProp({ prop: 'maxIdleAgent', value: +$event })"
      ></wt-timepicker>
      <wt-timepicker
        v-if="specificControls.maxIdleClient"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.maxIdleClient')"
        :v="v.itemInstance.payload.maxIdleClient"
        :value="itemInstance.payload.maxIdleClient"
        @input="setItemPayloadProp({ prop: 'maxIdleClient', value: +$event })"
      ></wt-timepicker>
      <wt-timepicker
        v-if="specificControls.maxIdleDialog"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.maxIdleDialog')"
        :v="v.itemInstance.payload.maxIdleDialog"
        :value="itemInstance.payload.maxIdleDialog"
        @input="setItemPayloadProp({ prop: 'maxIdleDialog', value: +$event })"
      ></wt-timepicker>
      <wt-timepicker
        v-if="specificControls.waitBetweenRetries"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.waitBetweenRetries')"
        :v="v.itemInstance.payload.waitBetweenRetries"
        :value="itemInstance.payload.waitBetweenRetries"
        @input="setItemPayloadProp({ prop: 'waitBetweenRetries', value: +$event })"
      ></wt-timepicker>
      <wt-timepicker
        v-if="specificControls.minDuration"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.minDuration')"
        :v="v.itemInstance.payload.minDuration"
        :value="itemInstance.payload.minDuration"
        @input="setItemPayloadProp({ prop: 'minDuration', value: +$event })"
      ></wt-timepicker>
      <wt-select
        v-if="specificControls.statisticTime"
        v-model="statisticTime"
        :clearable="false"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.statisticTime')"
        :options="dropdownOptionsStatisticTimeList"
        track-by="value"
      ></wt-select>
      <wt-input
        v-if="specificControls.maxCalls"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.maxCalls')"
        :label-props="{ hint: $t('objects.ccenter.queues.maxCallsHint') }"
        :value="itemInstance.payload.maxCalls"
        type="number"
        @input="setItemPayloadProp({ prop: 'maxCalls', value: +$event })"
      ></wt-input>
      <wt-input
        v-if="specificControls.minAttempts"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.minAttempts')"
        :value="itemInstance.payload.minAttempts"
        type="number"
        @input="setItemPayloadProp({ prop: 'minAttempts', value: +$event })"
      ></wt-input>
      <wt-input
        v-if="specificControls.maxAttempts"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.maxAttempts')"
        :value="itemInstance.payload.maxAttempts"
        type="number"
        @input="setItemPayloadProp({ prop: 'maxAttempts', value: +$event })"
      ></wt-input>
      <wt-input
        v-if="specificControls.maxAgentLine"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.maxAgentLine')"
        :value="itemInstance.payload.maxAgentLine"
        type="number"
        @input="setItemPayloadProp({ prop: 'maxAgentLine', value: +$event })"
      ></wt-input>
      <wt-input
        v-if="specificControls.maxAgentLose"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.maxAgentLose')"
        :value="itemInstance.payload.maxAgentLose"
        type="number"
        @input="setItemPayloadProp({ prop: 'maxAgentLose', value: +$event })"
      ></wt-input>
      <wt-input
        v-if="specificControls.playbackSilence"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.playbackSilence')"
        :value="itemInstance.payload.playbackSilence"
        type="number"
        @input="setItemPayloadProp({ prop: 'playbackSilence', value: +$event })"
      ></wt-input>
      <wt-input
        v-if="specificControls.abandonRateAdjustment"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.abandonRateAdjustment')"
        :value="itemInstance.payload.abandonRateAdjustment"
        type="number"
        @input="setItemPayloadProp({ prop: 'abandonRateAdjustment', value: +$event })"
      ></wt-input>
      <wt-select
        v-if="specificControls.autoAnswerTone"
        clearable
        :disabled="disableUserInput"
        v-model="autoAnswerTone"
        :label="$t('objects.ccenter.queues.autoAnswerTone')"
        :options="ToneList"
        track-by="value"
      ></wt-select>
      <wt-input
        v-if="specificControls.maxWaitingSize"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.maxWaitingSize')"
        :value="itemInstance.payload.maxWaitingSize"
        type="number"
        @input="setItemPayloadProp({ prop: 'maxWaitingSize', value: +$event })"
      ></wt-input>
      <wt-input
        v-if="specificControls.targetAbandonedRate"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.targetAbandonedRate')"
        :value="itemInstance.payload.targetAbandonedRate"
        type="number"
        @input="setItemPayloadProp({ prop: 'targetAbandonedRate', value: +$event })"
      ></wt-input>
      <wt-input
        v-if="specificControls.minOnlineAgents"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.minOnlineAgents')"
        :value="itemInstance.payload.minOnlineAgents"
        type="number"
        @input="setItemPayloadProp({ prop: 'minOnlineAgents', value: +$event })"
      ></wt-input>
      <wt-input
        v-if="specificControls.maxAbandonedRate"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.maxAbandonedRate')"
        :value="itemInstance.payload.maxAbandonedRate"
        type="number"
        @input="setItemPayloadProp({ prop: 'maxAbandonedRate', value: +$event })"
      ></wt-input>
      <wt-switcher
        v-if="specificControls.waitBetweenRetriesDesc"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.waitBetweenRetriesDesc')"
        :value="itemInstance.payload.waitBetweenRetriesDesc"
        @change="setItemPayloadProp({ prop: 'waitBetweenRetriesDesc', value: $event })"
      ></wt-switcher>
      <div v-if="specificControls.loadFactor">
        <wt-label>{{ $t('objects.ccenter.queues.loadFactor') }}</wt-label>
        <div class="load-factor">
          <wt-slider
            :value="itemInstance.payload.loadFactor"
            :min="1"
            :max="100"
            :step="1"
            @input="setItemPayloadProp({ prop: 'loadFactor', value: +$event })"
          ></wt-slider>
          <wt-input
            :value="itemInstance.payload.loadFactor"
            :min="0"
            :max="100"
            type="number"
            @input="setItemPayloadProp({ prop: 'loadFactor', value: +$event })"
          ></wt-input>
        </div>
      </div>
      <wt-switcher
        v-if="specificControls.strictCircuit"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.strictCircuit')"
        :value="itemInstance.payload.strictCircuit"
        @change="setItemPayloadProp({ prop: 'strictCircuit', value: $event })"
      ></wt-switcher>
      <wt-switcher
        v-if="specificControls.perNumbers"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.perNumbers')"
        :value="itemInstance.payload.perNumbers"
        @change="setItemPayloadProp({ prop: 'perNumbers', value: $event })"
      ></wt-switcher>
      <wt-switcher
        v-if="specificControls.retryAbandoned"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.retryAbandoned')"
        :value="itemInstance.payload.retryAbandoned"
        @change="setItemPayloadProp({ prop: 'retryAbandoned', value: $event })"
      ></wt-switcher>
      <wt-switcher
        v-if="specificControls.recordings && itemInstance.payload.recordings"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.recordAll')"
        :value="itemInstance.payload.recordAll"
        @change="setItemPayloadProp({ prop: 'recordAll', value: $event })"
      ></wt-switcher>
      <wt-switcher
        v-if="specificControls.recordings"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.recordings')"
        :value="itemInstance.payload.recordings"
        @change="setItemPayloadProp({ prop: 'recordings', value: $event })"
      ></wt-switcher>
      <wt-switcher
        v-if="specificControls.allowGreetingAgent"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.allowGreetingAgent')"
        :value="itemInstance.payload.allowGreetingAgent"
        @change="setItemPayloadProp({ prop: 'allowGreetingAgent', value: $event })"
      ></wt-switcher>
      <wt-switcher
        v-if="specificControls.endless"
        v-show="!itemInstance.processing"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.endless')"
        :value="itemInstance.payload.endless"
        @change="setItemPayloadProp({ prop: 'endless', value: $event })"
      ></wt-switcher>
      <wt-switcher
        v-if="specificControls.stickyAgent"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.stickyAgent')"
        :value="itemInstance.stickyAgent"
        @change="setItemProp({ prop: 'stickyAgent', value: $event })"
      ></wt-switcher>
      <wt-input
        v-if="specificControls.stickyAgentSec"
        v-show="itemInstance.stickyAgent"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.stickyAgentSec')"
        :value="itemInstance.payload.stickyAgentSec"
        type="number"
        @input="setItemPayloadProp({ prop: 'stickyAgentSec', value: +$event })"
      ></wt-input>
      <wt-switcher
        v-if="specificControls.manualDistribution"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.manualDistribution')"
        :value="itemInstance.payload.manualDistribution"
        @change="setItemPayloadProp({ prop: 'manualDistribution', value: $event })"
      ></wt-switcher>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { QueueType } from 'webitel-sdk/esm2015/enums';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import QueueTypeProperties from '../lookups/QueueTypeProperties.lookup';
import StatisticTimeList from '../store/_internals/lookups/StatisticTime.lookup';
import ToneList from '../store/_internals/lookups/Tone.lookup';

export default {
  name: 'opened-queue-params',
  mixins: [openedTabComponentMixin],
  data: () => ({
    ToneList,
  }),
  computed: {
    autoAnswerTone: {
      get() {
        if (this.itemInstance.payload.autoAnswerTone) {
          return this.ToneList
          .find((tone) => tone.value === this.itemInstance.payload.autoAnswerTone);
        }
        /* https://my.webitel.com/browse/WTEL-3268 */
        /* For queues with types INBOUND_QUEUE, PROGRESSIVE_DIALER, */
        /* PREDICTIVE_DIALER add a default alert tone if there is no value */
        if (this.itemInstance.type === QueueType.INBOUND_QUEUE
          || this.itemInstance.type === QueueType.PROGRESSIVE_DIALER
          || this.itemInstance.type === QueueType.PREDICTIVE_DIALER) {
          return this.ToneList.find((tone) => tone.value === 'default');
        }
        return;
      },
      set(value) {
        this.setItemPayloadProp({ prop: 'autoAnswerTone', value: value.value });
      },
    },
    statisticTime: {
      get() {
        return this.dropdownOptionsStatisticTimeList
        .find((time) => time.value === this.itemInstance.payload.statisticTime);
      },
      set(value) {
        this.setItemPayloadProp({ prop: 'statisticTime', value: value.value });
      },
    },
    specificControls() {
      return QueueTypeProperties[this.itemInstance.type].controls
      .reduce((controls, control) => ({
        ...controls,
        [control]: true,
      }), {});
    },

    dropdownOptionsStatisticTimeList() {
      return StatisticTimeList.map((time) => ({
        value: time.value,
        name: this.$t(`objects.ccenter.queues.time.${time.name}`),
      }));
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
.load-factor {
  display: grid;
  grid-template-columns: 5fr 1fr;
  align-items: center;
  gap: var(--spacing-sm);

  .wt-slider {
    height: auto;
  }
}
</style>
