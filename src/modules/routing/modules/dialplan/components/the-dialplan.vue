<template>
  <wt-page-wrapper class="dialplan" :actions-panel="false">
    <template slot="header">
      <object-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <headline-nav :path="path"></headline-nav>
      </object-header>
    </template>

    <template slot="main">
      <delete-confirmation-popup
        v-show="deleteConfirmation.isDeleteConfirmationPopup"
        :payload="deleteConfirmation"
        @close="closeDelete"
      ></delete-confirmation-popup>

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">{{ $t('objects.routing.dialplan.dialplanRules') }}</h3>
          <div class="content-header__actions-wrap">
            <wt-search-bar
              :value="search"
              debounce
              @input="setSearch"
              @search="loadList"
              @enter="loadList"
            ></wt-search-bar>
            <wt-icon-btn
              v-if="hasDeleteAccess"
              class="icon-action"
              :class="{'hidden': anySelected}"
              icon="bucket"
              :tooltip="$t('iconHints.deleteSelected')"
              @click="callDelete(selectedRows)"
            ></wt-icon-btn>
            <wt-table-actions
              :icons="['refresh']"
              @input="tableActionsHandler"
            ></wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded"></wt-loader>
        <div class="table-wrapper" v-show="isLoaded">
          <wt-table
            ref="dialplan-table"
            :headers="headers"
            :data="dataList"
            :grid-actions="hasTableActions"
            sortable
            @sort="sort"
          >
            <template slot="name" slot-scope="{ item }">
              <item-link :link="itemLink(item)">
                {{ item.name }}
              </item-link>
            </template>
            <template slot="pattern" slot-scope="{ item }">
              {{ item.pattern }}
            </template>
            <template slot="schema" slot-scope="{ item }">
              <item-link v-if="item.schema" :link="itemFlowLink(item)" target="_blank">
                {{ item.schema.name }}
              </item-link>
            </template>
            <template slot="state" slot-scope="{ item, index }">
              <wt-switcher
                :value="!item.disabled"
                :disabled="!hasEditAccess"
                @change="patchProperty({index, prop: 'disabled', value: !$event})"
              ></wt-switcher>
            </template>
            <template slot="actions" slot-scope="{ item }">
              <wt-icon-btn
                class="table-action dialplan__draggable-icon"
                icon="move"
                v-if="hasEditAccess"
                :tooltip="$t('iconHints.draggable')"
                tooltip-position="left"
              ></wt-icon-btn>
              <edit-action
                v-if="hasEditAccess"
                @click="edit(item)"
              ></edit-action>
              <delete-action
                v-if="hasDeleteAccess"
                @click="callDelete(item)"
              ></delete-action>
            </template>
          </wt-table>
          <wt-pagination
            :size="size"
            :next="isNext"
            :prev="page > 1"
            debounce
            @next="nextPage"
            @prev="prevPage"
            @input="setSize"
            @change="loadList"
          ></wt-pagination>
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { mapActions } from 'vuex';
import Sortable, { Swap } from 'sortablejs';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

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

  direction: 'vertical', // Direction of Sortable (will be detected automatically if not given)

  forceFallback: isFirefox, // ignore the HTML5 DnD behaviour and force the fallback to kick in
  fallbackClass: 'sortable-fallback', // Class name for the cloned DOM Element when using forceFallback

  // eslint-disable-next-line no-unused-vars
  setData: (dataTransfer, draggedElement) => {
    dataTransfer.setData('foo', 'bar'); // required by Firefox in order to DnD work: https://stackoverflow.com/a/19055350/1411105
  },
};

export default {
  name: 'the-dialplan',
  mixins: [tableComponentMixin],
  data: () => ({
    namespace: 'routing/dialplan',
    routeName: RouteNames.DIALPLAN,
    sortableInstance: null,
  }),
  mounted() {
    this.initSortable();
  },
  destroyed() {
    this.destroySortable();
  },
  computed: {
    path() {
      return [
        { name: this.$t('objects.routing.routing') },
        { name: this.$t('objects.routing.dialplan.dialplan'), route: '/routing/dialplan' },
      ];
    },
  },
  methods: {
    itemFlowLink({ schema }) {
      return {
        name: `${RouteNames.FLOW}-edit`,
        params: { id: schema.id },
      };
    },
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
};
</script>

<style lang="scss" scoped>
.dialplan ::v-deep {
  .sortable-chosen {
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
    grid-template-columns: 42px 1fr 1fr 1fr 10% 240px;
    grid-column-gap: 10px;
    align-items: center;
  }

  .wt-table .sortable-swap-highlight {
    background: var(--accent-color);
  }
}
</style>
