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
              color="secondary"
              @click="close"
          >
            {{ $t('objects.close') }}
          </wt-button>
          <wt-button
              :disabled="computeDisabled"
              @click="save"
          >
            {{ computePrimaryText || $t('objects.addNew') }}
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
import editComponentMixin from '@/mixins/editComponentMixin';
import { required } from 'vuelidate/lib/validators';
import { mapActions, mapState } from 'vuex';
import OpenedQueueOutboundIvrGeneral from './opened-queue-outbound-ivr-general';
import openedQueueOutboundIvrResources from '../opened-queue-resources';
import openedQueueOutboundIvrVariables from '../opened-queue-variables';
import openedQueueOutboundIvrTiming from './opened-queue-outbound-ivr-timing';
import openedQueueOutboundIvrBuckets from '../opened-queue-buckets';
import openedQueueOutboundIvrAmd from '../opened-queue-amd';
import openedQueueOutboundIvrPermissions from '../opened-queue-permissions';
import openedQueueOutboundIvrLogs from '../opened-queue-logs';

export default {
  name: 'opened-queue-outbound-ivr',
  components: {
    OpenedQueueOutboundIvrGeneral,
    openedQueueOutboundIvrResources,
    openedQueueOutboundIvrVariables,
    openedQueueOutboundIvrTiming,
    openedQueueOutboundIvrBuckets,
    openedQueueOutboundIvrAmd,
    openedQueueOutboundIvrLogs,
    openedQueueOutboundIvrPermissions,
  },
  mixins: [editComponentMixin],

  data: () => ({
    currentTab: {
      value: 'general',
      actionsPanel: false,
    },
  }),

  // by vuelidate
  validations: {
    itemInstance: {
      name: {
        required,
      },
      calendar: {
        required,
      },
      strategy: {
        required,
      },
    },
  },

  created() {
    this.id = this.$route.params.id;
    this.loadItem('outbound-ivr');
  },

  computed: {
    ...mapState('ccenter/queues', {
      itemInstance: (state) => state.itemInstance,
    }),
    id: {
      get() {
        return this.$store.state.ccenter.queues.itemId;
      },
      set(value) {
        this.setId(value);
      },
    },

    tabs() {
      const tabs = [{
        text: this.$t('objects.general'),
        value: 'general',
        actionsPanel: false,
      }, {
        text: this.$tc('objects.ccenter.res.res', 2),
        value: 'resources',
        actionsPanel: false,
      }, {
        text: this.$tc('objects.ccenter.queues.variables', 2),
        value: 'variables',
        actionsPanel: false,
      }, {
        text: this.$t('objects.ccenter.queues.timing'),
        value: 'timing',
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
    back() {
      this.$router.go(-1);
    },

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
@import '../../../../assets/css/objects/table-page';
</style>
