<template>
  <wt-page-wrapper class="members" :actions-panel="false">
    <template slot="header">
      <object-header
        :hide-primary="!hasEditAccess || !isNotInboundMember"
        :primary-action="create"
        :secondary-action="close"
      >
        <headline-nav :path="path"></headline-nav>
      </object-header>
    </template>
    <template slot="main">
      <destinations-popup
        v-if="isDestinationsPopup"
        :communications="communicationsOnPopup"
        @close="closeDestinationsPopup"
      ></destinations-popup>

      <upload-popup
        v-if="hasEditAccess && isUploadPopup"
        :file="csvFile"
        @close="closeCSVPopup"
      ></upload-popup>

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">{{ $t('objects.ccenter.members.allMembers') }}</h3>
          <div class="content-header__actions-wrap">
            <!--            TODO: NO API -->
            <!--            <wt-search-bar-->
            <!--                :value="search"-->
            <!--                debounce-->
            <!--                @input="setSearch"-->
            <!--                @search="loadList"-->
            <!--                @enter="loadList"-->
            <!--            ></wt-search-bar>-->
            <wt-icon-btn
              v-if="hasEditAccess && isNotInboundMember"
              class="icon-action"
              :class="{'hidden': anySelected}"
              icon="bucket"
              :tooltip="$t('iconHints.deleteSelected')"
              @click="deleteSelected"
            ></wt-icon-btn>
            <upload-file-icon-btn
              v-if="hasEditAccess && isNotInboundMember"
              class="icon-action"
              accept=".csv"
              @change="processCSV"
            ></upload-file-icon-btn>
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
            :grid-actions="hasEditAccess && isNotInboundMember"
          >
            <template slot="name" slot-scope="{ item }">
              <span class="nameLink" @click="edit(item)">
                {{ item.name }}
              </span>
            </template>
            <template slot="createdAt" slot-scope="{ item }">
              {{ prettifyDate(item.createdAt) }}
            </template>
            <template slot="priority" slot-scope="{ item }">
              {{ item.priority }}
            </template>
            <template slot="endCause" slot-scope="{ item }">
              {{ prettifyStopCause(item.stopCause) }}
            </template>
            <template slot="destination" slot-scope="{ item }">
              <div class="members__destinations-wrapper" v-if="item.communications">
                {{ item.communications[0].destination }}
                <span class="members__destinations-num"
                      v-if="item.communications.length > 1"
                      @click="readDestinations(item)"
                >+{{ item.communications.length - 1 }}</span>
              </div>
            </template>
            <template slot="type" slot-scope="{ item }">
              {{ item.type }}
            </template>

            <template slot="actions" slot-scope="{ item, index }">
              <edit-action
                @click="edit(item)"
              ></edit-action>
              <delete-action
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
import destinationsPopup from './opened-queue-member-destinations-popup.vue';
import uploadPopup from './upload-members-popup.vue';
import UploadFileIconBtn from '../../utils/upload-file-ucon-btn.vue';
import tableComponentMixin from '../../../mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import tableActionsHandlerMixin from '../../../mixins/baseMixins/baseTableMixin/tableActionsMixin';
import getQueueSubRoute from '../../../store/modules/contact-center/queues/_internals/scripts/getQueueSubRoute';
import RouteNames from '../../../router/_internals/RouteNames.enum';

export default {
  name: 'the-queue-members',
  mixins: [tableComponentMixin, tableActionsHandlerMixin],
  components: { uploadPopup, destinationsPopup, UploadFileIconBtn },
  data: () => ({
    isUploadPopup: false,
    communicationsOnPopup: null,
    isDestinationsPopup: false,
    csvFile: null,
    namespace: 'ccenter/queues/members',
  }),

  computed: {
    ...mapState('ccenter/queues/members', {
      dataList: (state) => state.dataList,
      parentQueue: (state) => state.parentQueue,
      page: (state) => state.page,
      size: (state) => state.size,
      search: (state) => state.search,
      isNext: (state) => state.isNextPage,
    }),

    parentId() {
      return this.$route.params.queueId;
    },

    headers() {
      return [
        { value: 'name', text: this.$t('objects.name') },
        { value: 'createdAt', text: this.$t('objects.createdAt') },
        { value: 'priority', text: this.$t('objects.ccenter.queues.priority') },
        { value: 'endCause', text: this.$t('objects.ccenter.queues.endCause') },
        { value: 'destination', text: this.$tc('objects.ccenter.queues.destination', 1) },
      ];
    },

    // if is NOT -- member is immutable. NOT prevents actions load by default
    isNotInboundMember() {
      return !(this.parentQueue.type === 1);
    },
    path() {
      const queueSubRoute = getQueueSubRoute(this.parentQueue.type);
      const queueUrl = `/contact-center/queues/${queueSubRoute}/${this.parentQueue.id}`;
      const membersUrl = `/contact-center/queues/${this.parentQueue.id}/members`;
      return [
        { name: this.$t('objects.ccenter.ccenter') },
        { name: this.parentQueue.name, route: queueUrl },
        { name: this.$tc('objects.ccenter.members.members', 2), route: membersUrl },
      ];
    },
  },

  methods: {
    prettifyStopCause(cause) {
      switch (cause) {
        case 'SYSTEM_SHUTDOWN':
          return this.$t('objects.ccenter.members.endCause.sysShutdown');
        case 'DATABASE_ERROR':
          return this.$t('objects.ccenter.members.endCause.dbError');
        case 'ABANDONED':
          return this.$t('objects.ccenter.members.endCause.abandoned');
        case 'TIMEOUT':
          return this.$t('objects.ccenter.members.endCause.timeout');
        case 'CANCEL':
          return this.$t('objects.ccenter.members.endCause.cancel');
        case 'SUCCESSFUL':
          return this.$t('objects.ccenter.members.endCause.successful');
        case 'QUEUE_NOT_IMPLEMENT':
          return this.$t('objects.ccenter.members.endCause.queueNotImplement');
        default:
          return this.$t('objects.ccenter.members.endCause.unknown');
      }
    },

    prettifyDate(createdAt) {
      return new Date(+createdAt).toLocaleDateString();
    },

    readDestinations(item) {
      this.communicationsOnPopup = item.communications;
      this.isDestinationsPopup = true;
    },

    closeDestinationsPopup() {
      this.communicationsOnPopup = null;
      this.isDestinationsPopup = false;
    },

    processCSV(files) {
      const file = files[0];
      if (file) {
        this.csvFile = file;
        this.isUploadPopup = true;
      }
    },

    closeCSVPopup() {
      this.loadList();
      this.isUploadPopup = false;
    },

    create() {
      this.$router.push({
        name: `${RouteNames.MEMBERS}-new`,
        params: { queueId: this.parentId },
      });
    },

    edit(item) {
      this.$router.push({
        name: `${RouteNames.MEMBERS}-edit`,
        params: { queueId: this.parentId, id: item.id },
      });
    },

    // override mixin "remove" for bulk delete
    async remove(rowIndex, items) {
      if (items) {
        const ids = items.map((item) => item.id);
        await this.removeItems(ids);
      } else {
        await this.removeItem(rowIndex);
      }
      this.loadList();
    },

    close() {
      this.$router.go(-1);
      this.resetState();
    },

    ...mapActions('ccenter/queues/members', {
      setDestinationId: 'SET_DESTINATION_ID',
      setParentId: 'SET_PARENT_ITEM_ID',
      setId: 'SET_ITEM_ID',
      loadParentQueue: 'LOAD_PARENT_QUEUE',
      removeItems: 'REMOVE_ITEMS',
      resetState: 'RESET_STATE',
    }),

  },
};
</script>

<style lang="scss" scoped>
.members__destinations-wrapper {
  display: flex;
}

.members__destinations-num {
  @extend .typo-body-md;

  margin-left: 20px;
  text-decoration: underline;
  cursor: pointer;
}
</style>
