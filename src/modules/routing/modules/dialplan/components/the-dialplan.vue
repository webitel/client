<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="dialplan"
  >
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
        :callback="deleteCallback"
        :delete-count="deleteCount"
        :shown="isDeleteConfirmationPopup"
        @close="closeDelete"
      />

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">
            {{ $t('objects.routing.dialplan.dialplanRules') }}
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
          :dark-mode="darkMode"
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
            ref="dialplan-table"
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
            <template #pattern="{ item }">
              {{ item.pattern }}
            </template>
            <template #schema="{ item }">
              <wt-item-link
                v-if="item.schema"
                :id="item.schema.id"
                :route-name="RouteNames.FLOW"
              >
                {{ item.schema.name }}
              </wt-item-link>
            </template>
            <template #state="{ item, index }">
              <wt-switcher
                :disabled="!hasEditAccess"
                :value="!item.disabled"
                @change="patchProperty({index, prop: 'disabled', value: !$event})"
              />
            </template>
            <template #actions="{ item }">
              <wt-tooltip class="table-action dialplan__draggable-icon">
                <template #activator>
                  <wt-icon-btn
                    v-if="hasEditAccess"
                    icon="move"
                  />
                </template>
                {{ $t('iconHints.draggable') }}
              </wt-tooltip>
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
import Sortable, { Swap } from 'sortablejs';
import { mapActions } from 'vuex';
import { useDummy } from '../../../../../app/composables/useDummy';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import DeleteConfirmationPopup
  from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import {
  useDeleteConfirmationPopup,
} from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';

Sortable.mount(new Swap());
const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
const sortableConfig = {
  swap: true, // Enable swap mode
  swapClass: 'sortable-swap-highlight', // Class name for swap item (if swap mode is enabled)
  animation: 150, // ms, animation speed moving items when sorting, `0` — without animation
  easing: 'cubic-bezier(1, 0, 0, 1)', // Easing for animation. Defaults to null. See https://easings.net/ for examples.
  ghostClass: 'sortable-ghost', // Class name for the drop placeholder
  chosenClass: 'sortable-chosen', // Class name for the chosen item
  dragClass: 'sortable-drag', // Class name for the dragging item
  handle: '.dialplan__draggable-icon', // handle's class

  direction: 'vertical', // Direction of Sortable (will be detected automatically if not given)

  forceFallback: isFirefox, // ignore the HTML5 DnD behaviour and force the fallback to kick in
  fallbackClass: 'sortable-fallback', // Class name for the cloned DOM Element when using forceFallback

  // eslint-disable-next-line no-unused-vars
  setData: (dataTransfer, draggedElement) => {
    dataTransfer.setData('foo', 'bar'); // required by Firefox in order to DnD work: https://stackoverflow.com/a/19055350/1411105
  },
};

const namespace = 'routing/dialplan';

export default {
  name: 'TheDialplan',
  components: { DeleteConfirmationPopup },
  mixins: [tableComponentMixin],
  setup() {
    const { dummy } = useDummy({ namespace, showAction: true });
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
    routeName: RouteNames.DIALPLAN,
    sortableInstance: null,
  }),
  computed: {
    path() {
      return [
        { name: this.$t('objects.routing.routing') },
        { name: this.$t('objects.routing.dialplan.dialplan'), route: '/routing/dialplan' },
      ];
    },
  },
  methods: {
    async initSortable() {
      if (!this.hasEditAccess) return;
      if (this.sortableInstance) this.destroySortable();
      // https://github.com/SortableJS/Sortable#options
      const tableBody = document.querySelector('.wt-table__body');
      this.sortableInstance = Sortable.create(tableBody, {
        ...sortableConfig,

        // Element dragging ended
        onEnd: async (event) => {
          if (event.oldIndex === event.newIndex) return;
          const fromId = this.dataList[event.oldIndex].id;
          const toId = this.dataList[event.newIndex].id;
          await this.swapRowsAndReloadList({ fromId, toId });
        },
      });
    },
    destroySortable() {
      this.sortableInstance.destroy();
      this.sortableInstance = null;
    },
    async swapRowsAndReloadList(swapPayload) {
      this.isLoading = true;
      this.destroySortable();
      await this.swapRows(swapPayload);
      await this.loadList();
      await this.initSortable();
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
  mounted() {
    this.initSortable();
  },
  unmounted() {
    this.destroySortable();
  },
};
</script>

<style lang="scss" scoped>
.dialplan {
  :deep(.sortable-chosen) {
    .dialplan__draggable-icon .wt-icon__icon {
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

  .wt-table .sortable-swap-highlight {
    background: var(--primary-color);
  }
}
</style>
