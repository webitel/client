<template>
  <wt-page-wrapper
    v-if="showQueuePage"
    :actions-panel="!!currentTab.filters"
  >
    <template #header>
      <wt-page-header
        :hide-primary="!hasSaveActionAccess"
        :primary-action="save"
        :primary-disabled="disabledSave"
        :primary-text="saveText"
        :secondary-action="close"
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>

    <template #actions-panel>
      <component
        :is="currentTab.filters"
        :namespace="currentTab.filtersNamespace"
      />
    </template>

    <template #main>
      <form
        class="tabs-page-wrapper"
        @submit.prevent="save"
      >
        <wt-tabs
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        />
        <component
          :is="currentTab.value"
          :namespace="namespace"
          :v="v$"
        />
        <input
          hidden
          type="submit"
        > <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
  <wt-loader v-else />
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { minValue, required } from '@vuelidate/validators';
import deepmerge from 'deepmerge';
import { QueueType } from 'webitel-sdk/esm2015/enums';
import QueuesRoutesName from '../router/_internals/QueuesRoutesName.enum.js';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import QueueTypeProperties from '../lookups/QueueTypeProperties.lookup';
import Agents from '../modules/agents/components/opened-queue-agents.vue';
import Buckets from '../modules/buckets/components/opened-queue-buckets.vue';
import Hooks from '../modules/hooks/components/opened-queue-hooks.vue';
import Logs from '../modules/logs/components/opened-queue-logs.vue';
import LogsFilters from '../modules/logs/modules/filters/components/the-queue-logs-filters.vue';
import Resources from '../modules/res-groups/components/opened-queue-resources.vue';
import Skills from '../modules/skills/components/opened-queue-skills.vue';
import General from './opened-queue-general.vue';
import Params from './opened-queue-params.vue';
import Processing from './opened-queue-processing.vue';
import Amd from './shared/amd/opened-queue-amd.vue';
import Variables from './shared/variables/opened-queue-variables.vue';

export default {
  name: 'OpenedQueue',
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
    LogsFilters,
  },
  mixins: [openedObjectMixin],
  setup: () => ({
    v$: useVuelidate(),
  }),

  data: () => ({
    namespace: 'ccenter/queues',
    routeName: RouteNames.QUEUES,
    permissionsTabPathName: QueuesRoutesName.PERMISSIONS,
  }),
  validations() {
    const defaults = {
      itemInstance: {
        name: { required },
        calendar: { required },
        priority: { minValue: minValue(0) },
        payload: {
          minOnlineAgents: { minValue: minValue(0) },
        },
      },
    };
    switch (+this.queueType) {
      case QueueType.OFFLINE_QUEUE:
        return deepmerge(defaults, {
          itemInstance: {
            strategy: { required },
            payload: {
              originateTimeout: { required, minValue: minValue(0) },
            },
          },
        });
      case QueueType.INBOUND_QUEUE:
        return deepmerge(defaults, {
          itemInstance: {
            payload: {
              timeBaseScore: { required },
              maxWaitTime: { required, minValue: minValue(0) },
              discardAbandonedAfter: { minValue: minValue(0) },
            },
          },
        });
      case QueueType.OUTBOUND_IVR_QUEUE:
        return deepmerge(defaults, {
          itemInstance: {
            strategy: { required },
            payload: {
              maxAttempts: { required },
              originateTimeout: { required, minValue: minValue(0) },
              waitBetweenRetries: { required, minValue: minValue(0) },
              minDuration: { minValue: minValue(0) },
            },
          },
        });
      case QueueType.PREVIEW_DIALER:
        return deepmerge(defaults, {
          itemInstance: {
            strategy: { required },
            payload: {
              maxAttempts: { required },
              originateTimeout: { required, minValue: minValue(0) },
              waitBetweenRetries: { required, minValue: minValue(0) },
            },
          },
        });
      case QueueType.PROGRESSIVE_DIALER:
        return deepmerge(defaults, {
          itemInstance: {
            strategy: { required },
            payload: {
              maxAttempts: { required },
              originateTimeout: { required, minValue: minValue(0) },
              waitBetweenRetries: { required, minValue: minValue(0) },
            },
          },
        });
      case QueueType.PREDICTIVE_DIALER:
        return deepmerge(defaults, {
          itemInstance: {
            strategy: { required },
            payload: {
              maxAttempts: { required },
              originateTimeout: { required, minValue: minValue(0) },
              waitBetweenRetries: { required, minValue: minValue(0) },
              maxWaitTime: { minValue: minValue(0) },
            },
          },
        });
      case QueueType.CHAT_INBOUND_QUEUE:
        return deepmerge(defaults, {
          itemInstance: {
            strategy: { required },
            payload: {
              timeBaseScore: { required },
              maxWaitTime: { required, minValue: minValue(0) },
              discardAbandonedAfter: { minValue: minValue(0) },
            },
          },
        });
      case QueueType.INBOUND_JOB_QUEUE:
        return deepmerge(defaults, {
          itemInstance: {
            strategy: { required },
            payload: {
              maxAttempts: { required },
              waitBetweenRetries: { required, minValue: minValue(0) },
            },
          },
        });
      case QueueType.OUTBOUND_JOB_QUEUE:
        return deepmerge(defaults, {
          itemInstance: {
            strategy: { required },
            payload: {
              maxAttempts: { required },
              originateTimeout: { required, minValue: minValue(0) },
              waitBetweenRetries: { required, minValue: minValue(0) },
              minDuration: { minValue: minValue(0) },
            },
          },
        });
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
        pathName: QueuesRoutesName.GENERAL,
      };
      const params = {
        text: this.$t('objects.ccenter.queues.params'),
        value: 'params',
        pathName: QueuesRoutesName.PARAMETERS,
      };
      const processing = {
        text: this.$t('objects.ccenter.queues.processing.processing'),
        value: 'processing',
        pathName: QueuesRoutesName.PROCESSING,
      };
      const agents = {
        text: this.$tc('objects.ccenter.agents.agents', 2),
        value: 'agents',
        pathName: QueuesRoutesName.AGENTS,
      };
      const skills = {
        text: this.$tc('objects.lookups.skills.skills', 2),
        value: 'skills',
        pathName: QueuesRoutesName.SKILLS,
      };
      const resources = {
        text: this.$tc('objects.ccenter.res.res', 2),
        value: 'resources',
        pathName: QueuesRoutesName.RESOURCES,
      };
      const buckets = {
        text: this.$tc('objects.lookups.buckets.buckets', 2),
        value: 'buckets',
        pathName: QueuesRoutesName.BUCKETS,
      };
      const hooks = {
        text: this.$tc('objects.ccenter.queues.hooks.hooks', 2),
        value: 'hooks',
        pathName: QueuesRoutesName.HOOKS,
      };
      const amd = {
        text: this.$t('objects.ccenter.queues.amd'),
        value: 'amd',
        pathName: QueuesRoutesName.AMD,
      };
      const variables = {
        text: this.$tc('objects.ccenter.queues.variables', 2),
        value: 'variables',
        pathName: QueuesRoutesName.VARIABLES,
      };
      const logs = {
        text: this.$tc('objects.ccenter.queues.logs.logs', 2),
        value: 'logs',
        filters: 'logs-filters',
        filtersNamespace: `${this.namespace}/log/filters`,
        pathName: QueuesRoutesName.LOGS,
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
      const baseUrl = '/contact-center/queues';
      return [
        { name: this.$t('objects.ccenter.ccenter') },
        { name: this.$tc('objects.ccenter.queues.queues', 2), route: baseUrl },
        {
          name: `${(this.id ? this.pathName : this.$t('objects.new'))} (${title})`,
          route: `${baseUrl}/${this.id ? this.id : 'new'}/${QueueTypeProperties[this.queueType].subpath}`,
        },
      ];
    },
  },
  methods: {
    async loadPageData() {
      const type = +(Object.entries(QueueTypeProperties).find(([type, { subpath }]) => {
        if (subpath === this.$route.params.type) {
          this.itemInstance.type = +type;
          return true;
        }
        return false;
      }).at(0));
      await this.setId(this.$route.params.id);
      return this.loadItem(type);
    },
    //   setStartTab() {
    //     const tab = this.tabs.find(({ value }) => value === this.$route.hash.slice(1));
    //     if (tab) this.currentTab = tab;
    //   },
    //   handleTabChange(tab) {
    //     this.currentTab = tab;
    //     /**
    //      * This method has an issue in it cause "filters reset" resets hash too
    //      */
    //     this.$router.push({ name: this.$route.name, hash: `#${this.currentTab.value}` });
    //   },
  },
  // created() {
  //   this.setStartTab();
  // },
};
</script>

<style lang="scss" scoped>
</style>
