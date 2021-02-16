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
      <wt-timepicker
        :value="minDuration"
        :label="$t('objects.ccenter.queues.minDuration')"
        :disabled="disableUserInput"
        @input="setItemPayloadProp({ prop: 'minDuration', value: $event })"
      ></wt-timepicker>
      <wt-switcher
        :value="recordings"
        :label="$t('objects.ccenter.queues.recordings')"
        :disabled="disableUserInput"
        @change="setItemPayloadProp({ prop: 'recordings', value: $event })"
      ></wt-switcher>
    </form>
  </section>
</template>

<script>
import openedTabComponentMixin from '@/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'opened-queue-outbound-ivr-timing',
  mixins: [openedTabComponentMixin],
  computed: {
    ...mapState('ccenter/queues', {
      minDuration: (state) => state.itemInstance.payload.minDuration,
      maxAttempts: (state) => state.itemInstance.payload.maxAttempts,
      originateTimeout: (state) => state.itemInstance.payload.originateTimeout,
      waitBetweenRetries: (state) => state.itemInstance.payload.waitBetweenRetries,
      recordings: (state) => state.itemInstance.payload.recordings,
    }),
  },

  methods: {
    ...mapActions('ccenter/queues', {
      setItemPayloadProp: 'SET_ITEM_PAYLOAD_PROPERTY',
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>
