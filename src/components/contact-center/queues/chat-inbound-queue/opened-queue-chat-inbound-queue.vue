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
import { mapActions, mapState } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import OpenedQueueChatInboundQueueGeneral from './opened-queue-chat-inbound-queue-general.vue';
import OpenedQueueChatInboundQueueVariables from '../opened-queue-variables.vue';
import OpenedQueueChatInboundQueueLogs from '../opened-queue-logs.vue';
import OpenedQueueChatInboundQueueTiming from './opened-queue-chat-inbound-queue-timing.vue';
import OpenedQueueChatInboundQueuePermissions from '../opened-queue-permissions.vue';
import editComponentMixin from '../../../../mixins/editComponentMixin';
import QueueType from '../../../../store/modules/contact-center/queues/_internals/enums/QueueType.enum';

export default {
  name: 'opened-queue-chat-inbound-queue',
  mixins: [editComponentMixin],
  components: {
    OpenedQueueChatInboundQueueGeneral,
    OpenedQueueChatInboundQueueVariables,
    OpenedQueueChatInboundQueueLogs,
    OpenedQueueChatInboundQueuePermissions,
    OpenedQueueChatInboundQueueTiming,
  },

  data: () => ({
    currentTab: {
      value: 'general',
    },
  }),

  validations: {
    itemInstance: {
      name: { required },
      calendar: { required },
      team: { required },
      strategy: { required },
      payload: {
        timeBaseScore: { required },
        maxWaitTime: { required },
      },
    },
  },

  created() {
    this.setId(this.$route.params.id);
    this.loadItem(QueueType.CHAT_INBOUND_QUEUE);
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
        text: this.$tc('objects.ccenter.queues.variables', 2),
        value: 'variables',
      }, {
        text: this.$tc('objects.ccenter.logs.logs', 2),
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
          name: `${(this.id ? this.itemInstance.name : this.$t('objects.new'))} (${this.$t('objects.ccenter.queues.chatInboundQueue')})`,
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
@import '../../../../assets/css/objects/table-page';
</style>
