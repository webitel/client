<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.ccenter.queues.timing') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-timepicker
          :value="maxWaitTime"
          :label="$t('objects.ccenter.queues.maxWaitTime')"
          :disabled="disableUserInput"
          @input="setItemPayloadProp({ prop: 'maxWaitTime', value: $event })"
      ></wt-timepicker>
      <wt-timepicker
          :value="discardAbandonedAfter"
          :label="$t('objects.ccenter.queues.discardAbandonedAfter')"
          :disabled="disableUserInput"
          @input="setItemPayloadProp({ prop: 'discardAbandonedAfter', value: $event })"
      ></wt-timepicker>
      <wt-select
          :value="timeBaseScore"
          :options="timeBaseScoreOptions"
          :label="$t('objects.ccenter.queues.timeBaseScore')"
          :clearable="false"
          :track-by="null"
          :disabled="disableUserInput"
          @input="setItemPayloadProp({ prop: 'timeBaseScore', value: $event })"
      ></wt-select>
      <wt-switcher
        :value="allowGreetingAgent"
        :label="$t('objects.ccenter.queues.allowGreetingAgent')"
        :disabled="disableUserInput"
        @change="setItemPayloadProp({ prop: 'allowGreetingAgent', value: $event })"
      ></wt-switcher>
    </form>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import openedTabComponentMixin from '../../../../mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import { TimeBaseScore } from '../../../../store/modules/contact-center/queues/_internals/enums/TimeBaseScore.enum';

export default {
  name: 'opened-queue-inbound-queue-timing',
  mixins: [openedTabComponentMixin],
  data: () => ({
  }),
  computed: {
    ...mapState('ccenter/queues', {
      discardAbandonedAfter: (state) => state.itemInstance.payload.discardAbandonedAfter,
      maxWaitTime: (state) => state.itemInstance.payload.maxWaitTime,
      timeBaseScore: (state) => state.itemInstance.payload.timeBaseScore,
      allowGreetingAgent: (state) => state.itemInstance.payload.allowGreetingAgent,
    }),

    timeBaseScoreOptions() {
      return Object.values(TimeBaseScore);
    },
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
