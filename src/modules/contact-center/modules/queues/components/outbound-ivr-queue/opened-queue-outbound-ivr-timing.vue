<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.ccenter.queues.timing') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-timepicker
        :value="itemInstance.payload.originateTimeout"
        :label="$t('objects.ccenter.queues.originateTimeout')"
        :disabled="disableUserInput"
        @input="setItemPayloadProp({ prop: 'originateTimeout', value: +$event })"
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
        :label="$t('objects.ccenter.queues.waitBetweenRetries')"
        :disabled="disableUserInput"
        @input="setItemPayloadProp({ prop: 'waitBetweenRetries', value: +$event })"
      ></wt-timepicker>
      <wt-timepicker
        :value="itemInstance.payload.minDuration"
        :label="$t('objects.ccenter.queues.minDuration')"
        :disabled="disableUserInput"
        @input="setItemPayloadProp({ prop: 'minDuration', value: +$event })"
      ></wt-timepicker>
      <wt-switcher
        :value="itemInstance.payload.recordings"
        :label="$t('objects.ccenter.queues.recordings')"
        :disabled="disableUserInput"
        @change="setItemPayloadProp({ prop: 'recordings', value: $event })"
      ></wt-switcher>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import openedTabComponentMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-queue-outbound-ivr-timing',
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
