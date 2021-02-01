<template>
  <wt-page-wrapper class="devices" :actions-panel="false">
    <template slot="header">
      <object-header :primary-action="create">
        <headline-nav :path="path"></headline-nav>
      </object-header>
    </template>

    <template slot="main">
      <history-popup
          v-if="historyId"
          @close="closeHistoryPopup"
      ></history-popup>

      <upload-popup
          v-if="isUploadPopup"
          :file="csvFile"
          @close="closeCSVPopup"
      ></upload-popup>

      <device-popup
          v-if="isDeviceSelectPopup"
          @close="isDeviceSelectPopup = false"
      ></device-popup>

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">{{ $t('objects.directory.devices.allDevices') }}</h3>
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
            <div class="upload-csv">
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
          >

            <template slot="name" slot-scope="{ item }">
              <span class="nameLink" @click="edit(item)">
                {{ item.name }}
              </span>
            </template>

            <template slot="account" slot-scope="{ item }">
              {{ item.account }}
            </template>

            <template slot="user" slot-scope="{ item }">
              <div v-if="item.user">
                {{ item.user.name }}
              </div>
            </template>

            <!--state classes are specified in table-status component-->
            <template slot="state" slot-scope="{ item }">
              <status
                  class="device-state"
                  :class="stateClass(item.reged ? 1 : 0)"
                  :text="stateText(item.reged ? 1 : 0)"
              >
              </status>
            </template>

            <template slot="actions" slot-scope="{ item, index }">
              <wt-icon-btn
                  class="table-action"
                  icon="history"
                  :tooltip="$t('iconHints.history')"
                  tooltip-position="left"
                  @click="openHistory(item.id)"
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
import HistoryPopup from './device-history-popup.vue';
import UploadPopup from './upload-devices-popup.vue';
import DevicePopup from './create-device-popup.vue';
import tableComponentMixin from '../../../mixins/tableComponentMixin';
import tableActionsHandlerMixin from '../../../mixins/baseTableMixin/tableActionsMixin';
import RouteNames from '../../../router/_internals/RouteNames.enum';

export default {
  name: 'the-devices',
  mixins: [tableComponentMixin, tableActionsHandlerMixin],
  components: {
    HistoryPopup,
    UploadPopup,
    DevicePopup,
  },
  data() {
    return {
      isUploadPopup: false,
      isDeviceSelectPopup: false,
      csvFile: null,
      headers: [
        { value: 'name', text: this.$t('objects.name') },
        { value: 'account', text: this.$t('objects.directory.devices.authId') },
        { value: 'user', text: this.$t('objects.user') },
        { value: 'state', text: this.$t('objects.directory.devices.presence') },
      ],
    };
  },

  computed: {
    ...mapState('directory/devices', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      size: (state) => state.size,
      search: (state) => state.search,
      isNext: (state) => state.isNextPage,
    }),
    ...mapState('directory/devices/history', {
      historyId: (state) => state.itemId,
    }),
    path() {
      return [
        { name: this.$t('objects.directory.directory') },
        { name: this.$tc('objects.directory.devices.devices', 2), route: '/directory/devices' },
      ];
    },
  },

  methods: {
    ...mapActions('directory/devices', {
      loadDataList: 'LOAD_DATA_LIST',
      setSize: 'SET_SIZE',
      setSearch: 'SET_SEARCH',
      nextPage: 'NEXT_PAGE',
      prevPage: 'PREV_PAGE',
      removeItem: 'REMOVE_ITEM',
    }),
    ...mapActions('directory/devices/history', {
      openHistory: 'SET_HISTORY_ITEM_ID',
    }),

    triggerFileInput() {
      this.$refs['file-input'].click();
    },

    create() {
      this.isDeviceSelectPopup = true;
    },

    edit(item) {
      const name = item.hotdesk
          ? `${RouteNames.DEVICES}-hotdesk-edit`
          : `${RouteNames.DEVICES}-edit`;

      this.$router.push({
        name,
        params: { id: item.id },
      });
    },

    processCSV(event) {
      const file = event.target.files[0];
      if (file) {
        this.csvFile = file;
        this.isUploadPopup = true;
      }
    },

    closeHistoryPopup() {
      this.openHistory(null);
    },

    closeCSVPopup() {
      this.loadList();
      this.isUploadPopup = false;
      this.$refs['file-input'].value = null;
    },

    // computes dynamic class name for state icon colorizing
    stateClass(state) {
      switch (state) {
        case 0:
          return 'state__nonreg';
        case 1:
          return 'state__reged';
        case 2:
          return 'state__ringing';
        case 3:
          return 'state__dialing';
        case 4:
          return 'state__dialog';
        case 5:
          return 'state__onhold';
        default:
          return '';
      }
    },

    stateText(state) {
      switch (state) {
        case 0:
          return this.$t('objects.directory.devices.state.nonreg');
        case 1:
          return this.$t('objects.directory.devices.state.reged');
        case 2:
          return this.$t('objects.directory.devices.state.ringing');
        case 3:
          return this.$t('objects.directory.devices.state.dialing');
        case 4:
          return this.$t('objects.directory.devices.state.dialog');
        case 5:
          return this.$t('objects.directory.devices.state.onhold');
        default:
          return 'unknown';
      }
    },
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
</style>
