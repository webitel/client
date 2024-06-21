<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="devices"
  >
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <history-popup
        v-if="historyId"
        @close="closeHistoryPopup"
      />

      <upload-popup
        :shown="isUploadPopup"
        :file="csvFile"
        @close="closeCSVPopup"
      />

      <device-popup
        :shown="isDeviceSelectPopup"
        @close="isDeviceSelectPopup = false"
      />

      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      />

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">
            {{ $t('objects.directory.devices.allDevices') }}
          </h3>
          <div class="content-header__actions-wrap">
            <wt-search-bar
              :value="search"
              debounce
              @enter="loadList"
              @input="setSearch"
              @search="loadList"
            />
            <wt-table-actions
              :icons="['refresh']"
              @input="tableActionsHandler"
            >
              <delete-all-action
                v-if="hasDeleteAccess"
                :class="{'hidden': anySelected}"
                :selected-count="selectedRows.length"
                @click="askDeleteConfirmation({
                  deleted: selectedRows,
                  callback: () => deleteData(selectedRows),
                })"
              />
              <upload-file-icon-btn
                v-if="hasCreateAccess"
                accept=".csv"
                class="icon-action"
                @change="processCSV"
              />
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded" />
        <wt-dummy
          v-if="dummy && isLoaded"
          :show-action="dummy.showAction"
          :src="dummy.src"
          :dark-mode="darkMode"
          :text="dummy.text && $t(dummy.text)"
          class="dummy-wrapper"
          @create="create"
        />
        <div
          v-show="dataList.length && isLoaded"
          class="table-wrapper"
        >
          <wt-table
            :data="dataList"
            :grid-actions="hasTableActions"
            :headers="headers"
            sortable
            @sort="sort"
          >
            <template #name="{ item }">
              <adm-item-link
                :id="item.id"
                :route-name="RouteNames.DEVICES"
              >
                {{ item.name }}
              </adm-item-link>
            </template>

            <template #account="{ item }">
              {{ item.account }}
            </template>

            <template #user="{ item }">
              <adm-item-link
                v-if="item.user"
                :id="item.user.id"
                :route-name="RouteNames.USERS"
              >
                {{ item.user.name }}
              </adm-item-link>
            </template>

            <!--state classes are specified in table-status component-->
            <template #state="{ item }">
              <wt-indicator
                :color="stateClass(item.reged ? 1 : 0)"
                :text="stateText(item.reged ? 1 : 0)"
              />
            </template>

            <template #actions="{ item }">
              <wt-icon-action
                action="history"
                class="table-action"
                @click="openHistory(item.id)"
              />
              <adm-item-link
                v-if="hasEditAccess"
                :id="item.id"
                :route-name="routeName">
                <wt-icon-action action="edit" />
              </adm-item-link>
              <wt-icon-action
                v-if="hasDeleteAccess"
                action="delete"
                class="table-action"
                @click="askDeleteConfirmation({
                  deleted: [item],
                  callback: () => deleteData(item),
                })"
              />
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
          />
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';
import AdmItemLink from '../../../../../app/components/utils/adm-item-link.vue';
import UploadFileIconBtn from '../../../../../app/components/utils/upload-file-icon-btn.vue';
import { useDummy } from '../../../../../app/composables/useDummy';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import DevicePopup from './create-device-popup.vue';
import HistoryPopup from './device-history-popup.vue';
import UploadPopup from './upload-devices-popup.vue';
import DeleteConfirmationPopup
  from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';

const namespace = 'directory/devices';

export default {
  name: 'TheDevices',
  components: {
    AdmItemLink,
    HistoryPopup,
    UploadPopup,
    DevicePopup,
    UploadFileIconBtn,
    DeleteConfirmationPopup,
  },
  mixins: [tableComponentMixin],

  setup() {
    const { dummy } = useDummy({ namespace, showAction: true });
    const {
      isVisible: isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    } = useDeleteConfirmationPopup();

    return {
      dummy,
      isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    };
  },
  data: () => ({
    namespace,
    isUploadPopup: false,
    isDeviceSelectPopup: false,
    csvFile: null,
    routeName: RouteNames.DEVICES,
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
