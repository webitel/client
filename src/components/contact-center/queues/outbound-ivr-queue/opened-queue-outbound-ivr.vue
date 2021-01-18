<template>
  <wt-page-wrapper :actions-panel="currentTab.actionsPanel">
    <template slot="header">
      <wt-headline>
        <template slot="title">
          {{ $t('objects.ccenter.queues.outboundIVRQueue') }} |
          {{ computeTitle }}
        </template>
        <template slot="actions">
          <wt-button
            :disabled="computeDisabled"
            @click="save"
          >
            {{ computePrimaryText || $t('objects.addNew') }}
          </wt-button>
          <wt-button
              color="secondary"
              @click="close"
          >
            {{ $t('objects.close') }}
          </wt-button>
        </template>
      </wt-headline>
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
import OpenedQueueOutboundIvrGeneral from './opened-queue-outbound-ivr-general.vue';
import OpenedQueueOutboundIvrResources from '../opened-queue-resources.vue';
import OpenedQueueOutboundIvrVariables from '../opened-queue-variables.vue';
import OpenedQueueOutboundIvrTiming from './opened-queue-outbound-ivr-timing.vue';
import OpenedQueueOutboundIvrBuckets from '../opened-queue-buckets.vue';
import OpenedQueueOutboundIvrAmd from '../opened-queue-amd.vue';
import OpenedQueueOutboundIvrPermissions from '../opened-queue-permissions.vue';
import OpenedQueueOutboundIvrLogs from '../opened-queue-logs.vue';
import editComponentMixin from '../../../../mixins/editComponentMixin';
import QueueType from '../../../../store/modules/contact-center/queues/_internals/enums/QueueType.enum';

export default {
  name: 'opened-queue-outbound-ivr',
  components: {
    OpenedQueueOutboundIvrGeneral,
    OpenedQueueOutboundIvrResources,
    OpenedQueueOutboundIvrVariables,
    OpenedQueueOutboundIvrTiming,
    OpenedQueueOutboundIvrBuckets,
    OpenedQueueOutboundIvrAmd,
    OpenedQueueOutboundIvrLogs,
    OpenedQueueOutboundIvrPermissions,
  },
  mixins: [editComponentMixin],

  data: () => ({
    currentTab: {
      value: 'general',
      actionsPanel: false,
    },
  }),

  validations: {
    itemInstance: {
      name: { required },
      calendar: { required },
      strategy: { required },
      payload: {
        maxAttempts: { required },
        originateTimeout: { required },
        waitBetweenRetries: { required },
      },
    },
  },

  created() {
    this.setId(this.$route.params.id);
    this.loadItem(QueueType.OUTBOUND_IVR_QUEUE);
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
        actionsPanel: false,
      }, {
        text: this.$t('objects.ccenter.queues.timing'),
        value: 'timing',
        actionsPanel: false,
      }, {
        text: this.$tc('objects.ccenter.res.res', 2),
        value: 'resources',
        actionsPanel: false,
      }, {
        text: this.$tc('objects.ccenter.buckets.buckets', 2),
        value: 'buckets',
        actionsPanel: false,
      }, {
        text: this.$t('objects.ccenter.queues.amd'),
        value: 'amd',
        actionsPanel: false,
      }, {
        text: this.$tc('objects.ccenter.queues.variables', 2),
        value: 'variables',
        actionsPanel: false,
      }, {
        text: this.$tc('objects.ccenter.logs.logs', 1),
        value: 'logs',
        actionsPanel: true,
      }];

      const permissions = {
        text: this.$tc('objects.permissions.permissions', 2),
        value: 'permissions',
        actionsPanel: false,
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

    close() {
      this.resetState();
      this.$router.go(-1);
    },
  },
};
</script>


<style lang="scss" scoped>
</style>
