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
        @input="setItemPayloadProp({ prop: 'originateTimeout', value: +$event })"
      ></wt-timepicker>
      <wt-switcher
        :value="itemInstance.payload.recordings"
        :label="$t('objects.ccenter.queues.recordings')"
        :disabled="disableUserInput"
        @change="setItemPayloadProp({ prop: 'recordings', value: $event })"
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
