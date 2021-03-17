<template>
  <selection-popup
    :title="$t('objects.ccenter.queues.newQueue')"
    :selected="selected"
    :options="options"
    @change="selectOption"
    @select="createQueue"
    @close="close"
  ></selection-popup>
</template>

<script>
import SelectionPopup from '../../../../../app/components/utils/selection-popup/selection-popup.vue';

export default {
  name: 'create-queue-popup',
  components: { SelectionPopup },
  data: () => ({
    selected: null,
  }),

  created() {
    this.selectOption(this.options[0]);
  },

  computed: {
    options() {
      const offline = {
        value: 'offline-queue',
        title: this.$t('objects.ccenter.queues.offlineQueue'),
        description: this.$t('objects.ccenter.queues.offlineQueueDescription'),
      };
      const inbound = {
        value: 'inbound-queue',
        title: this.$t('objects.ccenter.queues.inboundQueue'),
        description: this.$t('objects.ccenter.queues.inboundQueueDescription'),
      };
      const outboundIVR = {
        value: 'outbound-ivr',
        title: this.$t('objects.ccenter.queues.outboundIVR'),
        description: this.$t('objects.ccenter.queues.outboundIVRDescription'),
      };
      const previewDialer = {
        value: 'preview-dialer',
        title: this.$t('objects.ccenter.queues.previewDialer'),
        description: this.$t('objects.ccenter.queues.previewDialerDescription'),
      };
      const progressiveDialer = {
        value: 'progressive-dialer',
        title: this.$t('objects.ccenter.queues.progressiveDialer'),
        description: this.$t('objects.ccenter.queues.progressiveDialerDescription'),
      };
      const predictiveDialer = {
        value: 'predictive-dialer',
        title: this.$t('objects.ccenter.queues.predictiveDialer'),
        description: this.$t('objects.ccenter.queues.predictiveDialerDescription'),
      };
      const chatInboundQueue = {
        value: 'chat-inbound-queue',
        title: this.$t('objects.ccenter.queues.chatInboundQueue'),
        description: this.$t('objects.ccenter.queues.chatInboundQueueDescription'),
      };
      const taskQueue = {
        value: 'task-queue',
        title: this.$t('objects.ccenter.queues.taskQueue'),
        description: this.$t('objects.ccenter.queues.taskQueueDescription'),
      };
      return [
        offline,
        inbound,
        outboundIVR,
        previewDialer,
        progressiveDialer,
        predictiveDialer,
        chatInboundQueue,
        taskQueue,
      ];
    },
  },

  methods: {
    close() {
      this.$emit('close');
    },
    selectOption(option) {
      this.selected = option;
    },
    createQueue() {
      if (this.selected) {
        this.$router.push(`/contact-center/queues/${this.selected.value}/new`);
      }
    },
  },

};
</script>

<style lang="scss" scoped>

</style>
