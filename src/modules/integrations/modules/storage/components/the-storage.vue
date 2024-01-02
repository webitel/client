<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <delete-confirmation-popup
        v-show="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      />

      <storage-popup
        v-if="isStorageSelectPopup"
        @close="closeStorageSelectPopup"
      />
      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">
            {{ $t('objects.integrations.storage.allStorages') }}
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
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded" />
        <wt-dummy
          v-if="dummy && isLoaded"
          :show-action="dummy.showAction"
          :src="dummy.src"
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
              <wt-item-link :link="editLink(item)">
                {{ item.name }}
              </wt-item-link>
            </template>
            <template #type="{ item }">
              {{ prettifyType(item.type) }}
            </template>
            <template #maxSize="{ item }">
              {{ item.maxSize }}
            </template>
            <template #expireDays="{ item }">
              {{ item.expireDays }}
            </template>
            <template #state="{ item, index }">
              <wt-switcher
                :disabled="!hasEditAccess"
                :value="!item.disabled"
                @change="patchProperty({ index, prop: 'disabled', value: !$event })"
              />
            </template>
            <template #actions="{ item }">
              <wt-icon-action
                v-if="hasEditAccess"
                action="edit"
                @click="edit(item)"
              />
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
import { computed } from 'vue';
import { mapActions } from 'vuex';
import { useDummy } from '../../../../../app/composables/useDummy';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import dummyPicLight from '../assets/adm-dummy-storage-light.svg';
import dummyPicDark from '../assets/adm-dummy-storage-dark.svg';
import Storage from '../store/_internals/enums/Storage.enum';
import StoragePopup from './_unused/create-storage-popup.vue';
import DeleteConfirmationPopup
  from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';

const namespace = 'integrations/storage';

export default {
  name: 'TheStorage',
  components: { StoragePopup, DeleteConfirmationPopup },
  mixins: [tableComponentMixin],

  setup() {
    const darkMode = computed(() => store.getters['appearance/DARK_MODE']);
    const dummyPic = computed(() => darkMode.value ? dummyPicDark : dummyPicLight);
    const { dummy } = useDummy({
      namespace,
      showAction: true,
      dummyPic,
    });
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
