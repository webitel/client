<template>
  <wt-page-wrapper :actions-panel="false">
    <template slot="header">
      <object-header
        :primaryText="computePrimaryText"
        :primaryAction="save"
        :primaryDisabled="computeDisabled"
        close
        @close="resetState"
      >
        <headline-nav :path="path"></headline-nav>
      </object-header>
    </template>
    <template slot="main">
      <div class="tabs-page-wrapper">
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        >
        </wt-tabs>
        <component
          :is="$options.name + '-' + currentTab.value"
          :v="$v"
        ></component>
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapActions, mapState } from 'vuex';
import OpenedQueuePredictiveDialerGeneral from './opened-queue-predictive-dialer-general.vue';
import OpenedQueuePredictiveDialerResources from '../opened-queue-resources.vue';
import OpenedQueuePredictiveDialerVariables from '../opened-queue-variables.vue';
import OpenedQueuePredictiveDialerTiming from './opened-queue-predictive-dialer-timing.vue';
import OpenedQueuePredictiveDialerBuckets from '../opened-queue-buckets.vue';
import OpenedQueuePredictiveDialerAmd from '../opened-queue-amd.vue';
import OpenedQueuePredictiveDialerPermissions from '../opened-queue-permissions.vue';
import OpenedQueuePredictiveDialerLogs from '../opened-queue-logs.vue';
import editComponentMixin from '../../../../mixins/editComponentMixin';
import QueueType from '../../../../store/modules/contact-center/queues/_internals/enums/QueueType.enum';

export default {
  name: 'opened-queue-predictive-dialer',
  components: {
    OpenedQueuePredictiveDialerGeneral,
    OpenedQueuePredictiveDialerResources,
    OpenedQueuePredictiveDialerVariables,
    OpenedQueuePredictiveDialerTiming,
    OpenedQueuePredictiveDialerBuckets,
    OpenedQueuePredictiveDialerAmd,
    OpenedQueuePredictiveDialerLogs,
    OpenedQueuePredictiveDialerPermissions,
  },
  mixins: [editComponentMixin],

  data: () => ({
    currentTab: {
      value: 'general',
    },
  }),

  validations: {
    itemInstance: {
      name: { required },
      calendar: { required },
      strategy: { required },
      team: { required },
      payload: {
        maxAttempts: { required },
        originateTimeout: { required },
        waitBetweenRetries: { required },
      },
    },
  },

  mounted() {
    this.setId(this.$route.params.id);
    this.loadItem(QueueType.PREDICTIVE_DIALER);
  },

  computed: {
    ...mapState('ccenter/queues', {
      itemInstance: (state) => state.itemInstance,
      id: (state) => state.itemId,
    }),

    tabs() {
      const tabs = [{
        text: this.$t('objects.general'),
        value: 'general',
      }, {
        text: this.$t('objects.ccenter.queues.timing'),
        value: 'timing',
      }, {
        text: this.$tc('objects.ccenter.res.res', 2),
        value: 'resources',
      }, {
        text: this.$tc('objects.ccenter.buckets.buckets', 2),
        value: 'buckets',
      }, {
        text: this.$t('objects.ccenter.queues.amd'),
        value: 'amd',
      }, {
        text: this.$tc('objects.ccenter.queues.variables', 2),
        value: 'variables',
      }, {
        text: this.$tc('objects.ccenter.logs.logs', 1),
        value: 'logs',
      }];

      const permissions = {
        text: this.$tc('objects.permissions.permissions', 2),
        value: 'permissions',
      };

      if (this.id) tabs.push(permissions);
      return tabs;
    },

    path() {
      return [
        { name: this.$t('objects.ccenter.ccenter') },
        { name: this.$tc('objects.ccenter.queues.queues', 2), route: '/contact-center/queues' },
        {
          name: `${(this.id ? this.itemInstance.name : this.$t('objects.new'))} (${this.$t('objects.ccenter.queues.predictiveDialer')})`,
          route: this.id ? `/contact-center/queues/${this.id}` : '/contact-center/queues/new',
        },
      ];
    },
  },

  methods: {
    ...mapActions('ccenter/queues', {
      setId: 'SET_ITEM_ID',
      loadItem: 'LOAD_ITEM',
      addItem: 'ADD_ITEM',
      updateItem: 'UPDATE_ITEM',
      resetState: 'RESET_ITEM_STATE',
    }),
  },
};
</script>


<style lang="scss" scoped>
</style>
