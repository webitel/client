<template>
  <wt-page-wrapper :actions-panel="false" class="users">
    <template v-slot:header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </wt-page-header>
    </template>
    <template v-slot:main>
      <upload-popup
        v-if="isUploadPopup"
        :file="csvFile"
        @close="closeCSVPopup"
      ></upload-popup>
      <delete-confirmation-popup
        v-show="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      ></delete-confirmation-popup>

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">{{ $t('objects.directory.users.allUsers') }}</h3>
          <div class="content-header__actions-wrap">
            <wt-search-bar
              :value="search"
              debounce
              @enter="loadList"
              @input="setSearch"
              @search="loadList"
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
                accept=".csv"
                class="icon-action"
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
          class="dummy-wrapper"
        ></wt-dummy>
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
            <template v-slot:name="{ item }">
              <wt-item-link :link="editLink(item)">
                {{ item.name }}
              </wt-item-link>
            </template>
            <template v-slot:status="{ item }">
              <user-status :presence="item.presence" />
            </template>
            <template v-slot:username="{ item }">
              {{ item.username }}
            </template>
            <template v-slot:extensions="{ item }">
              {{ item.extension }}
            </template>
            <template v-slot:DnD="{ item }">
              <wt-switcher
                :disabled="!hasEditAccess"
                :value="getDND(item.presence)"
                @change="setDND({item, value: $event})"
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
            :next="isNext"
            :prev="page > 1"
            :size="size"
            debounce
            @change="loadList"
            @input="setSize"
            @next="nextPage"
            @prev="prevPage"
          ></wt-pagination>
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script setup>
import { useTableStore } from '@webitel/ui-sdk/src/modules/TableStoreModule/composables/useTableStore';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import UploadFileIconBtn from '../../../../../app/components/utils/upload-file-icon-btn.vue';
import { useAccess } from '../../../../../app/composables/useAccess';
import { useDummy } from '../../../../../app/composables/useDummy';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import UserStatus from './_internals/user-status-chips.vue';
import UploadPopup from './upload-users-popup.vue';

const baseNamespace = 'directory/users';
const routeName = RouteNames.USERS;

const store = useStore();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const isUploadPopup = ref(false);
const csvFile = ref(null);

const {
  namespace,
  dataList,
  isLoading,
  headers,
  isNext,
  page,
  size,
  search,
  error,

  loadData: loadList,
  setSize,
  nextPage,
  prevPage,
  patchProperty,
  deleteData: dispatchDelete,
  sort,
  setHeaders,
  setSearch,
} = useTableStore(baseNamespace);

const {
  hasCreateAccess,
  hasEditAccess,
  hasDeleteAccess,

  hasTableActions,
} = useAccess();

const {
  isVisible: isDeleteConfirmationPopup,
  deleteCount,
  deleteCallback,

  askDeleteConfirmation,
  closeDelete,
} = useDeleteConfirmationPopup();

function callDelete(item) {
  return askDeleteConfirmation({ deleted: [item], callback: dispatchDelete });
}

// SYKA BLYAD
const isLoaded = computed(() => !isLoading.value);

const { dummy } = useDummy({ namespace, hiddenText: true });

// baseTableMixin.js
function initTableView() {
  // if (setParentId) setParentId(this.parentId);
  loadList(route.query);
}

initTableView();

const selectedRows = computed(() => {
  return dataList.value.filter((item) => item._isSelected);
});

// shows delete table action if some items are selected
const anySelected = computed(() => {
  return !selectedRows?.value?.length;
});

// itemLinkMixin.js
function editLink({ id }) {
  // const name = routeName || tableObjectRouteName;
  const name = routeName;
  return { name: `${name}-edit`, params: { id } };
}

// tableActionsMixin.js
// function tableActionsHandler(eventName) {
//   switch (eventName) {
//     case 'refresh':
//       refreshList();
//       break;
//     case 'columnSelect':
//       openColumnSelect();
//       break;
//     case 'filterReset':
//       resetFilters();
//       break;
//     case 'settings':
//       expandFilters();
//       break;
//     default:
//   }
// }

// function expandFilters() {
//   this.isOpened = !this.isOpened;
// }
//
// function refreshList() {
//   loadList(route.query);
// }
//
// function openColumnSelect() {
//   if (isFilterFieldsOpened) isFilterFieldsOpened.value = true;
// }
//
// function resetFilters() {
//   router.replace({ query: null });
// }



// trableComponentMixin.js
function create() {
  return router.push({ name: `${routeName}-new` });
}

function edit(item) {
  return router.push(editLink(item));
}
// end

const path = computed(() => {
  return [
    { name: t('objects.directory.directory') },
    { name: t('objects.directory.users.users', 2), route: '/directory/users' },
  ];
});

function setDND(payload) {
  return store.dispatch(`${namespace}/SET_USER_DND`, payload);
}

function getDND(value) {
  if (value && value.status) {
    return value.status.includes('dnd');
  }
  return false;
}

function processCSV(files) {
  const file = files[0];
  if (file) {
    csvFile.value = file;
    isUploadPopup.value = true;
  }
}

function closeCSVPopup() {
  loadList();
  isUploadPopup.value = false;
}
</script>

<style lang="scss" scoped>
</style>
