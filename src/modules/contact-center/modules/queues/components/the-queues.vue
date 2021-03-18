<template>
  <wt-page-wrapper class="queues" :actions-panel="false">
    <template slot="header">
      <object-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
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
              v-if="hasDeleteAccess"
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
            <template slot="state" slot-scope="{ item, index }">
              <wt-switcher
                :value="item.enabled"
                :disabled="!hasEditAccess"
                @change="patchItem({ item, index, prop: 'enabled', value: $event})"
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
              <edit-action
                v-if="hasEditAccess"
                @click="edit(item, index)"
              ></edit-action>
              <delete-action
                v-if="hasDeleteAccess"
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
import QueuePopup from './create-queue-popup.vue';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import QueueType from '../store/_internals/enums/QueueType.enum';
import getQueueSubRoute from '../store/_internals/scripts/getQueueSubRoute';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

export default {
  name: 'the-queues',
  mixins: [tableComponentMixin],
  components: { QueuePopup },
  data: () => ({
    namespace: 'ccenter/queues',
    isQueueSelectPopup: false,
  }),

  computed: {
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
  },

};
</script>

<style lang="scss" scoped>
</style>