<template>
  <wt-page-wrapper :actions-panel="false">
    <template slot="header">
      <object-header
        :primary-action="save"
        :primary-text="computePrimaryText"
        :primary-disabled="computeDisabled"
        :secondary-action="close"
      >
        <headline-nav :path="path"></headline-nav>
      </object-header>
    </template>

    <template slot="main">
      <div class="tabs-page-wrapper">
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        ></wt-tabs>
        <component
          :is="`${$options.name}-${currentTab.value}`"
          :v="$v"
        ></component>
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { mapState } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import OpenedQueueOfflineQueueGeneral from './offline-queue/opened-queue-offline-queue-general.vue';
import OpenedQueueOfflineQueueTiming from './offline-queue/opened-queue-offline-queue-timing.vue';
import OpenedQueueInboundQueueGeneral from './inbound-queue/opened-queue-inbound-queue-general.vue';
import OpenedQueueInboundQueueTiming from './inbound-queue/opened-queue-inbound-queue-timing.vue';
import OpenedQueueOutboundIvrQueueGeneral from './outbound-ivr-queue/opened-queue-outbound-ivr-general.vue';
import OpenedQueueOutboundIvrQueueTiming from './outbound-ivr-queue/opened-queue-outbound-ivr-timing.vue';
import OpenedQueuePreviewDialerGeneral from './preview-dialer/opened-queue-preview-dialer-general.vue';
import OpenedQueuePreviewDialerTiming from './preview-dialer/opened-queue-preview-dialer-timing.vue';
import OpenedQueueProgressiveDialerGeneral from './progressive-dialer/opened-queue-progressive-dialer-general.vue';
import OpenedQueueProgressiveDialerTiming from './progressive-dialer/opened-queue-progressive-dialer-timing.vue';
import OpenedQueuePredictiveDialerGeneral from './predictive-dialer/opened-queue-predictive-dialer-general.vue';
import OpenedQueuePredictiveDialerTiming from './predictive-dialer/opened-queue-predictive-dialer-timing.vue';
import OpenedQueueChatInboundQueueGeneral from './chat-inbound-queue/opened-queue-chat-inbound-queue-general.vue';
import OpenedQueueChatInboundQueueTiming from './chat-inbound-queue/opened-queue-chat-inbound-queue-timing.vue';
import OpenedQueueTaskQueueGeneral from './task-queue/opened-queue-task-queue-general.vue';
import OpenedQueueTaskQueueTiming from './task-queue/opened-queue-task-queue-timing.vue';
import OpenedQueueResources from './opened-queue-resources.vue';
import OpenedQueueBuckets from './opened-queue-buckets.vue';
import OpenedQueueAmd from './opened-queue-amd.vue';
import OpenedQueueVariables from './opened-queue-variables.vue';
import OpenedQueueLogs from './opened-queue-logs.vue';
import OpenedQueuePermissions from './opened-queue-permissions.vue';
import openedObjectMixin from '../../../mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import QueueType from '../../../store/modules/contact-center/queues/_internals/enums/QueueType.enum';

export default {
  name: 'opened-queue',
  mixins: [openedObjectMixin],
  components: {
    OpenedQueueOfflineQueueGeneral,
    OpenedQueueOfflineQueueTiming,
    OpenedQueueInboundQueueGeneral,
    OpenedQueueInboundQueueTiming,
    OpenedQueueOutboundIvrQueueGeneral,
    OpenedQueueOutboundIvrQueueTiming,
    OpenedQueuePreviewDialerGeneral,
    OpenedQueuePreviewDialerTiming,
    OpenedQueueProgressiveDialerGeneral,
    OpenedQueueProgressiveDialerTiming,
    OpenedQueuePredictiveDialerGeneral,
    OpenedQueuePredictiveDialerTiming,
    OpenedQueueChatInboundQueueGeneral,
    OpenedQueueChatInboundQueueTiming,
    OpenedQueueTaskQueueGeneral,
    OpenedQueueTaskQueueTiming,
    OpenedQueueResources,
    OpenedQueueBuckets,
    OpenedQueueAmd,
    OpenedQueueVariables,
    OpenedQueueLogs,
    OpenedQueuePermissions,
  },

  data: () => ({
    namespace: 'ccenter/queues',
  }),

  validations() {
    const defaults = {
      name: { required },
      calendar: { required },
    };
    switch (this.queueType) {
      case QueueType.OFFLINE_QUEUE:
        return {
          itemInstance: {
            ...defaults,
            team: { required },
            strategy: { required },
            payload: {
              originateTimeout: { required },
            },
          },
        };
      case QueueType.INBOUND_QUEUE:
        return {
          itemInstance: {
            ...defaults,
            team: { required },
            payload: {
              timeBaseScore: { required },
              maxWaitTime: { required },
            },
          },
        };
      case QueueType.OUTBOUND_IVR_QUEUE:
        return {
          itemInstance: {
            ...defaults,
            strategy: { required },
            payload: {
              maxAttempts: { required },
              originateTimeout: { required },
              waitBetweenRetries: { required },
            },
          },
        };
      case QueueType.PREVIEW_DIALER:
        return {
          itemInstance: {
            ...defaults,
            strategy: { required },
            team: { required },
            payload: {
              maxAttempts: { required },
              originateTimeout: { required },
              waitBetweenRetries: { required },
            },
          },
        };
      case QueueType.PROGRESSIVE_DIALER:
        return {
          itemInstance: {
            ...defaults,
            strategy: { required },
            team: { required },
            payload: {
              maxAttempts: { required },
              originateTimeout: { required },
              waitBetweenRetries: { required },
            },
          },
        };
      case QueueType.PREDICTIVE_DIALER:
        return {
          itemInstance: {
            ...defaults,
            strategy: { required },
            team: { required },
            payload: {
              maxAttempts: { required },
              originateTimeout: { required },
              waitBetweenRetries: { required },
            },
          },
        };
      case QueueType.CHAT_INBOUND_QUEUE:
        return {
          itemInstance: {
            ...defaults,
            team: { required },
            strategy: { required },
            payload: {
              timeBaseScore: { required },
              maxWaitTime: { required },
            },
          },
        };
      case QueueType.TASK_QUEUE:
        return {
          itemInstance: {
            ...defaults,
            strategy: { required },
            team: { required },
            payload: {
              maxAttempts: { required },
              waitBetweenRetries: { required },
            },
          },
        };
      default:
        return {};
    }
  },

  computed: {
    ...mapState('ccenter/queues', {
      itemInstance: (state) => state.itemInstance,
      id: (state) => state.itemId,
    }),

    queueType() {
      if (this.$route.path.includes('offline-queue')) return QueueType.OFFLINE_QUEUE;
      if (this.$route.path.includes('chat-inbound-queue')) return QueueType.CHAT_INBOUND_QUEUE;
      if (this.$route.path.includes('inbound-queue')) return QueueType.INBOUND_QUEUE;
      if (this.$route.path.includes('outbound-ivr')) return QueueType.OUTBOUND_IVR_QUEUE;
      if (this.$route.path.includes('preview-dialer')) return QueueType.PREVIEW_DIALER;
      if (this.$route.path.includes('progressive-dialer')) return QueueType.PROGRESSIVE_DIALER;
      if (this.$route.path.includes('predictive-dialer')) return QueueType.PREDICTIVE_DIALER;
      if (this.$route.path.includes('task-queue')) return QueueType.TASK_QUEUE;
      return 'unknown';
    },

    tabs() {
      const resources = {
        text: this.$tc('objects.ccenter.res.res', 2),
        value: 'resources',
      };
      const buckets = {
        text: this.$tc('objects.ccenter.buckets.buckets', 2),
        value: 'buckets',
      };
      const amd = {
        text: this.$t('objects.ccenter.queues.amd'),
        value: 'amd',
      };
      const variables = {
        text: this.$tc('objects.ccenter.queues.variables', 2),
        value: 'variables',
      };
      const logs = {
        text: this.$tc('objects.ccenter.logs.logs', 2),
        value: 'logs',
      };
      const permissions = {
        text: this.$tc('objects.permissions.permissions', 2),
        value: 'permissions',
      };

      const offlineQueueTabs = [{
        text: this.$t('objects.general'),
        value: 'offline-queue-general',
      }, {
        text: this.$t('objects.ccenter.queues.timing'),
        value: 'offline-queue-timing',
      }, resources, buckets];

      const inboundQueueTabs = [{
        text: this.$t('objects.general'),
        value: 'inbound-queue-general',
      }, {
        text: this.$t('objects.ccenter.queues.timing'),
        value: 'inbound-queue-timing',
      }];

      const outboundIVRQueueTabs = [{
        text: this.$t('objects.general'),
        value: 'outbound-ivr-queue-general',
      }, {
        text: this.$t('objects.ccenter.queues.timing'),
        value: 'outbound-ivr-queue-timing',
      }, resources, buckets, amd];

      const previewDialerTabs = [{
        text: this.$t('objects.general'),
        value: 'preview-dialer-general',
      }, {
        text: this.$t('objects.ccenter.queues.timing'),
        value: 'preview-dialer-timing',
      }, resources, buckets];

      const progressiveDialerTabs = [{
        text: this.$t('objects.general'),
        value: 'progressive-dialer-general',
      }, {
        text: this.$t('objects.ccenter.queues.timing'),
        value: 'progressive-dialer-timing',
      }, resources, buckets, amd];

      const predictiveDialerTabs = [{
        text: this.$t('objects.general'),
        value: 'predictive-dialer-general',
      }, {
        text: this.$t('objects.ccenter.queues.timing'),
        value: 'predictive-dialer-timing',
      }, resources, buckets, amd];

      const chatInboundQueueTabs = [{
        text: this.$t('objects.general'),
        value: 'chat-inbound-queue-general',
      }, {
        text: this.$t('objects.ccenter.queues.timing'),
        value: 'chat-inbound-queue-timing',
      }];

      const taskQueueTabs = [{
        text: this.$t('objects.general'),
        value: 'task-queue-general',
      }, {
        text: this.$t('objects.ccenter.queues.timing'),
        value: 'task-queue-timing',
      }, buckets];

      let tabs = [];
      switch (this.queueType) {
        case QueueType.OFFLINE_QUEUE:
          tabs = offlineQueueTabs;
          break;
        case QueueType.INBOUND_QUEUE:
          tabs = inboundQueueTabs;
          break;
        case QueueType.OUTBOUND_IVR_QUEUE:
          tabs = outboundIVRQueueTabs;
          break;
        case QueueType.PREVIEW_DIALER:
          tabs = previewDialerTabs;
          break;
        case QueueType.PROGRESSIVE_DIALER:
          tabs = progressiveDialerTabs;
          break;
        case QueueType.PREDICTIVE_DIALER:
          tabs = predictiveDialerTabs;
          break;
        case QueueType.CHAT_INBOUND_QUEUE:
          tabs = chatInboundQueueTabs;
          break;
        case QueueType.TASK_QUEUE:
          tabs = taskQueueTabs;
          break;
        default:
      }
      tabs = tabs.concat(variables, logs);
      if (this.id) tabs.push(permissions);
      return tabs;
    },

    path() {
      const localeRoot = 'objects.ccenter.queues';
      let title = '';
      let queueUrl = '';
      switch (this.queueType) {
        case QueueType.OFFLINE_QUEUE:
          title = this.$t(`${localeRoot}.offlineQueue`);
          queueUrl = 'offline-queue';
          break;
        case QueueType.INBOUND_QUEUE:
          title = this.$t(`${localeRoot}.inboundQueue`);
          queueUrl = 'inbound-queue';
          break;
        case QueueType.OUTBOUND_IVR_QUEUE:
          title = this.$t(`${localeRoot}.outboundIVRQueue`);
          queueUrl = 'outbound-ivr-queue';
          break;
        case QueueType.PREVIEW_DIALER:
          title = this.$t(`${localeRoot}.previewDialer`);
          queueUrl = 'preview-dialer';
          break;
        case QueueType.PROGRESSIVE_DIALER:
          title = this.$t(`${localeRoot}.progressiveDialer`);
          queueUrl = 'progressive-dialer';
          break;
        case QueueType.PREDICTIVE_DIALER:
          title = this.$t(`${localeRoot}.predictiveDialer`);
          queueUrl = 'predictive-dialer';
          break;
        case QueueType.CHAT_INBOUND_QUEUE:
          title = this.$t(`${localeRoot}.chatInboundQueue`);
          queueUrl = 'chat-inbound-queue';
          break;
        case QueueType.TASK_QUEUE:
          title = this.$t(`${localeRoot}.taskQueue`);
          queueUrl = 'task-queue';
          break;
        default:
      }
      const baseUrl = '/contact-center/queues';
      return [
        { name: this.$t('objects.ccenter.ccenter') },
        { name: this.$tc(`${localeRoot}.queues`, 2), route: baseUrl },
        {
          name: `${(this.id ? this.pathName : this.$t('objects.new'))} (${title})`,
          route: `${baseUrl}/${queueUrl}/${this.id ? this.id : 'new'}`,
        },
      ];
    },
  },
  methods: {
    async loadPageData() {
      await this.setId(this.$route.params.id);
      return this.loadItem(this.queueType);
    },
  },
};
</script>


<style lang="scss" scoped>
</style>
