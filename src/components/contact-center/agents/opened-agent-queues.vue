<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.ccenter.queues.queues', 2) }}</h3>
      <div class="content-header__actions-wrap">
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        ></wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <div v-show="isLoaded" class="table-wrapper">
      <wt-table
        :data="dataList"
        :headers="headers"
        :grid-actions="false"
        :selectable="false"
      >
        <template slot="name" slot-scope="{ item }">
          <div v-if="item.queue">
            {{ item.queue.name }}
          </div>
        </template>

        <template slot="type" slot-scope="{ item }">
          {{ computeQueueType(item.type) }}
        </template>

        <template slot="count" slot-scope="{ item }">
          {{ item.countMember }}
        </template>

        <template slot="waiting" slot-scope="{ item }">
          {{ item.waitingMember }}
        </template>

        <template slot="strategy" slot-scope="{ item }">
          {{ computeStrategy(item.strategy) }}
        </template>
      </wt-table>
      <wt-pagination
        :next="isNext"
        :prev="page > 1"
        :size="size"
        debounce
        @change="loadList"
        @input="setSize"
        @next="nextPage"
        @prev="prevPage"
      ></wt-pagination>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import openedObjectTableTabMixin from '../../../mixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import QueueType from '../../../store/modules/contact-center/queues/_internals/enums/QueueType.enum';

export default {
  name: 'opened-agent-queues',
  mixins: [openedObjectTableTabMixin],
  data: () => ({
    subNamespace: 'queues',
  }),

  computed: {
    ...mapState('ccenter/agents', {
      parentId: (state) => state.itemId,
    }),
    ...mapState('ccenter/agents/queues', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      size: (state) => state.size,
      search: (state) => state.search,
      isNext: (state) => state.isNextPage,
    }),
    headers() {
      return [
        { value: 'name', text: this.$tc('objects.ccenter.queues.queues', 2) },
        { value: 'type', text: this.$t('objects.ccenter.queues.type') },
        { value: 'count', text: this.$tc('objects.ccenter.queues.members', 2) },
        { value: 'waiting', text: this.$t('objects.ccenter.queues.waiting') },
        { value: 'strategy', text: this.$t('objects.ccenter.queues.strategy') },
      ];
    },
  },

  methods: {
    computeQueueType(type) {
      switch (type) {
        case QueueType.OFFLINE_QUEUE:
          return 'Offline Queue';
        case QueueType.INBOUND_QUEUE:
          return 'Inbound Queue';
        case QueueType.OUTBOUND_IVR_QUEUE:
          return 'Outbound IVR Queue';
        case QueueType.PREVIEW_DIALER:
          return 'Preview Dialer';
        case QueueType.PROGRESSIVE_DIALER:
          return 'Progressive Dialer';
        case QueueType.PREDICTIVE_DIALER:
          return 'Predictive Dialer';
        case QueueType.CHAT_INBOUND_QUEUE:
          return 'Predictive Dialer';
        case QueueType.TASK_QUEUE:
          return 'Predictive Dialer';
        default:
          return 'Unknown';
      }
    },

    computeStrategy(strategy) {
      switch (strategy) {
        case 'random':
          return 'Random';
        case 'strict-circuit':
          return 'Strict circuit';
        case 'next-try-circuit':
          return 'Next try circuit';
        case 'by-buckets':
          return 'By buckets';
        case 'by-skills':
          return 'By skills';
        default:
          return 'Unknown';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
