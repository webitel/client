<template>
  <wt-page-wrapper class="queues" :actions-panel="false">
    <template slot="header">
      <object-header :primary-action="create">
        <headline-nav :path="path"></headline-nav>
      </object-header>
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
              v-if="isDeleteAccess"
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
              <wt-icon-btn
                class="table-action"
                icon="queue-member"
                :tooltip="$t('iconHints.members')"
                tooltip-position="left"
                @click="openMembers(item)"
              ></wt-icon-btn>
              <wt-icon-btn
                class="table-action"
                icon="edit"
                :tooltip="$t('iconHints.edit')"
                tooltip-position="left"
                @click="edit(item)"
              ></wt-icon-btn>
              <delete-action
                v-if="isDeleteAccess"
                @click="remove(index)"
              ></delete-action>
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
import tableActionsHandlerMixin from '../../../mixins/baseTableMixin/tableActionsMixin';
import tableComponentMixin from '../../../mixins/tableComponentMixin';
import QueueType from '../../../store/modules/contact-center/queues/_internals/enums/QueueType.enum';
import getQueueSubRoute from '../../../store/modules/contact-center/queues/_internals/scripts/getQueueSubRoute';
import RouteNames from '../../../router/_internals/RouteNames.enum';

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
    path() {
      return [
        { name: this.$t('objects.ccenter.ccenter') },
        { name: this.$tc('objects.ccenter.queues.queues', 2), route: '/contact-center/queues' },
      ];
    },
  },

  methods: {
    openMembers(item) {
      this.$router.push({
        name: `${RouteNames.MEMBERS}`,
        params: { queueId: item.id },
      });
    },

    changeQueueState({ item, value }) {
      const prop = 'enabled';
      const index = this.dataList.indexOf(item);
      this.patchProperty({ index, prop, value });
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
        case QueueType.TASK_QUEUE:
          return 'Task Queue';
        default:
          return 'Unknown';
      }
    },

    create() {
      this.isQueueSelectPopup = true;
    },

    edit(item) {
      const type = getQueueSubRoute(item.type);
      this.$router.push({
        name: `${RouteNames.QUEUES}-${type}-edit`,
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
