<template>
  <wt-page-wrapper class="members" :actions-panel="false">
    <template slot="header">
      <object-header
          :hide-primary="!isNotInboundMember"
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
          v-if="isUploadPopup"
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
                class="icon-action"
                :class="{'hidden': anySelected}"
                icon="bucket"
                :tooltip="$t('iconHints.deleteSelected')"
                @click="deleteSelected"
            ></wt-icon-btn>
            <div class="upload-csv" v-if="isNotInboundMember">
              <wt-icon-btn
                  icon="upload"
                  :tooltip="$t('iconHints.upload')"
                  @click="triggerFileInput"
              ></wt-icon-btn>
              <input
                  ref="file-input"
                  class="upload-csv__input"
                  type="file"
                  @change="processCSV($event)"
                  accept=".csv"
              >
            </div>
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
              :selectable="false"
              :grid-actions="isNotInboundMember"
          >
            <template slot="createdAt" slot-scope="{ item }">
              {{ prettifyDate(item.createdAt) }}
            </template>
            <template slot="name" slot-scope="{ item }">
              {{ item.name }}
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
              <wt-icon-btn
                  class="table-action"
                  icon="edit"
                  @click="edit(item.id)"
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
import destinationsPopup from './opened-queue-member-destinations-popup.vue';
import uploadPopup from './upload-members-popup.vue';
import tableComponentMixin from '../../../mixins/tableComponentMixin';
import tableActionsHandlerMixin from '../../../mixins/baseTableMixin/tableActionsMixin';
import getQueueSubRoute from '../../../store/modules/contact-center/queues/_internals/scripts/getQueueSubRoute';

export default {
  name: 'the-queue-members',
  mixins: [tableComponentMixin, tableActionsHandlerMixin],
  components: { uploadPopup, destinationsPopup },
  data() {
    return {
      isUploadPopup: false,
      communicationsOnPopup: null,
      isDestinationsPopup: false,
      csvFile: null,
      headers: [
        { value: 'createdAt', text: this.$t('objects.createdAt') },
        { value: 'name', text: this.$t('objects.name') },
        { value: 'priority', text: this.$t('objects.ccenter.queues.priority') },
        { value: 'endCause', text: this.$t('objects.ccenter.queues.endCause') },
        { value: 'destination', text: this.$tc('objects.ccenter.queues.destination', 1) },
      ],
    };
  },

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

    // if is NOT -- member is immutable. NOT prevents actions load by default
    isNotInboundMember() {
      return !(this.parentQueue.type === 1);
    },
    path() {
      const queueSubRoute = getQueueSubRoute(this.parentQueue.type);
      const baseUrl = `/contact-center/queues/${queueSubRoute}/${this.parentQueue.id}`;
      return [
        { name: this.$t('objects.ccenter.ccenter') },
        { name: this.parentQueue.name, route: baseUrl },
        { name: this.$tc('objects.ccenter.members.members', 2), route: `${baseUrl}/members` },
      ];
    },
  },

  methods: {
    triggerFileInput() {
      this.$refs['file-input'].click();
    },

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

    processCSV(event) {
      const file = event.target.files[0];
      if (file) {
        this.csvFile = file;
        this.isUploadPopup = true;
      }
    },

    closeCSVPopup() {
      this.loadList();
      this.isUploadPopup = false;
      this.$refs['file-input'].value = null;
    },

    create() {
      this.$router.push({
        name: 'cc-queue-member-new',
        params: { queueId: this.parentId },
      });
    },

    edit(id) {
      this.$router.push({
        name: 'cc-queue-member-edit',
        params: { queueId: this.parentId, id },
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
      this.resetState();
      this.$router.go(-1);
    },

    ...mapActions('ccenter/queues/members', {
      setDestinationId: 'SET_DESTINATION_ID',
      setParentId: 'SET_PARENT_ITEM_ID',
      setId: 'SET_ITEM_ID',
      loadDataList: 'LOAD_DATA_LIST',
      loadParentQueue: 'LOAD_PARENT_QUEUE',
      setSize: 'SET_SIZE',
      setSearch: 'SET_SEARCH',
      nextPage: 'NEXT_PAGE',
      prevPage: 'PREV_PAGE',
      removeItem: 'REMOVE_ITEM',
      removeItems: 'REMOVE_ITEMS',
      resetState: 'RESET_STATE',
    }),

  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/objects/table-page';

.upload-csv {
  .upload-csv__input {
    visibility: hidden;
  }
}

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
