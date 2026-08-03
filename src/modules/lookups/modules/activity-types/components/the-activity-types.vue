<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="table-page"
  >
    <template #header>
      <wt-page-header
        :hide-primary="false"
        :primary-action="add"
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>
    <template #main>
      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ t('objects.lookups.activityTypes.activityTypes') }}
          </h3>
          <wt-action-bar
            :include="[IconAction.REFRESH, IconAction.DELETE]"
            :disabled:delete="!hasDeleteAccess || !selected.length"
            @click:refresh="loadDataList"
            @click:delete="
              askDeleteConfirmation({
                deleted: selected,
                callback: () => deleteEls(selected),
              })
            "
          >
            <template #search-bar>
              <dynamic-filter-search
                :filters-manager="{
                  filters: new Map()
                }"
                single-search-name="q"
              />
            </template>
          </wt-action-bar>

        </header>

        <delete-confirmation-popup
          :shown="isDeleteConfirmationPopup"
          :callback="deleteCallback"
          :delete-count="deleteCount"
          @close="closeDelete"
        />

        <div class="table-section__table-wrapper">
            <wt-empty
              v-show="showEmpty"
              :image="imageEmpty"
              :text="textEmpty"
              :primary-action-text="primaryActionTextEmpty"
              :disabled-primary-action="!hasCreateAccess"
              @click:primary="add"
            />

            <wt-loader v-show="isLoading" />

            <wt-table
              v-show="dataList.length && !isLoading"
              :data="dataList"
              :selected="selected"
              :headers="shownHeaders"
              sortable
              @sort="updateSort"
              @update:selected="updateSelected"
            >
              <template #name="{ item }">
                <wt-item-link
                  :link="{
                    name: `${RouteNames.ACTIVITY_TYPES}-card`,
                    params: { id: item.id },
                  }"
                >
                  {{ item.name }}
                </wt-item-link>
              </template>

              <template #description="{ item }">
                <p>{{ item.description }}</p>
              </template>

              <template #actions="{ item }">
                <wt-icon-action
                  :disabled="!hasUpdateAccess"
                  action="edit"
                  @click="edit(item)"
                />
                <wt-icon-action
                  :disabled="!hasDeleteAccess"
                  action="delete"
                  @click="
                  askDeleteConfirmation({
                    deleted: [item],
                    callback: () => deleteEls([item]),
                  })
                "
                />
              </template>
            </wt-table>
          </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script setup>
import { computed } from 'vue';
import { IconAction } from '@webitel/ui-sdk/enums';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl.js';
import { useI18n } from 'vue-i18n';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { useActivityTypesDataListStore } from '../stores/datalist/activityTypesDataListStore.js';
import { storeToRefs } from 'pinia';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { useRouter } from 'vue-router';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';

const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } =
  useUserAccessControl();

const tableStore = useActivityTypesDataListStore();

const {
  dataList,
  error,
  isLoading,
  page,
  size,
  next,
  selected,
  shownHeaders,
  filtersManager,
} = storeToRefs(tableStore);

const {
  initialize,
  loadDataList,
  updatePage,
  updateSize,
  updateSort,
  patchItemProperty,
  deleteEls,
  addFilter,
  updateFilter,
  deleteFilter,
  updateSelected,
} = tableStore;


initialize();

const { t } = useI18n();
const router = useRouter();

const create = () => {}

const {
  isVisible: isDeleteConfirmationPopup,
  deleteCount,
  deleteCallback,
  askDeleteConfirmation,
  closeDelete,
} = useDeleteConfirmationPopup();

const path = computed(() => [
  {
    name: t('objects.lookups.lookups'),
  },
  {
    name: t('objects.lookups.activityTypes.activityTypes'),
    route: '/lookups/activity-types',
  },
])

const add = () => {
  return router.push({
    name: `${RouteNames.ACTIVITY_TYPES}-card`,
    params: {
      id: 'new',
    },
  });
};


const edit = (item) => {
  return router.push({
    name: `${RouteNames.ACTIVITY_TYPES}-card`,
    params: {
      id: item.id,
    },
  });
};

const addItem = () => {}

const {
  showEmpty,
  image: imageEmpty,
  text: textEmpty,
  primaryActionText: primaryActionTextEmpty,
} = useTableEmpty({
  dataList,
  error,
  filters: computed(() => filtersManager.value.getAllValues()),
  isLoading,
});
</script>

<style>

</style>