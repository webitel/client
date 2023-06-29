<template>
  <wt-page-wrapper class="devices" :actions-panel="false">
    <template v-slot:header>
      <object-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </object-header>
    </template>

    <template v-slot:main>
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
            <wt-table-actions
              :icons="['refresh']"
              @input="tableActionsHandler"
            >
              <delete-all-action
                v-if="hasDeleteAccess"
                :class="{'hidden': anySelected}"
                :selected-count="selectedRows.length"
                @click="callDelete(selectedRows)"
              ></delete-all-action>
              <upload-file-icon-btn
                v-if="hasCreateAccess"
                class="icon-action"
                accept=".csv"
                @change="processCSV"
              ></upload-file-icon-btn>
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded"></wt-loader>
        <wt-dummy
          v-if="dummy && isLoaded"
          :src="dummy.src"
          :text="$t(dummy.text)"
          :show-action="dummy.showAction"
          @create="create"
          class="dummy-wrapper"
        ></wt-dummy>
        <div
          v-show="dataList.length && isLoaded"
          class="table-wrapper"
        >
          <wt-table
            :headers="headers"
            :data="dataList"
            :grid-actions="hasTableActions"
            sortable
            @sort="sort"
          >

            <template v-slot:name="{ item }">
              <wt-item-link :link="editLink(item)">
                {{ item.name }}
              </wt-item-link>
            </template>

            <template v-slot:account="{ item }">
              {{ item.account }}
            </template>

            <template v-slot:user="{ item }">
              <wt-item-link
                v-if="item.user"
                :route-name="RouteNames.USERS"
                :id="item.user.id"
              >
                {{ item.user.name }}
              </wt-item-link>
            </template>

            <!--state classes are specified in table-status component-->
            <template v-slot:state="{ item }">
              <wt-indicator
                :color="stateClass(item.reged ? 1 : 0)"
                :text="stateText(item.reged ? 1 : 0)"
              ></wt-indicator>
            </template>

            <template v-slot:actions="{ item }">
              <wt-icon-action
                action="history"
                class="table-action"
                @click="openHistory(item.id)"
              ></wt-icon-action>
              <wt-icon-action
                v-if="hasEditAccess"
                action="edit"
                @click="edit(item)"
              ></wt-icon-action>
              <wt-icon-action
                v-if="hasDeleteAccess"
                action="delete"
                class="table-action"
                @click="callDelete(item)"
              ></wt-icon-action>
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
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import HistoryPopup from './device-history-popup.vue';
import UploadPopup from './upload-devices-popup.vue';
import DevicePopup from './create-device-popup.vue';
import UploadFileIconBtn from '../../../../../app/components/utils/upload-file-icon-btn.vue';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import { useDummy } from '../../../../../app/composables/useDummy';

const namespace = 'directory/devices';

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
    namespace,
    isUploadPopup: false,
    isDeviceSelectPopup: false,
    csvFile: null,
  }),

  setup() {
    const { dummy } = useDummy({ namespace, showAction: true });
    return { dummy };
  },

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

    editLink(item) {
      const name = item.hotdesk
        ? `${RouteNames.DEVICES}-hotdesk-edit`
        : `${RouteNames.DEVICES}-edit`;

      return {
        name,
        params: { id: item.id },
      };
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

    stateClass(state) {
      switch (state) {
        case 0:
          return 'disabled';
        case 1:
          return 'success';
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
        // case 2:
        //   return this.$t('objects.directory.devices.state.ringing');
        // case 3:
        //   return this.$t('objects.directory.devices.state.dialing');
        // case 4:
        //   return this.$t('objects.directory.devices.state.dialog');
        // case 5:
        //   return this.$t('objects.directory.devices.state.onhold');
        default:
          return 'unknown';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
