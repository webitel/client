<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.ccenter.queues.timing') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-timepicker
          v-model="originateTimeout"
          :label="$t('objects.ccenter.queues.originateTimeout')"
      ></wt-timepicker>

      <wt-input
          v-model="maxAttempts"
          type="number"
          :label="$t('objects.ccenter.queues.maxNumberOfRetry')"
      ></wt-input>

      <wt-timepicker
          v-model="secBetweenRetries"
          :label="$t('objects.ccenter.queues.waitBetweenRetries')"
      ></wt-timepicker>

      <wt-timepicker
          v-model="minDuration"
          :label="$t('objects.ccenter.queues.minCallDuration')"
      ></wt-timepicker>
    </form>
  </section>
</template>

<script>
import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
import { mapActions } from 'vuex';

export default {
  name: 'opened-queue-outbound-ivr-timing',
  mixins: [openedTabComponentMixin],
  components: {},
  data() {
    return {};
  },

  computed: {
    originateTimeout: {
      get() {
        return this.$store.state.ccenter.queues.itemInstance.payload.originateTimeout || 0;
      },
      set(value) {
        this.setItemPayloadProp({ prop: 'originateTimeout', value: +value });
      },
    },

    secBetweenRetries: {
      get() {
        return this.$store.state.ccenter.queues.itemInstance.payload.secBetweenRetries || 0;
      },
      set(value) {
        this.setItemPayloadProp({ prop: 'secBetweenRetries', value: +value });
      },
    },

    maxAttempts: {
      get() {
        return this.$store.state.ccenter.queues.itemInstance.payload.maxAttempts || 0;
      },
      set(value) {
        this.setItemPayloadProp({ prop: 'maxAttempts', value: +value });
      },
    },

    minDuration: {
      get() {
        return this.$store.state.ccenter.queues.itemInstance.payload.minDuration || 0;
      },
      set(value) {
        this.setItemPayloadProp({ prop: 'minDuration', value: +value });
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
