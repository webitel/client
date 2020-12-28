<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.ccenter.queues.timing') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-timepicker
          :value="originateTimeout"
          :label="$t('objects.ccenter.queues.originateTimeout')"
          @input="setItemPayloadProp({ prop: 'originateTimeout', value: $event })"
      ></wt-timepicker>
      <wt-timepicker
          :value="discardAbandonedAfter"
          :label="$t('objects.ccenter.queues.discardAbandonedAfter')"
          @input="setItemPayloadProp({ prop: 'discardAbandonedAfter', value: $event })"
      ></wt-timepicker>
      <wt-timepicker
          :value="timeoutWithNoAgents"
          :label="$t('objects.ccenter.queues.timeoutWithNoAgents')"
          @input="setItemPayloadProp({ prop: 'timeoutWithNoAgents', value: $event })"
      ></wt-timepicker>
      <wt-select
          :value="timeBaseScore"
          :options="dropdownOptionsScoreList"
          :label="$t('objects.ccenter.queues.timeBaseScore')"
          :track-by="null"
          @input="setItemPayloadProp({ prop: 'timeBaseScore', value: $event })"
      ></wt-select>

    </form>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import openedTabComponentMixin from '../../../../mixins/openedTabComponentMixin';

export default {
  name: 'opened-queue-inbound-queue-timing',
  mixins: [openedTabComponentMixin],
  data: () => ({
    dropdownOptionsScoreList: ['score', 'system'],
  }),
  computed: {
    ...mapState('ccenter/queues', {
      originateTimeout: (state) => state.itemInstance.payload.originateTimeout,
      timeBaseScore: (state) => state.itemInstance.payload.timeBaseScore,
    }),
    discardAbandonedAfter: {
      get() {
        return this.$store.state.ccenter.queues.itemInstance.payload.discardAbandonedAfter;
      },
      set(value) {
        this.setItemPayloadProp({ prop: 'discardAbandonedAfter', value: +value });
      },
    },

    timeoutWithNoAgents: {
      get() {
        return this.$store.state.ccenter.queues.itemInstance.payload.timeoutWithNoAgents;
      },
      set(value) {
        this.setItemPayloadProp({ prop: 'timeoutWithNoAgents', value: +value });
      },
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
