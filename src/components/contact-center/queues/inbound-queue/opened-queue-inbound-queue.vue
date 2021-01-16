<template>
  <wt-page-wrapper :actions-panel="false">
    <template slot="header">
      <wt-headline>
        <template slot="title">
          {{ $t('objects.ccenter.queues.inboundQueue') }} |
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
            {{ computePrimaryText }}
          </wt-button>
        </template>
      </wt-headline>
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
import openedQueueInboundQueueGeneral from './opened-queue-inbound-queue-general.vue';
import openedQueueInboundQueueVariables from '../opened-queue-variables.vue';
import openedQueueInboundQueueLogs from '../opened-queue-logs.vue';
import openedQueueInboundQueueTiming from './opened-queue-inbound-queue-timing.vue';
import openedQueueInboundQueuePermissions from '../opened-queue-permissions.vue';
import editComponentMixin from '../../../../mixins/editComponentMixin';

export default {
  name: 'opened-queue-inbound-queue',
  mixins: [editComponentMixin],
  components: {
    openedQueueInboundQueueGeneral,
    openedQueueInboundQueueVariables,
    openedQueueInboundQueueLogs,
    openedQueueInboundQueuePermissions,
    openedQueueInboundQueueTiming,
  },

  data: () => ({
    currentTab: {
      value: 'general',
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
      team: {
        required,
      },
    },
  },

  created() {
    this.id = this.$route.params.id;
    this.loadItem('inbound-queue');
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
@import '../../../../assets/css/objects/table-page';
</style>
