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
        {{ $t('objects.ccenter.queues.progressiveDialer') }} |
        {{ computeTitle }}
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
import OpenedQueueProgressiveDialerGeneral from './opened-queue-progressive-dialer-general.vue';
import OpenedQueueProgressiveDialerResources from '../opened-queue-resources.vue';
import OpenedQueueProgressiveDialerVariables from '../opened-queue-variables.vue';
import OpenedQueueProgressiveDialerTiming from './opened-queue-progressive-dialer-timing.vue';
import OpenedQueueProgressiveDialerBuckets from '../opened-queue-buckets.vue';
import OpenedQueueProgressiveDialerAmd from '../opened-queue-amd.vue';
import OpenedQueueProgressiveDialerPermissions from '../opened-queue-permissions.vue';
import OpenedQueueProgressiveDialerLogs from '../opened-queue-logs.vue';
import editComponentMixin from '../../../../mixins/editComponentMixin';
import QueueType from '../../../../store/modules/contact-center/queues/_internals/enums/QueueType.enum';

export default {
  name: 'opened-queue-progressive-dialer',
  components: {
    OpenedQueueProgressiveDialerGeneral,
    OpenedQueueProgressiveDialerResources,
    OpenedQueueProgressiveDialerVariables,
    OpenedQueueProgressiveDialerTiming,
    OpenedQueueProgressiveDialerBuckets,
    OpenedQueueProgressiveDialerAmd,
    OpenedQueueProgressiveDialerLogs,
    OpenedQueueProgressiveDialerPermissions,
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
    this.loadItem(QueueType.PROGRESSIVE_DIALER);
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
