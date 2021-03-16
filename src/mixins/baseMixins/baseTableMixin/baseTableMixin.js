import ObjectHeader from '../../../components/object-utils/the-object-header.vue';
import EditAction from '../../../components/utils/table-cell/default-table-actions/edit-action.vue';
import DeleteAction from '../../../components/utils/table-cell/default-table-actions/delete-action.vue';
import HistoryAction from '../../../components/utils/table-cell/default-table-actions/history-action.vue';
import Status from '../../../components/utils/status.vue';
import itemLinkMixin from './itemLinkMixin';
import tableActionsHandlerMixin from './tableActionsMixin';

/**
 * @fileOverview abstract mixin,
 * used by main-table (tableComponentMixin)
 * and table-in-tab (openedObjectTableTabMixin) mixins
 *
 * @extends itemLinkMixin, tableActionsHandlerMixin
 */
export default {
  mixins: [itemLinkMixin, tableActionsHandlerMixin],
  components: {
    ObjectHeader,
    EditAction,
    DeleteAction,
    HistoryAction,
    Status,
  },

  data: () => ({
    isLoaded: false,
    popupTriggerIf: false,
  }),

  created() {
    if (this.setParentId) this.setParentId(this.parentId);
    this.loadList();
  },

  computed: {
    // shows delete table action if some items are selected
    anySelected() {
      if (this.dataList) {
        return !this.dataList.some((item) => item._isSelected);
      }
      return false;
    },
  },

  methods: {
    async loadList() {
      this.isLoaded = false;
      try {
        await this.loadDataList();
      } catch (e) {
      } finally {
        this.isLoaded = true;
      }
    },

    deleteSelected() {
      const selectedItems = this.dataList.filter((item) => item._isSelected);
      this.remove(null, selectedItems);
    },

    async remove(rowIndex, items) {
      if (items) {
        for (const item of items) {
          const initialIndex = this.dataList.indexOf(item);
          await this.removeItem(initialIndex);
        }
      } else {
        await this.removeItem(rowIndex);
      }
      this.loadList();
    },
  },
};
