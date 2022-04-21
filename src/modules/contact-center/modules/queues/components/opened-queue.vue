<template>
  <wt-page-wrapper :actions-panel="false" v-if="showQueuePage">
    <template slot="header">
      <object-header
        :hide-primary="!hasSaveActionAccess"
        :primary-action="save"
        :primary-disabled="computeDisabled"
        :primary-text="computePrimaryText"
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
          :namespace="namespace"
          :v="$v"
        ></component>
      </div>
    </template>
  </wt-page-wrapper>
  <wt-loader v-else></wt-loader>
</template>

<script>
import { QueueType } from 'webitel-sdk/esm2015/enums';
import { required, minValue } from 'vuelidate/lib/validators';
import OfflineQueueGeneral from './offline-queue/opened-offline-queue-general.vue';
import OfflineQueueTiming from './offline-queue/opened-offline-queue-timing.vue';
import InboundQueueGeneral from './inbound-queue/opened-inbound-queue-general.vue';
import InboundQueueTiming from './inbound-queue/opened-inbound-queue-timing.vue';
import OutboundIvrQueueGeneral from './outbound-ivr-queue/opened-outbound-ivr-general.vue';
import OutboundIvrQueueTiming from './outbound-ivr-queue/opened-outbound-ivr-timing.vue';
import PreviewDialerGeneral from './preview-dialer/opened-preview-dialer-general.vue';
import PreviewDialerTiming from './preview-dialer/opened-preview-dialer-timing.vue';
import ProgressiveDialerGeneral from './progressive-dialer/opened-progressive-dialer-general.vue';
import ProgressiveDialerTiming from './progressive-dialer/opened-progressive-dialer-timing.vue';
import PredictiveDialerGeneral from './predictive-dialer/opened-predictive-dialer-general.vue';
import PredictiveDialerTiming from './predictive-dialer/opened-predictive-dialer-timing.vue';
import ChatInboundQueueGeneral from './chat-inbound-queue/opened-chat-inbound-queue-general.vue';
import ChatInboundQueueTiming from './chat-inbound-queue/opened-chat-inbound-queue-timing.vue';
import InboundTaskQueueGeneral from './inbound-task-queue/opened-queue-inbound-task-queue-general.vue';
import InboundTaskQueueTiming from './inbound-task-queue/opened-queue-inbound-task-queue-timing.vue';
import Agents from '../modules/agents/components/opened-queue-agents.vue';
import Skills from '../modules/skills/components/opened-queue-skills.vue';
import Resources from '../modules/res-groups/components/opened-queue-resources.vue';
import Buckets from '../modules/buckets/components/opened-queue-buckets.vue';
import Hooks from '../modules/hooks/components/opened-queue-hooks.vue';
import Amd from './shared/amd/opened-queue-amd.vue';
import Variables from './shared/variables/opened-queue-variables.vue';
import Logs from '../modules/logs/components/opened-queue-logs.vue';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import QueueTypeProperties from '../lookups/QueueTypeProperties.lookup';

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
    InboundTaskQueueGeneral,
    InboundTaskQueueTiming,
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
      priority: { minValue: minValue(0) },
    };
    switch (+this.queueType) {
      case QueueType.OFFLINE_QUEUE:
        return {
          itemInstance: {
            ...defaults,
            strategy: { required },
            payload: {
              originateTimeout: { required, minValue: minValue(0) },
            },
          },
        };
      case QueueType.INBOUND_QUEUE:
        return {
          itemInstance: {
            ...defaults,
            payload: {
              timeBaseScore: { required },
              maxWaitTime: { required, minValue: minValue(0) },
              discardAbandonedAfter: { minValue: minValue(0) },
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
              originateTimeout: { required, minValue: minValue(0) },
              waitBetweenRetries: { required, minValue: minValue(0) },
              minDuration: { minValue: minValue(0) },
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
              originateTimeout: { required, minValue: minValue(0) },
              waitBetweenRetries: { required, minValue: minValue(0) },
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
              originateTimeout: { required, minValue: minValue(0) },
              waitBetweenRetries: { required, minValue: minValue(0) },
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
              originateTimeout: { required, minValue: minValue(0) },
              waitBetweenRetries: { required, minValue: minValue(0) },
              maxWaitTime: { minValue: minValue(0) },
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
              maxWaitTime: { required, minValue: minValue(0) },
              discardAbandonedAfter: { minValue: minValue(0) },
            },
          },
        };
      case QueueType.INBOUND_TASK_QUEUE:
        return {
          itemInstance: {
            ...defaults,
            strategy: { required },
            payload: {
              maxAttempts: { required },
              waitBetweenRetries: { required, minValue: minValue(0) },
            },
          },
        };
      default:
        return {};
    }
  },

  computed: {
    showQueuePage() {
      return !!this.itemInstance.type;
    },
    queueType() {
      return this.itemInstance.type;
    },

    tabs() {
      const general = (queue) => ({
        text: this.$t('objects.general'),
        value: `${queue}-general`,
      });
      const timing = (queue) => ({
        text: this.$t('objects.ccenter.queues.timing'),
        value: `${queue}-timing`,
      });
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

      const queueTabsMap = {
        [QueueType.OFFLINE_QUEUE]: [
          general('offline-queue'),
          timing('offline-queue'),
          agents,
          skills,
          resources,
          buckets,
          hooks,
        ],
        [QueueType.INBOUND_QUEUE]: [general('inbound-queue'), timing('inbound-queue'), agents, skills, hooks],
        [QueueType.OUTBOUND_IVR_QUEUE]: [
          general('outbound-ivr-queue'),
          timing('outbound-ivr-queue'),
          resources,
          buckets,
          hooks,
          amd,
        ],
        [QueueType.PREVIEW_DIALER]: [
          general('preview-dialer'),
          timing('preview-dialer'),
          agents,
          skills,
          resources,
          buckets,
          hooks,
        ],
        [QueueType.PROGRESSIVE_DIALER]: [
          general('progressive-dialer'),
          timing('progressive-dialer'),
          agents,
          skills,
          resources,
          buckets,
          hooks,
          amd,
        ],
        [QueueType.PREDICTIVE_DIALER]: [
          general('predictive-dialer'),
          timing('predictive-dialer'),
          agents,
          skills,
          resources,
          buckets,
          hooks,
          amd,
        ],
        [QueueType.CHAT_INBOUND_QUEUE]: [
          general('chat-inbound-queue'),
          timing('chat-inbound-queue'),
          agents,
          skills,
          hooks,
        ],
        [QueueType.INBOUND_TASK_QUEUE]: [
          general('inbound-task-queue'),
          timing('inbound-task-queue'),
          agents,
          skills,
          buckets,
          hooks,
        ],
      };
      const tabs = [
        // cannot destructure undefined, if queueType loading in progress
        ...(queueTabsMap[this.queueType] || []),
        variables,
        logs,
      ];

      if (this.id) tabs.push(this.permissionsTab);
      return tabs;
    },

    path() {
      const title = this.$t(QueueTypeProperties[this.queueType].locale);
      const queueUrl = QueueTypeProperties[this.queueType].subpath;
      const baseUrl = '/contact-center/queues';
      return [
        { name: this.$t('objects.ccenter.ccenter') },
        { name: this.$tc('objects.ccenter.queues.queues', 2), route: baseUrl },
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
      return this.loadItem(this.$route.query.type);
    },
  },
  watch: {
    tabs() {
      [this.currentTab] = this.tabs;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
