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
      <delete-confirmation-popup
        v-show="deleteConfirmation.isDeleteConfirmationPopup"
        :payload="deleteConfirmation"
        @close="closeDelete"
      ></delete-confirmation-popup>

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
              :tooltip="actionPanelDeleteTooltip"
              @click="callDelete(selectedRows)"
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
            :grid-actions="hasTableActions"
            sortable
            @sort="sort"
          >
            <template slot="name" slot-scope="{ item }">
              <span class="nameLink" @click="edit(item)">
                {{ item.name }}
              </span>
            </template>

            <template slot="type" slot-scope="{ item }">
              {{ queueTypeLocale[item.type] }}
            </template>
            <template slot="activeCalls" slot-scope="{ item }">
              {{ item.active }}
            </template>
            <template slot="waiting" slot-scope="{ item }">
              {{ item.waiting }}
            </template>
            <template slot="priority" slot-scope="{ item } ">
              {{ item.priority }}
            </template>
            <template slot="team" slot-scope="{ item } ">
              <item-link v-if="item.team" :link="itemTeamLink(item)" target="_blank">
                {{ item.team.name }}
              </item-link>
            </template>
            <template slot="state" slot-scope="{ item, index }">
              <wt-switcher
                :value="item.enabled"
                :disabled="!hasEditAccess"
                @change="patchItem({ item, index, prop: 'enabled', value: $event})"
              ></wt-switcher>
            </template>
            <template slot="actions" slot-scope="{ item }">
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
                @click="callDelete(item)"
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
import tableComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
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
    path() {
      return [
        { name: this.$t('objects.ccenter.ccenter') },
        { name: this.$tc('objects.ccenter.queues.queues', 2), route: '/contact-center/queues' },
      ];
    },

    queueTypeLocale() {
      return {
        [QueueType.OFFLINE_QUEUE]: this.$t('objects.ccenter.queues.offlineQueue'),
        [QueueType.INBOUND_QUEUE]: this.$t('objects.ccenter.queues.inboundQueue'),
        [QueueType.OUTBOUND_IVR_QUEUE]: this.$t('objects.ccenter.queues.outboundIVRQueue'),
        [QueueType.PREVIEW_DIALER]: this.$t('objects.ccenter.queues.previewDialer'),
        [QueueType.PROGRESSIVE_DIALER]: this.$t('objects.ccenter.queues.progressiveDialer'),
        [QueueType.PREDICTIVE_DIALER]: this.$t('objects.ccenter.queues.predictiveDialer'),
        [QueueType.CHAT_INBOUND_QUEUE]: this.$t('objects.ccenter.queues.chatInboundQueue'),
        [QueueType.TASK_QUEUE]: this.$t('objects.ccenter.queues.taskQueue'),
      };
    },
  },

  methods: {
    openMembers(item) {
      this.$router.push({
        name: `${RouteNames.MEMBERS}`,
        params: { queueId: item.id },
      });
    },
    itemTeamLink({ team }) {
      return {
        name: `${RouteNames.TEAMS}-edit`,
        params: { id: team.id },
      };
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
