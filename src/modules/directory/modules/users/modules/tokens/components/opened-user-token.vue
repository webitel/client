<template>
  <section>
    <token-popup :namespace="namespace" />
    <delete-confirmation-popup
      :shown="isDeleteConfirmationPopup"
      :delete-count="deleteCount"
      :callback="deleteCallback"
      @close="closeDelete"
    />

    <header class="content-header">
      <h3 class="content-title">
        {{ t('objects.directory.users.token', 2) }}
      </h3>

      <wt-table-actions
        :icons="['refresh']"
        @input="(event) => event === 'refresh' && loadData()"
      >
        <delete-all-action
          v-if="!disableUserInput"
          :class="{ hidden: !selected.length }"
          :selected-count="selected.length"
          @click="
            askDeleteConfirmation({
              deleted: selected,
              callback: () => deleteData(selected),
            })
          "
        />
        <wt-icon-action
          v-if="!disableUserInput"
          action="add"
          @click="create"
        />
      </wt-table-actions>
    </header>

    <wt-loader v-show="isLoading" />
    <div
      v-show="!isLoading"
      class="table-wrapper"
    >
      <div
        style="display: contents"
        v-if="dataList.length && !isLoading"
      >
        <wt-table
          :data="dataList"
          :grid-actions="!disableUserInput"
          :headers="headers"
          :selected="selected"
          sortable
          @sort="sort"
          @update:selected="setSelected"
        >
          <template #usage="{ item }">
            {{ item.usage }}
          </template>
          <template #createdBy="{ item }">
            <div v-if="item.createdBy">
              {{ item.createdBy.name }}
            </div>
          </template>
          <template #createdAt="{ item }">
            {{ prettifyDate(item.createdAt) }}
          </template>
          <template #actions="{ item }">
            <wt-icon-btn
              icon="bucket"
              @click="
                askDeleteConfirmation({
                  deleted: [item],
                  callback: () => deleteData(item),
                })
              "
            />
          </template>
        </wt-table>
      </div>
      <filter-pagination
        :namespace="filtersNamespace"
        :next="isNext"
      />
    </div>
  </section>
</template>

<script setup>
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import FilterPagination from '@webitel/ui-sdk/src/modules/Filters/components/filter-pagination.vue';
import { useTableFilters } from '@webitel/ui-sdk/src/modules/Filters/composables/useTableFilters.js';
import { useCardStore, useTableStore } from '@webitel/ui-sdk/store';
import { inject, onUnmounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useAccessControl } from '@webitel/ui-sdk/src/composables/useAccessControl/useAccessControl.js';
import TokenPopup from './opened-user-token-popup.vue';

const props = defineProps({
  namespace: {
    type: String,
    required: true,
  },
});

const {
  namespace: parentCardNamespace,
  id: parentId,

  addItem,
} = useCardStore(props.namespace);

const namespace = `${parentCardNamespace}/tokens`;

const store = useStore();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const darkMode = inject('darkMode');

const { disableUserInput } = useAccessControl();

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

const {
  isVisible: isDeleteConfirmationPopup,
  deleteCount,
  deleteCallback,

  askDeleteConfirmation,
  closeDelete,
} = useDeleteConfirmationPopup();

const create = async () => {
  if (!parentId.value) {
    await addItem();
    await router.replace({
      ...route,
      params: {
        ...route.params,
        id: parentId.value,
      },
    });
  }

  return router.push({
    ...route,
    params: {
      ...route.params,
      tokenId: 'new',
    },
  });
};
const prettifyDate = (value) => {
  return new Date(+value).toLocaleString();
};

watch(
  () => route.params.tokenId,
  () => {
    if (!route.params.tokenId) {
      loadData();
    }
  },
);
</script>

<style lang="scss" scoped></style>
