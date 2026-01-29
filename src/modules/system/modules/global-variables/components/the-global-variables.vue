<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="table-page"
  >
    <template #header>
      <wt-page-header :hide-primary="!hasCreateAccess" :primary-action="addItem">
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>
    <template #main>

      <delete-confirmation-popup :shown="isDeleteConfirmationPopup" :delete-count="deleteCount"
        :callback="deleteCallback" @close="closeDelete" />

      <global-variables-popup :namespace="namespace" @close="closePopup" />

      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{
              $t('objects.all', {
                entity: $t('objects.system.globalVariables.globalVariables', 2).toLowerCase(),
              })
            }}
          </h3>
          <div class="table-title__actions-wrap">
            <wt-search-bar :value="search" debounce @enter="loadList" @input="setSearch" @search="loadList" />
            <wt-table-actions :icons="['refresh']" @input="tableActionsHandler">
              <delete-all-action v-if="hasDeleteAccess" :class="{ 'hidden': anySelected }"
                :selected-count="selectedRows.length" @click="askDeleteConfirmation({
                  deleted: selectedRows,
                  callback: () => deleteData(selectedRows),
                })" />
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded" />
        <wt-dummy v-if="dummy && isLoaded" :show-action="dummy.showAction" :src="dummy.src" :dark-mode="darkMode"
          :text="dummy.text && $t(dummy.text)" class="dummy-wrapper" @create="addItem" />

        <div
          v-show="dataList.length && isLoaded"
          class="table-section__table-wrapper"
        >
          <wt-table :data="dataList" :headers="headers" sortable @sort="sort">
            <template #key="{ item }">
              {{ item.name }}
            </template>
            <template #value="{ item }">
              {{ item.encrypt ? '***************' : item.value }}
            </template>
            <template #encrypt="{ item, index }">
              <wt-switcher :model-value="item.encrypt" :disabled="item.encrypt"
                @update:model-value="patchItem({ item, index, prop: 'encrypt', value: $event })" />
            </template>
            <template #actions="{ item }">
              <wt-icon-action action="edit" :disabled="!hasEditAccess" @click="edit(item)" />
              <wt-icon-action action="delete" :disabled="!hasDeleteAccess" @click="askDeleteConfirmation({
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
  </wt-page-wrapper>
</template>

<script>
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';

import { useDummy } from '/src/app/composables/useDummy';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import tableComponentMixin from '/src/app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin.js';

import baseObjectMixin from '../../../../../app/mixins/baseMixins/baseObjectMixin/baseObjectMixin';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import GlobalVariablesPopup from './global-variables-popup.vue';

const namespace = 'system/globalVariables';

export default {
  name: 'TheGlobalVariables',
  components: { DeleteConfirmationPopup, GlobalVariablesPopup },
  mixins: [tableComponentMixin, baseObjectMixin, openedObjectMixin],

  setup() {
    const { dummy } = useDummy({
      namespace,
      showAction: true,
    });
    const {
      isVisible: isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    } = useDeleteConfirmationPopup();

    const { hasCreateAccess, hasEditAccess, hasDeleteAccess } = useUserAccessControl();

    return {
      dummy,
      isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
      hasCreateAccess,
      hasEditAccess,
      hasDeleteAccess,
    };
  },

  data: () => ({
    namespace,
    isGlobalVariablesPopup: false,
  }),
  computed: {
    path() {
      return [
        {
          name: this.$t('objects.system.system'),
        },
        {
          name: this.$t('objects.system.globalVariables.globalVariables', 1),
          route: '/system/global-variables',
        },
      ];
    },
  },
  methods: {
    addItem() {
      this.$router.push({
        ...this.$route,
        params: { id: 'new' }
      })
    },
    edit(item) {
      this.$router.push({
        ...this.$route,
        params: { id: item.id }
      })
    },
    closePopup() {
      this.$router.go(-1);
    }
  },
};
</script>
