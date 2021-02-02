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
      <wt-switcher
        :value="recordings"
        :label="$t('objects.ccenter.queues.recordings')"
        @change="setItemPayloadProp({ prop: 'recordings', value: $event })"
      ></wt-switcher>
    </form>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import openedTabComponentMixin from '../../../../mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-queue-outbound-ivr-timing',
  mixins: [openedTabComponentMixin],

  computed: {
    ...mapState('ccenter/queues', {
      originateTimeout: (state) => state.itemInstance.payload.originateTimeout,
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
