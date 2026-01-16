<template>
  <section>
    <res-popup @close="closePopup" />
    <delete-confirmation-popup :shown="isDeleteConfirmationPopup" :delete-count="deleteCount" :callback="deleteCallback"
      @close="closeDelete" />

    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.ccenter.res.res', 2) }}
      </h3>
      <div class="content-header__actions-wrap">
        <wt-search-bar :value="search" debounce @enter="loadList" @input="setSearch" @search="loadList" />
        <wt-table-actions :icons="['refresh']" @input="tableActionsHandler">
          <delete-all-action v-if="!disableUserInput" :class="{ 'hidden': anySelected }"
            :selected-count="selectedRows.length" @click="askDeleteConfirmation({
              deleted: selectedRows,
              callback: () => deleteData(selectedRows),
            })" />
          <wt-icon-btn v-if="!disableUserInput" class="icon-action" icon="plus" @click="create" />
        </wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded" />
    <wt-dummy v-if="dummy && isLoaded" :src="dummy.src" :dark-mode="darkMode" :text="dummy.text && $t(dummy.text)"
      class="dummy-wrapper" />
    <div v-show="dataList.length && isLoaded" class="table-wrapper">
      <wt-table :data="dataList" :grid-actions="!disableUserInput" :headers="headers" sortable @sort="sort">
        <template #name="{ item }">
          <div v-if="item.resource">
            {{ item.resource.name }}
          </div>
        </template>

        <template #priority="{ item }">
          <div v-if="item.priority">
            {{ item.priority }}
          </div>
        </template>

        <template #reserveResource="{ item }">
          <div v-if="item.reserveResource">
            {{ item.reserveResource.name }}
          </div>
        </template>

        <template #actions="{ item }">
          <wt-icon-action action="edit" @click="editItem(item)" />
          <wt-icon-action action="delete" @click="askDeleteConfirmation({
            deleted: [item],
            callback: () => deleteData(item),
          })" />
        </template>
      </wt-table>
      <wt-pagination :next="isNext" :prev="page > 1" :size="size" debounce @change="loadList" @input="setSize"
        @next="nextPage" @prev="prevPage" />
    </div>
  </section>
</template>

<script>
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';

import { useDummy } from '../../../../../../../app/composables/useDummy';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import ResPopup from './opened-resource-group-resource-popup.vue';

const namespace = 'ccenter/resGroups';
const subNamespace = 'res';

export default {
  name: 'OpenedResourceGroupResources',
  components: { ResPopup, DeleteConfirmationPopup },
  mixins: [openedObjectTableTabMixin],
  setup() {
    const { dummy } = useDummy({
      namespace: `${namespace}/${subNamespace}`,
      hiddenText: true,
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
    subNamespace,
  }),
  methods: {
    addItem() {
      this.$router.push({
        ...this.$route,
        params: { resourceId: 'new' },
      })
    },
    editItem(item) {
      this.$router.push({
        ...this.$route,
        params: { resourceId: item.id },
      })
    },
    closePopup() {
      this.$router.go(-1)
    },
  },
};
</script>

<style lang="scss" scoped></style>
