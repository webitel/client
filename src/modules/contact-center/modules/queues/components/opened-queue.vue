<template>
  <wt-page-wrapper :actions-panel="false" v-if="showQueuePage">
    <template v-slot:header>
      <object-header
        :hide-primary="!hasSaveActionAccess"
        :primary-action="save"
        :primary-disabled="disabledSave"
        :primary-text="saveText"
        :secondary-action="close"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </object-header>
    </template>

    <template v-slot:main>
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
import General from './opened-queue-general.vue';
import Params from './opened-queue-params.vue';
import Processing from './opened-queue-processing.vue';
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
    General,
    Params,
    Processing,
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
      case QueueType.INBOUND_JOB_QUEUE:
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
      case QueueType.OUTBOUND_JOB_QUEUE:
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
      default:
        return {};
    }
  },

  computed: {
    showQueuePage() {
      return this.itemInstance.type != null;
    },
    queueType() {
      return this.itemInstance.type;
    },

    tabs() {
      const general = {
        text: this.$t('objects.general'),
        value: 'general',
      };
      const params = {
        text: this.$t('objects.ccenter.queues.params'),
        value: 'params',
      };
      const processing = {
        text: this.$t('objects.ccenter.queues.processing.processing'),
        value: 'processing',
      };
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
        [QueueType.OFFLINE_QUEUE]: [processing, agents, skills, resources, buckets],
        [QueueType.INBOUND_QUEUE]: [processing, agents, skills],
        [QueueType.OUTBOUND_IVR_QUEUE]: [resources, buckets, amd],
        [QueueType.PREVIEW_DIALER]: [processing, agents, skills, resources, buckets],
        [QueueType.PROGRESSIVE_DIALER]: [processing, agents, skills, resources, buckets, amd],
        [QueueType.PREDICTIVE_DIALER]: [processing, agents, skills, resources, buckets, amd],
        [QueueType.CHAT_INBOUND_QUEUE]: [processing, agents, skills],
        [QueueType.INBOUND_JOB_QUEUE]: [processing, agents, skills, buckets],
        [QueueType.OUTBOUND_JOB_QUEUE]: [buckets],
      };
      const tabs = [
        general,
        params,
        // cannot destructure undefined, if queueType loading in progress
        ...(queueTabsMap[this.queueType] || []),
        hooks,
        variables,
      ];

      if (this.id) tabs.push(this.permissionsTab, logs);
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
};
</script>

<style lang="scss" scoped>
</style>
