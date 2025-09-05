<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      />

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">
            {{ $t('objects.lookups.quickReplies.quickReplies') }}
          </h3>
          <div class="content-header__actions-wrap">
            <wt-action-bar
              :include="[IconAction.REFRESH, IconAction.DELETE]"
              :disabled:delete="!hasDeleteAccess || !selectedRows.length"
              @click:refresh="loadList"
              @click:delete="askDeleteConfirmation({
              deleted: selectedRows,
              callback: () => deleteData(selectedRows),
            })"
            >

              <template #search-bar>
                <wt-search-bar
                  :value="search"
                  debounce
                  @enter="loadList"
                  @input="setSearch"
                  @search="loadList"
                />
              </template>
            </wt-action-bar>
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
            :headers="headers"
            sortable
            @sort="sort"
          >
            <template #name="{ item }">
              <adm-item-link
                :id="item.id"
                :route-name="routeName"
              >
                {{ item.name }}
              </adm-item-link>
            </template>
            <template #text="{ item }">
              {{ item.text }}
            </template>
            <template #teams="{ item }">
              <wt-display-chip-items v-if="item?.teams" :items="item?.teams" />
            </template>
            <template #queues="{ item }">
              <wt-display-chip-items v-if="item?.queues" :items="item?.queues" />
            </template>
            <template #createdAt="{ item }">
              {{ prettifyDateTime(item.createdAt) }}
            </template>
            <template #createdBy="{ item }">
              {{ item.createdBy.name }}
            </template>
            <template #updatedAt="{ item }">
              {{ prettifyDateTime(item.updatedAt) }}
            </template>
            <template #updatedBy="{ item }">
              {{ item.updatedBy.name }}
            </template>
            <template #actions="{ item }">
              <wt-icon-action
                action="edit"
                :disabled="!hasEditAccess"
                @click="edit(item)"
              />
              <wt-icon-action
                action="delete"
                :disabled="!hasDeleteAccess"
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
import { WtDisplayChipItems } from '@webitel/ui-sdk/components';
import IconAction from '@webitel/ui-sdk/src/enums/IconAction/IconAction.enum.js';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';

import { useDummy } from '../../../../../app/composables/useDummy.js';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

const namespace = 'lookups/quickReplies';

export default {
  name: 'TheQuickReplies',
  components: { DeleteConfirmationPopup },
  mixins: [tableComponentMixin],

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
    routeName: RouteNames.QUICK_REPLIES,
    IconAction,
  }),

  computed: {
    path() {
      return [
        {
          name: this.$t('objects.lookups.lookups'),
        },
        {
          name: this.$tc('objects.lookups.quickReplies.quickReplies', 2),
          route: '/lookups/quick-replies',
        },
      ];
    },
    selectedRows() {
      return this.dataList.filter((item) => item._isSelected);
    },
  },
  methods: {
    prettifyDateTime(timestamp) {
      return new Date(+timestamp).toLocaleString();
    },
  }
};
</script>

<style scoped>

</style>
