<template>
  <wt-page-wrapper class="queues" :actions-panel="false">
    <template slot="header">
      <wt-headline>
        <template slot="title">
          {{ $t('objects.ccenter.ccenter') }} |
          {{ $tc('objects.ccenter.queues.queues', 2) }}
        </template>
        <template slot="actions">
          <wt-button @click="create">
            {{ $t('objects.add') }}
          </wt-button>
        </template>
      </wt-headline>
    </template>
    <template slot="main">
      <queue-popup
        v-if="isQueueSelectPopup"
        @close="isQueueSelectPopup = false"
      ></queue-popup>

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">{{ $t('objects.ccenter.queues.allQueues') }}</h3>
          <div class="content-header__actions-wrap">
            <wt-search-bar
              :value="search"
              debounce
              @input="setSearch"
              @search="loadList"
              @enter="loadList"
            ></wt-search-bar>
            <wt-icon-btn
              class="icon-action"
              :class="{'hidden': anySelected}"
              icon="bucket"
              :tooltip="$t('iconHints.deleteSelected')"
              @click="deleteSelected"
            ></wt-icon-btn>
            <wt-table-actions
              :icons="['refresh']"
              @input="tableActionsHandler"
            ></wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded"></wt-loader>
        <div class="table-wrapper" v-show="isLoaded">
          <wt-table
            :headers="headers"
            :data="dataList"
          >
            <template slot="name" slot-scope="{ item }">
          <span class="nameLink" @click="edit(item)">
            {{ item.name }}
          </span>
            </template>

            <template slot="type" slot-scope="{ item }">
              {{ computeQueueType(item.type) }}
            </template>
            <template slot="activeCalls" slot-scope="{ item }">
              {{ item.active }}
            </template>
            <template slot="waiting" slot-scope="{ item }">
              {{ item.waiting }}
            </template>
            <template slot="priority" slot-scope="{ item }">
              {{ item.priority }}
            </template>
            <template slot="state" slot-scope="{ item }">
              <wt-switcher
                :value="item.enabled"
                @change="changeQueueState({item, value: $event})"
              ></wt-switcher>
            </template>
            <template slot="actions" slot-scope="{ item, index }">
              <i class="vuetable-action icon-icon_nav-directory"
                 :title="$t('iconHints.members')"
                 @click="openMembers(item)"
              ></i>
              <wt-icon-btn
                class="table-action"
                icon="edit"
                @click="edit(item)"
              ></wt-icon-btn>
              <wt-icon-btn
                class="table-action"
                icon="bucket"
                @click="remove(index)"
              ></wt-icon-btn>
            </template>
          </wt-table>
          <wt-pagination
            :size="size"
            :next="isNext"
            :prev="page > 1"
            debounce
            @next="nextPage"
            @prev="prevPage"
            @input="setSize"
            @change="loadList"
          ></wt-pagination>
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import QueuePopup from './create-queue-popup.vue';
import tableActionsHandlerMixin from '../../../mixins/tableActionsMixin';
import tableComponentMixin from '../../../mixins/tableComponentMixin';
import QueueType from '../../../store/modules/contact-center/queues/_internals/enums/QueueType.enum';

export default {
  name: 'the-queues',
  mixins: [tableComponentMixin, tableActionsHandlerMixin],
  components: { QueuePopup },
  data: () => ({
    isQueueSelectPopup: false,
  }),

  computed: {
    ...mapState('ccenter/queues', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      size: (state) => state.size,
      search: (state) => state.search,
      isNext: (state) => state.isNextPage,
    }),
    headers() {
      return [
        { value: 'name', text: this.$t('objects.name') },
        { value: 'type', text: this.$t('objects.ccenter.queues.type') },
        { value: 'activeCalls', text: this.$t('objects.ccenter.queues.activeCalls') },
        { value: 'waiting', text: this.$t('objects.ccenter.queues.waiting') },
        { value: 'priority', text: this.$t('objects.ccenter.queues.priority') },
        { value: 'state', text: this.$t('objects.ccenter.queues.state') },
      ];
    },
  },

  methods: {
    openMembers(item) {
      this.$router.push({
        name: 'cc-queue-members',
        params: { queueId: item.id },
      });
    },

    changeQueueState({ item, value }) {
      const prop = 'enabled';
      const index = this.dataList.indexOf(item);
      this.patchProperty({index, prop, value });
    },

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
          return 'Chat Inbound Queue';
        default:
          return 'Unknown';
      }
    },

    create() {
      this.isQueueSelectPopup = true;
    },

    edit(item) {
      let type;
      switch (item.type) {
        case QueueType.OFFLINE_QUEUE:
          type = 'offline-queue';
          break;
        case QueueType.INBOUND_QUEUE:
          type = 'inbound-queue';
          break;
        case QueueType.OUTBOUND_IVR_QUEUE:
          type = 'outbound-ivr';
          break;
        case QueueType.PREVIEW_DIALER:
          type = 'preview-dialer';
          break;
        case QueueType.PROGRESSIVE_DIALER:
          type = 'progressive-dialer';
          break;
        case QueueType.PREDICTIVE_DIALER:
          type = 'predictive-dialer';
          break;
        case QueueType.CHAT_INBOUND_QUEUE:
          type = 'chat-inbound-queue';
          break;
        default:
          type = 'unknown';
      }
      this.$router.push({
        name: `cc-queue-${type}-edit`,
        params: { id: item.id },
      });
    },

    ...mapActions('ccenter/queues', {
      loadDataList: 'LOAD_DATA_LIST',
      setSize: 'SET_SIZE',
      setSearch: 'SET_SEARCH',
      nextPage: 'NEXT_PAGE',
      prevPage: 'PREV_PAGE',
      patchProperty: 'PATCH_ITEM_PROPERTY',
      removeItem: 'REMOVE_ITEM',
    }),
  },

};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/objects/table-page';
</style>
