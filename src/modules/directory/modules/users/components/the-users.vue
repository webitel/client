<template>
  <wt-page-wrapper
    class="table-page users"
    :actions-panel="false"
  >
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="
          () =>
            router.push({
              name: `${RouteNames.USERS}-card`,
              params: { id: 'new' },
            })
        "
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>
    <template #main>
      <upload-popup
        :file="csvFile"
        @close="closeCSVPopup"
      />
      <delete-confirmation-popup
        :callback="deleteCallback"
        :delete-count="deleteCount"
        :shown="isDeleteConfirmationPopup"
        @close="closeDelete"
      />

      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ t('objects.directory.users.allUsers') }}
          </h3>
          <div class="table-title__actions-wrap">
            <filter-search
              :namespace="filtersNamespace"
              name="search"
            />
            <wt-table-actions
              :icons="['refresh']"
              @input="(event) => event === 'refresh' && loadData()"
            >
              <delete-all-action
                v-if="hasDeleteAccess"
                :class="{ hidden: !selected.length }"
                :selected-count="selected.length"
                @click="
                  askDeleteConfirmation({
                    deleted: selected,
                    callback: () => deleteData(selected),
                  })
                "
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

        <wt-loader v-show="isLoading" />
        <wt-dummy
          v-if="dummy && !isLoading"
          :dark-mode="darkMode"
          :src="dummy.src"
          :text="dummy.text && t(dummy.text)"
          class="dummy-wrapper"
        />
        <div class="table-wrapper">
          <wt-table-transition v-if="dataList.length && !isLoading">
            <wt-table
              :selected="selected"
              :data="dataList"
              :grid-actions="hasEditAccess || hasDeleteAccess"
              :headers="headers"
              sortable
              @update:selected="setSelected"
              @sort="sort"
            >
              <template #name="{ item }">
                <adm-item-link
                  :id="item.id"
                  :route-name="RouteNames.USERS"
                >
                  {{ item.name }}
                </adm-item-link>
              </template>
              <template #status="{ item }">
                <user-status :presence="item.presence" />
              </template>
              <template #username="{ item }">
                {{ item.username }}
              </template>
              <template #extensions="{ item }">
                {{ item.extension }}
              </template>
              <template #DnD="{ item }">
                <wt-switcher
                  :disabled="!hasEditAccess"
                  :value="getDND(item.presence)"
                  @change="setDND({ item, value: $event })"
                />
              </template>
              <template #actions="{ item }">
                <adm-item-link
                  v-if="hasEditAccess"
                  :id="item.id"
                  :route-name="RouteNames.USERS"
                >
                  <wt-icon-action action="edit" />
                </adm-item-link>
                <wt-icon-action
                  v-if="hasDeleteAccess"
                  action="delete"
                  class="table-action"
                  @click="
                    askDeleteConfirmation({
                      deleted: [item],
                      callback: () => deleteData(item),
                    })
                  "
                />
              </template>
            </wt-table>
          </wt-table-transition>
          <filter-pagination
            :namespace="filtersNamespace"
            :next="isNext"
          />
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script setup>
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import WtTableTransition from '@webitel/ui-sdk/src/components/on-demand/wt-table-transition/wt-table-transition.vue';
import FilterPagination from '@webitel/ui-sdk/src/modules/Filters/components/filter-pagination.vue';
import FilterSearch from '@webitel/ui-sdk/src/modules/Filters/components/filter-search.vue';
import { useTableFilters } from '@webitel/ui-sdk/src/modules/Filters/composables/useTableFilters.js';
import { useTableStore } from '@webitel/ui-sdk/store';
import { computed, inject, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import UploadFileIconBtn from '../../../../../app/components/utils/upload-file-icon-btn.vue';
import { useDummy } from '../../../../../app/composables/useDummy';
import { useAccessControl } from '@webitel/ui-sdk/src/composables/useAccessControl/useAccessControl.js';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import UserStatus from './_internals/user-status-chips.vue';
import UploadPopup from './upload-users-popup.vue';

const namespace = 'directory/users';

const store = useStore();
const router = useRouter();
const { t } = useI18n();

const darkMode = inject('darkMode');

const { hasCreateAccess, hasEditAccess, hasDeleteAccess } = useAccessControl();

const {
  namespace: tableNamespace,

  dataList,
  selected,
  isLoading,
  headers,
  isNext,
  error,

  loadData,
  deleteData,
  sort,
  setSelected,
  onFilterEvent,
} = useTableStore(namespace);

const {
  namespace: filtersNamespace,
  restoreFilters,

  subscribe,
  flushSubscribers,
} = useTableFilters(tableNamespace);

subscribe({
  event: '*',
  callback: onFilterEvent,
});

restoreFilters();

onUnmounted(() => {
  flushSubscribers();
});

const { dummy } = useDummy({
  namespace,
  hiddenText: true,
});
const {
  isVisible: isDeleteConfirmationPopup,
  deleteCount,
  deleteCallback,

  askDeleteConfirmation,
  closeDelete,
} = useDeleteConfirmationPopup();

const csvFile = ref(null);

const path = computed(() => {
  return [
    {
      name: t('objects.directory.directory'),
    },
    {
      name: t('objects.directory.users.users', 2),
      route: '/directory/users',
    },
  ];
});

const setDND = (payload) => {
  return store.dispatch(`${tableNamespace}/SET_USER_DND`, payload);
};

const getDND = (value) => {
  if (value?.status) {
    return value.status.includes('dnd');
  }
  return false;
};

const processCSV = (files) => {
  const file = files[0];
  if (file) {
    csvFile.value = file;
  }
};

const closeCSVPopup = () => {
  csvFile.value = null;
  return loadData();
};
</script>

<style lang="scss" scoped></style>
