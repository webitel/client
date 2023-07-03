<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </wt-page-header>
    </template>

    <template v-slot:main>
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
            <template v-slot:type="{ item }">
              {{ prettifyType(item.type) }}
            </template>
            <template v-slot:maxSize="{ item }">
              {{ item.maxSize }}
            </template>
            <template v-slot:expireDays="{ item }">
              {{ item.expireDays }}
            </template>
            <template v-slot:state="{ item, index }">
              <wt-switcher
                :value="!item.disabled"
                :disabled="!hasEditAccess"
                @change="patchProperty({ index, prop: 'disabled', value: !$event })"
              ></wt-switcher>
            </template>
            <template v-slot:actions="{ item }">
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
import { mapActions } from 'vuex';
import StoragePopup from './_unused/create-storage-popup.vue';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import Storage from '../store/_internals/enums/Storage.enum';
import { useDummy } from '../../../../../app/composables/useDummy';
import dummyPic from '../assets/adm-dummy-storage.svg';

const namespace = 'integrations/storage';

export default {
  name: 'the-storage',
  mixins: [tableComponentMixin],
  components: { StoragePopup },
  data: () => ({
    namespace,
    routeName: RouteNames.STORAGE,
    isStorageSelectPopup: false,
  }),

  setup() {
    const { dummy } = useDummy({
      namespace,
      showAction: true,
      dummyPic,
    });
    return { dummy };
  },

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
    editLink({ type, id }) {
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
