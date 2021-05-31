<template>
  <wt-page-wrapper :actions-panel="false">
    <template slot="header">
      <object-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <headline-nav :path="path"></headline-nav>
      </object-header>
    </template>

    <template slot="main">
      <delete-confirmation-popup
        v-show="deleteConfirmation.isDeleteConfirmationPopup"
        :payload="deleteConfirmation"
        @close="closeDelete"
      ></delete-confirmation-popup>

      <storage-popup
        v-if="isStorageSelectPopup"
        @close="closeStorageSelectPopup"
      ></storage-popup>
      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">{{ $t('objects.integrations.storage.allStorages') }}</h3>
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
              <item-link :link="itemLink(item)">
                {{ item.name }}
              </item-link>
            </template>
            <template slot="type" slot-scope="{ item }">
              {{ prettifyType(item.type) }}
            </template>
            <template slot="maxSize" slot-scope="{ item }">
              {{ item.maxSize }}
            </template>
            <template slot="expireDays" slot-scope="{ item }">
              {{ item.expireDays }}
            </template>
            <template slot="state" slot-scope="{ item, index }">
              <wt-switcher
                :value="!item.disabled"
                :disabled="!hasEditAccess"
                @change="patchProperty({ index, prop: 'disabled', value: !$event })"
              ></wt-switcher>
            </template>
            <template slot="actions" slot-scope="{ item }">
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
import { mapActions } from 'vuex';
import StoragePopup from './_unused/create-storage-popup.vue';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import Storage from '../store/_internals/enums/Storage.enum';

export default {
  name: 'the-storage',
  mixins: [tableComponentMixin],
  components: { StoragePopup },
  data: () => ({
    namespace: 'integrations/storage',
    routeName: RouteNames.STORAGE,
    isStorageSelectPopup: false,
  }),
  computed: {
    path() {
      return [
        { name: this.$t('objects.integrations.integrations') },
        { name: this.$t('objects.integrations.storage.storage'), route: '/integrations/storage' },
      ];
    },
  },

  methods: {
    ...mapActions({
      patchProperty(dispatch, payload) {
        return dispatch(`${this.namespace}/PATCH_ITEM_PROPERTY`, payload);
      },
    }),
    create() {
      this.$router.push({ name: `${RouteNames.STORAGE}-new`, params: { type: Storage.S3 } });
    },
    edit(item) {
      this.$router.push(this.itemLink(item));
    },
    itemLink({ type, id }) {
      return { name: `${RouteNames.STORAGE}-edit`, params: { type, id } };
    },
    closeStorageSelectPopup() {
      this.isStorageSelectPopup = false;
    },
    prettifyType(type) {
      switch (type) {
        case Storage.LOCAL:
          return 'Local';
        case Storage.S3:
          return 'S3 Bucket';
        case Storage.BACKBLAZE:
          return 'Backblaze';
        case Storage.DROPBOX:
          return 'Dropbox';
        case Storage.DRIVE:
          return 'Google Drive';
        default:
          return '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
