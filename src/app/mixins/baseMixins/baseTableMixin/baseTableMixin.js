import ObjectHeader from '../../../components/utils/object-utils/the-object-header.vue';
import EditAction from '../../../components/utils/table-cell/default-table-actions/edit-action.vue';
import DeleteAction from '../../../components/utils/table-cell/default-table-actions/delete-action.vue';
import HistoryAction from '../../../components/utils/table-cell/default-table-actions/history-action.vue';
import itemLinkMixin from './itemLinkMixin';
import tableActionsHandlerMixin from './tableActionsMixin';
import deleteMixin from './deleteMixin/tableDeleteMixin';

/**
 * @fileOverview abstract mixin,
 * used by main-table (tableComponentMixin)
 * and table-in-tab (openedObjectTableTabMixin) mixins
 *
 * @extends itemLinkMixin, tableActionsHandlerMixin
 */
export default {
  mixins: [
    deleteMixin,
    itemLinkMixin,
    tableActionsHandlerMixin,
  ],
  components: {
    ObjectHeader,
    EditAction,
    DeleteAction,
    HistoryAction,
  },

  data: () => ({
    isLoaded: false,
  }),

  created() {
    this.initTableView();
  },

  computed: {
    selectedRows() {
      return this.dataList.filter((item) => item._isSelected);
    },
    // shows delete table action if some items are selected
    anySelected() {
      return !this.selectedRows?.length;
    },
  },

  methods: {
    initTableView() {
      if (this.setParentId) this.setParentId(this.parentId);
      this.loadList();
    },
    async loadList() {
      this.isLoaded = false;
      try {
        await this.loadDataList();
      } catch (e) {
      } finally {
        this.isLoaded = true;
      }
    },
  },
};
