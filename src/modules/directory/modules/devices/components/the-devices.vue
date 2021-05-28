<template>
  <wt-page-wrapper class="devices" :actions-panel="false">
    <template slot="header">
      <object-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
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

      <delete-confirmation-popup
        v-show="deleteConfirmation.isDeleteConfirmationPopup"
        :payload="deleteConfirmation"
        @close="closeDelete"
      ></delete-confirmation-popup>


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
              v-if="hasDeleteAccess"
              class="icon-action"
              :class="{'hidden': anySelected}"
              icon="bucket"
              :tooltip="$t('iconHints.deleteSelected')"
              @click="callDelete(selectedRows)"
            ></wt-icon-btn>
            <upload-file-icon-btn
              v-if="hasCreateAccess"
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
            :grid-actions="hasTableActions"
            sortable
            @sort="sort"
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

            <template slot="actions" slot-scope="{ item }">
              <wt-icon-btn
                class="table-action"
                icon="history"
                :tooltip="$t('iconHints.history')"
                tooltip-position="left"
                @click="openHistory(item.id)"
              ></wt-icon-btn>
              <edit-action
                v-if="hasEditAccess"
                @click="edit(item)"
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
import { mapActions, mapState } from 'vuex';
import HistoryPopup from './device-history-popup.vue';
import UploadPopup from './upload-devices-popup.vue';
import DevicePopup from './create-device-popup.vue';
import UploadFileIconBtn from '../../../../../app/components/utils/upload-file-ucon-btn.vue';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import getNamespacedState from '../../../../../app/store/helpers/getNamespacedState';

export default {
  name: 'the-devices',
  mixins: [tableComponentMixin],
  components: {
    HistoryPopup,
    UploadPopup,
    DevicePopup,
    UploadFileIconBtn,
  },
  data: () => ({
    namespace: 'directory/devices',
    isUploadPopup: false,
    isDeviceSelectPopup: false,
    csvFile: null,
  }),

  computed: {
    ...mapState({
      historyId(state) {
        return getNamespacedState(state, `${this.namespace}/history`).parentId;
      },
    }),
    path() {
      return [
        { name: this.$t('objects.directory.directory') },
        { name: this.$tc('objects.directory.devices.devices', 2), route: '/directory/devices' },
      ];
    },
  },

  methods: {
    ...mapActions({
      openHistory(dispatch, payload) {
        return dispatch(`${this.namespace}/history/SET_PARENT_ITEM_ID`, payload);
      },
    }),

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

    processCSV(files) {
      const file = files[0];
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
</style>
