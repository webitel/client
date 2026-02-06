<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.ccenter.queues.params') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-timepicker
        v-if="specificControls.originateTimeout"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.originateTimeout')"
        :v="v.itemInstance.payload.originateTimeout"
        :model-value="itemInstance.payload.originateTimeout"
        @update:model-value="setItemPayloadProp({ prop: 'originateTimeout', value: +$event })"
      />
      <wt-timepicker
        v-if="specificControls.maxWaitTime"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.maxWaitTime')"
        :v="v.itemInstance.payload.maxWaitTime"
        :model-value="itemInstance.payload.maxWaitTime"
        @update:model-value="setItemPayloadProp({ prop: 'maxWaitTime', value: +$event })"
      />
      <wt-timepicker
        v-if="specificControls.discardAbandonedAfter"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.discardAbandonedAfter')"
        :v="v.itemInstance.payload.discardAbandonedAfter"
        :model-value="itemInstance.payload.discardAbandonedAfter"
        @update:model-value="setItemPayloadProp({ prop: 'discardAbandonedAfter', value: +$event })"
      />
      <wt-timepicker
        v-if="specificControls.maxIdleAgent"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.maxIdleAgent')"
        :v="v.itemInstance.payload.maxIdleAgent"
        :model-value="itemInstance.payload.maxIdleAgent"
        @update:model-value="setItemPayloadProp({ prop: 'maxIdleAgent', value: +$event })"
      />
      <wt-timepicker
        v-if="specificControls.maxIdleClient"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.maxIdleClient')"
        :v="v.itemInstance.payload.maxIdleClient"
        :model-value="itemInstance.payload.maxIdleClient"
        @update:model-value="setItemPayloadProp({ prop: 'maxIdleClient', value: +$event })"
      />
      <wt-timepicker
        v-if="specificControls.maxIdleDialog"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.maxIdleDialog')"
        :v="v.itemInstance.payload.maxIdleDialog"
        :model-value="itemInstance.payload.maxIdleDialog"
        @update:model-value="setItemPayloadProp({ prop: 'maxIdleDialog', value: +$event })"
      />
      <wt-timepicker
        v-if="specificControls.waitBetweenRetries"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.waitBetweenRetries')"
        :v="v.itemInstance.payload.waitBetweenRetries"
        :model-value="itemInstance.payload.waitBetweenRetries"
        @update:model-value="setItemPayloadProp({ prop: 'waitBetweenRetries', value: +$event })"
      />
      <wt-timepicker
        v-if="specificControls.minDuration"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.minDuration')"
        :v="v.itemInstance.payload.minDuration"
        :model-value="itemInstance.payload.minDuration"
        @update:model-value="setItemPayloadProp({ prop: 'minDuration', value: +$event })"
      />
      <wt-select
        v-if="specificControls.statisticTime"
        v-model="statisticTime"
        :clearable="false"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.statisticTime')"
        :options="dropdownOptionsStatisticTimeList"
        track-by="value"
      />
      <wt-input-number
        v-if="specificControls.maxCalls"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.maxCalls')"
        :label-props="{ hint: $t('objects.ccenter.queues.maxCallsHint') }"
        :model-value="itemInstance.payload.maxCalls"
        @update:model-value="setItemPayloadProp({ prop: 'maxCalls', value: +$event })"
      />
      <wt-input-number
        v-if="specificControls.minAttempts"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.minAttempts')"
        :model-value="itemInstance.payload.minAttempts"
        @update:model-value="setItemPayloadProp({ prop: 'minAttempts', value: +$event })"
      />
      <wt-input-number
        v-if="specificControls.maxAttempts"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.maxAttempts')"
        :model-value="itemInstance.payload.maxAttempts"
        @update:model-value="setItemPayloadProp({ prop: 'maxAttempts', value: +$event })"
      />
      <wt-input-number
        v-if="specificControls.maxAgentLine"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.maxAgentLine')"
        :model-value="itemInstance.payload.maxAgentLine"
        @update:model-value="setItemPayloadProp({ prop: 'maxAgentLine', value: +$event })"
      />
      <wt-input-number
        v-if="specificControls.dialingRate"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.dialingRate')"
        :model-value="itemInstance.payload.dialingRate"
        @update:model-value="setItemPayloadProp({ prop: 'dialingRate', value: +$event })"
      />
      <wt-input-number
        v-if="specificControls.maxAgentLose"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.maxAgentLose')"
        :model-value="itemInstance.payload.maxAgentLose"
        @update:model-value="setItemPayloadProp({ prop: 'maxAgentLose', value: +$event })"
      />
      <wt-input-number
        v-if="specificControls.playbackSilence"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.playbackSilence')"
        :model-value="itemInstance.payload.playbackSilence"
        @update:model-value="setItemPayloadProp({ prop: 'playbackSilence', value: +$event })"
      />
      <wt-input-number
        v-if="specificControls.abandonRateAdjustment"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.abandonRateAdjustment')"
        :model-value="itemInstance.payload.abandonRateAdjustment"
        @update:model-value="setItemPayloadProp({ prop: 'abandonRateAdjustment', value: +$event })"
      />
      <wt-select
        v-if="specificControls.autoAnswerTone"
        v-model="autoAnswerTone"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.autoAnswerTone')"
        :options="ToneList"
        clearable
        track-by="value"
      />
      <wt-input-number
        v-if="specificControls.maxWaitingSize"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.maxWaitingSize')"
        :model-value="itemInstance.payload.maxWaitingSize"
        @update:model-value="setItemPayloadProp({ prop: 'maxWaitingSize', value: +$event })"
      />
      <wt-input-number
        v-if="specificControls.targetAbandonedRate"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.targetAbandonedRate')"
        :model-value="itemInstance.payload.targetAbandonedRate"
        @update:model-value="setItemPayloadProp({ prop: 'targetAbandonedRate', value: +$event })"
      />
      <wt-input-number
        v-if="specificControls.minOnlineAgents"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.minOnlineAgents')"
        :v="v.itemInstance.payload.minOnlineAgents"
        :model-value="itemInstance.payload.minOnlineAgents"
        @update:model-value="setItemPayloadProp({ prop: 'minOnlineAgents', value: +$event })"
      />
      <wt-input-number
        v-if="specificControls.maxAbandonedRate"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.maxAbandonedRate')"
        :model-value="itemInstance.payload.maxAbandonedRate"
        @update:model-value="setItemPayloadProp({ prop: 'maxAbandonedRate', value: +$event })"
      />
      <wt-input-number
        v-if="specificControls.maxMemberLimit"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.maxMemberLimit')"
        :model-value="itemInstance.payload.maxMemberLimit"
        @update:model-value="setItemPayloadProp({ prop: 'maxMemberLimit', value: +$event })"
      />
      <wt-switcher
        v-if="specificControls.waitBetweenRetriesDesc"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.waitBetweenRetriesDesc')"
        :model-value="itemInstance.payload.waitBetweenRetriesDesc"
        @update:model-value="setItemPayloadProp({ prop: 'waitBetweenRetriesDesc', value: $event })"
      />
      <div v-if="specificControls.loadFactor">
        <wt-label>{{ $t('objects.ccenter.queues.loadFactor') }}</wt-label>
        <div class="load-factor">
          <wt-slider
            :max="100"
            :min="1"
            :step="1"
            :model-value="itemInstance.payload.loadFactor"
            @update:model-value="setItemPayloadProp({ prop: 'loadFactor', value: +$event })"
          />
          <wt-input-number
            :max="100"
            :min="0"
            :value="itemInstance.payload.loadFactor"
            @update:model-value="setItemPayloadProp({ prop: 'loadFactor', value: +$event })"
          />
        </div>
      </div>
      <wt-switcher
        v-if="specificControls.strictCircuit"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.strictCircuit')"
        :model-value="itemInstance.payload.strictCircuit"
        @update:model-value="setItemPayloadProp({ prop: 'strictCircuit', value: $event })"
      />
      <wt-switcher
        v-if="specificControls.perNumbers"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.perNumbers')"
        :model-value="itemInstance.payload.perNumbers"
        @update:model-value="setItemPayloadProp({ prop: 'perNumbers', value: $event })"
      />
      <wt-switcher
        v-if="specificControls.retryAbandoned"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.retryAbandoned')"
        :model-value="itemInstance.payload.retryAbandoned"
        @update:model-value="setItemPayloadProp({ prop: 'retryAbandoned', value: $event })"
      />
      <wt-switcher
        v-if="specificControls.recordings && itemInstance.payload.recordings"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.recordAll')"
        :model-value="itemInstance.payload.recordAll"
        @update:model-value="setItemPayloadProp({ prop: 'recordAll', value: $event })"
      />
      <wt-switcher
        v-if="specificControls.recordings"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.recordings')"
        :model-value="itemInstance.payload.recordings"
        @update:model-value="setItemPayloadProp({ prop: 'recordings', value: $event })"
      />
      <wt-switcher
        v-if="specificControls.allowGreetingAgent"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.allowGreetingAgent')"
        :model-value="itemInstance.payload.allowGreetingAgent"
        @update:model-value="setItemPayloadProp({ prop: 'allowGreetingAgent', value: $event })"
      />
      <wt-switcher
        v-if="specificControls.endless"
        v-show="!itemInstance.processing"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.endless')"
        :model-value="itemInstance.payload.endless"
        @update:model-value="setItemPayloadProp({ prop: 'endless', value: $event })"
      />
      <wt-switcher
        v-if="specificControls.stickyAgent"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.stickyAgent')"
        :model-value="itemInstance.stickyAgent"
        @update:model-value="setItemProp({ prop: 'stickyAgent', value: $event })"
      />
      <wt-input-number
        v-if="specificControls.stickyAgentSec"
        v-show="itemInstance.stickyAgent"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.stickyAgentSec')"
        :model-value="itemInstance.payload.stickyAgentSec"
        @update:model-value="setItemPayloadProp({ prop: 'stickyAgentSec', value: +$event })"
      />
      <wt-switcher
        v-if="specificControls.stickyIgnoreStatus"
        v-show="itemInstance.stickyAgent"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.stickyIgnoreStatus')"
        :model-value="itemInstance.payload.stickyIgnoreStatus"
        @update:model-value="setItemPayloadProp({ prop: 'stickyIgnoreStatus', value: $event })"
      />
      <wt-switcher
        v-if="specificControls.ignoreCalendar"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.ignoreCalendar')"
        :model-value="itemInstance.payload.ignoreCalendar"
        @update:model-value="setItemPayloadProp({ prop: 'ignoreCalendar', value: $event })"
      />
      <wt-switcher
        v-if="specificControls.manualDistribution"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.manualDistribution')"
        :model-value="itemInstance.payload.manualDistribution"
        @update:model-value="setItemPayloadProp({ prop: 'manualDistribution', value: $event })"
      />
      <wt-switcher
        v-if="specificControls.lastMessageTimeout"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.lastMessageTimeout')"
        :model-value="itemInstance.payload.lastMessageTimeout"
        @update:model-value="setItemPayloadProp({ prop: 'lastMessageTimeout', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { QueueType } from 'webitel-sdk/esm2015/enums';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import QueueTypeProperties from '../lookups/QueueTypeProperties.lookup';
import StatisticTimeList from '../store/_internals/lookups/StatisticTime.lookup';
import ToneList from '../store/_internals/lookups/Tone.lookup';

export default {
  name: 'OpenedQueueParams',
  mixins: [openedTabComponentMixin],
  setup: () => {
    const { disableUserInput } = useUserAccessControl();
    return {
      disableUserInput,
    };
  },
  data: () => ({
    ToneList,
  }),
  computed: {
    autoAnswerTone: {
      get() {
        if (this.itemInstance.payload.autoAnswerTone) {
          return this.ToneList.find(
            (tone) => tone.value === this.itemInstance.payload.autoAnswerTone,
          );
        }
        /* https://my.webitel.com/browse/WTEL-3268 */
        /* For queues with types INBOUND_QUEUE, PROGRESSIVE_DIALER, */
        /* PREDICTIVE_DIALER add a default alert tone if there is no value */
        if (
          this.itemInstance.type === QueueType.INBOUND_QUEUE ||
          this.itemInstance.type === QueueType.PROGRESSIVE_DIALER ||
          this.itemInstance.type === QueueType.PREDICTIVE_DIALER
        ) {
          return this.ToneList.find((tone) => tone.value === 'default');
        }
      },
      set(value) {
        this.setItemPayloadProp({
          prop: 'autoAnswerTone',
          value: value.value,
        });
      },
    },
    statisticTime: {
      get() {
        return this.dropdownOptionsStatisticTimeList.find(
          (time) => time.value === this.itemInstance.payload.statisticTime,
        );
      },
      set(value) {
        this.setItemPayloadProp({
          prop: 'statisticTime',
          value: value.value,
        });
      },
    },
    specificControls() {
      return QueueTypeProperties[this.itemInstance.type].controls.reduce(
        (controls, control) => ({
          ...controls,
          [control]: true,
        }),
        {},
      );
    },

    dropdownOptionsStatisticTimeList() {
      return StatisticTimeList.map((time) => ({
        value: time.value,
        name: this.$t(`reusable.time.${time.name}`),
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

<style
  lang="scss"
  scoped
>
.load-factor {
  display: grid;
  align-items: center;
  grid-template-columns: 5fr 1fr;
  gap: var(--spacing-sm);

  .wt-slider {
    height: auto;
  }
}
</style>
