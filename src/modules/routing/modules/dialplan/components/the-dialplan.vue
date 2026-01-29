<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="table-page"
  >
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

      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ $t('objects.routing.dialplan.dialplanRules') }}
          </h3>
          <div class="table-title__actions-wrap">
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
                :class="{ 'hidden': anySelected }"
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
          :dark-mode="darkMode"
          :text="dummy.text && $t(dummy.text)"
          class="dummy-wrapper"
          @create="create"
        />
        <div
          v-show="dataList.length && isLoaded"
          class="table-section__table-wrapper"
        >
          <wt-table
            ref="dialplan-table"
            :data="dataList"
            :headers="headers"
            sortable
            :row-reorder="hasEditAccess"
            @sort="sort"
            @reorder:row="handleReorder"
          >
            <template #name="{ item }">
              <adm-item-link
                :id="item.id"
                :route-name="routeName"
              >
                {{ item.name }}
              </adm-item-link>
            </template>
            <template #pattern="{ item }">
              {{ item.pattern }}
            </template>
            <template #schema="{ item }">
              <adm-item-link
                v-if="item.schema"
                :id="item.schema.id"
                :route-name="RouteNames.FLOW"
                target="_blank"
              >
                {{ item.schema.name }}
              </adm-item-link>
            </template>
            <template #state="{ item, index }">
              <wt-switcher
                :disabled="!hasEditAccess"
                :model-value="!item.disabled"
                @update:model-value="patchProperty({ index, prop: 'disabled', value: !$event })"
              />
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
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { mapActions } from 'vuex';

import { useDummy } from '../../../../../app/composables/useDummy';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

const namespace = 'routing/dialplan';

export default {
  name: 'TheDialplan',
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
    routeName: RouteNames.DIALPLAN,
  }),
  computed: {
    path() {
      return [
        {
          name: this.$t('objects.routing.routing'),
        },
        {
          name: this.$t('objects.routing.dialplan.dialplan'),
          route: '/routing/dialplan',
        },
      ];
    },
  },
  methods: {
    async handleReorder({ oldIndex, newIndex }) {
      if (oldIndex === newIndex) return;
      const fromId = this.dataList[oldIndex].id;
      const toId = this.dataList[newIndex].id;
      await this.swapRowsAndReloadList({
        fromId,
        toId,
      });
    },
    async swapRowsAndReloadList(swapPayload) {
      this.isLoading = true;
      await this.swapRows(swapPayload);
      await this.loadList();
      this.isLoading = false;
    },
    ...mapActions({
      patchProperty(dispatch, payload) {
        return dispatch(`${this.namespace}/PATCH_ITEM_PROPERTY`, payload);
      },
      swapRows(dispatch, payload) {
        return dispatch(`${this.namespace}/SWAP_ROWS`, payload);
      },
    }),
  },
};
</script>

<style
  lang="scss"
  scoped
>
.dialplan {
  :deep(.sortable-chosen) {
    .dialplan__draggable-icon .wt-icon {
      fill: var(--icon--active-color);
    }
  }

  .dialplan__draggable-icon {
    cursor: move;
  }

  .sortable-drag {
    position: relative;
    border-radius: var(--border-radius);
  }

  // Firefox fallback
  .sortable-fallback {
    display: grid;
    align-items: center;
    grid-template-columns: 42px 1fr 1fr 1fr 10% 240px;
    grid-column-gap: 10px;
  }
}
</style>
