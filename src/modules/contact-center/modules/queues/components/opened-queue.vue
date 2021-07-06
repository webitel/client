<template>
  <wt-page-wrapper :actions-panel="false">
    <template slot="header">
      <object-header
        :primary-action="save"
        :primary-text="computePrimaryText"
        :hide-primary="!hasSaveActionAccess"
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
          :is="currentTab.value"
          :v="$v"
          :namespace="namespace"
        ></component>
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import OfflineQueueGeneral from './offline-queue/opened-queue-offline-queue-general.vue';
import OfflineQueueTiming from './offline-queue/opened-queue-offline-queue-timing.vue';
import InboundQueueGeneral from './inbound-queue/opened-queue-inbound-queue-general.vue';
import InboundQueueTiming from './inbound-queue/opened-queue-inbound-queue-timing.vue';
import OutboundIvrQueueGeneral from './outbound-ivr-queue/opened-queue-outbound-ivr-general.vue';
import OutboundIvrQueueTiming from './outbound-ivr-queue/opened-queue-outbound-ivr-timing.vue';
import PreviewDialerGeneral from './preview-dialer/opened-queue-preview-dialer-general.vue';
import PreviewDialerTiming from './preview-dialer/opened-queue-preview-dialer-timing.vue';
import ProgressiveDialerGeneral from './progressive-dialer/opened-queue-progressive-dialer-general.vue';
import ProgressiveDialerTiming from './progressive-dialer/opened-queue-progressive-dialer-timing.vue';
import PredictiveDialerGeneral from './predictive-dialer/opened-queue-predictive-dialer-general.vue';
import PredictiveDialerTiming from './predictive-dialer/opened-queue-predictive-dialer-timing.vue';
import ChatInboundQueueGeneral from './chat-inbound-queue/opened-queue-chat-inbound-queue-general.vue';
import ChatInboundQueueTiming from './chat-inbound-queue/opened-queue-chat-inbound-queue-timing.vue';
import TaskQueueGeneral from './task-queue/opened-queue-task-queue-general.vue';
import TaskQueueTiming from './task-queue/opened-queue-task-queue-timing.vue';
import Agents from '../modules/agents/components/opened-queue-agents.vue';
import Skills from '../modules/skills/components/opened-queue-skills.vue';
import Resources from '../modules/res-groups/components/opened-queue-resources.vue';
import Buckets from '../modules/buckets/components/opened-queue-buckets.vue';
import Hooks from '../modules/hooks/components/opened-queue-hooks.vue';
import Amd from './shared/amd/opened-queue-amd.vue';
import Variables from './shared/variables/opened-queue-variables.vue';
import Logs from '../modules/logs/components/opened-queue-logs.vue';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import QueueType from '../store/_internals/enums/QueueType.enum';

export default {
  name: 'opened-queue',
  mixins: [openedObjectMixin],
  components: {
    OfflineQueueGeneral,
    OfflineQueueTiming,
    InboundQueueGeneral,
    InboundQueueTiming,
    OutboundIvrQueueGeneral,
    OutboundIvrQueueTiming,
    PreviewDialerGeneral,
    PreviewDialerTiming,
    ProgressiveDialerGeneral,
    ProgressiveDialerTiming,
    PredictiveDialerGeneral,
    PredictiveDialerTiming,
    ChatInboundQueueGeneral,
    ChatInboundQueueTiming,
    TaskQueueGeneral,
    TaskQueueTiming,
    Agents,
    Skills,
    Resources,
    Buckets,
    Hooks,
    Amd,
    Variables,
    Logs,
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
      const agents = {
        text: this.$tc('objects.ccenter.agents.agents', 2),
        value: 'agents',
      };
      const skills = {
        text: this.$tc('objects.lookups.skills.skills', 2),
        value: 'skills',
      };
      const resources = {
        text: this.$tc('objects.ccenter.res.res', 2),
        value: 'resources',
      };
      const buckets = {
        text: this.$tc('objects.lookups.buckets.buckets', 2),
        value: 'buckets',
      };
      const hooks = {
        text: this.$tc('objects.ccenter.queues.hooks.hooks', 2),
        value: 'hooks',
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
        text: this.$tc('objects.ccenter.queues.logs.logs', 2),
        value: 'logs',
      };
      const offlineQueueTabs = [{
        text: this.$t('objects.general'),
        value: 'offline-queue-general',
      }, {
        text: this.$t('objects.ccenter.queues.timing'),
        value: 'offline-queue-timing',
      }, agents, skills, resources, buckets, hooks];

      const inboundQueueTabs = [{
        text: this.$t('objects.general'),
        value: 'inbound-queue-general',
      }, {
        text: this.$t('objects.ccenter.queues.timing'),
        value: 'inbound-queue-timing',
      }, agents, skills, hooks];

      const outboundIVRQueueTabs = [{
        text: this.$t('objects.general'),
        value: 'outbound-ivr-queue-general',
      }, {
        text: this.$t('objects.ccenter.queues.timing'),
        value: 'outbound-ivr-queue-timing',
      }, resources, buckets, hooks, amd];

      const previewDialerTabs = [{
        text: this.$t('objects.general'),
        value: 'preview-dialer-general',
      }, {
        text: this.$t('objects.ccenter.queues.timing'),
        value: 'preview-dialer-timing',
      }, agents, skills, resources, buckets, hooks];

      const progressiveDialerTabs = [{
        text: this.$t('objects.general'),
        value: 'progressive-dialer-general',
      }, {
        text: this.$t('objects.ccenter.queues.timing'),
        value: 'progressive-dialer-timing',
      }, agents, skills, resources, buckets, hooks, amd];

      const predictiveDialerTabs = [{
        text: this.$t('objects.general'),
        value: 'predictive-dialer-general',
      }, {
        text: this.$t('objects.ccenter.queues.timing'),
        value: 'predictive-dialer-timing',
      }, agents, skills, resources, buckets, hooks, amd];

      const chatInboundQueueTabs = [{
        text: this.$t('objects.general'),
        value: 'chat-inbound-queue-general',
      }, {
        text: this.$t('objects.ccenter.queues.timing'),
        value: 'chat-inbound-queue-timing',
      }, agents, skills, hooks];

      const taskQueueTabs = [{
        text: this.$t('objects.general'),
        value: 'task-queue-general',
      }, {
        text: this.$t('objects.ccenter.queues.timing'),
        value: 'task-queue-timing',
      }, agents, skills, buckets, hooks];

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
      if (this.id) tabs.push(this.permissionsTab);
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
