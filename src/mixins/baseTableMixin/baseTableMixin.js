import ObjectHeader from '../../components/object-utils/the-object-header.vue';
import EditAction from '../../components/utils/default-table-actions/edit-action.vue';
import DeleteAction from '../../components/utils/default-table-actions/delete-action.vue';
import HistoryAction from '../../components/utils/default-table-actions/history-action.vue';
import tableActionsHandlerMixin from './tableActionsMixin';


import vuetable from 'vuetable-2/src/components/Vuetable';
import pagination from '../../components/utils/table-pagination';
import switcher from '../../components/utils/switcher';
import status from '../../components/utils/status';
import search from '../../components/utils/search';
import loader from '../../components/utils/loader';

/**
 * @fileOverview abstract mixin,
 * used by main-table (tableComponentMixin)
 * and table-in-tab (openedObjectTableTabMixin) mixins
 *
 * @extends tableActionsHandlerMixin
 */
export default {
  mixins: [tableActionsHandlerMixin],
  components: {
    ObjectHeader,
    EditAction,
    DeleteAction,
    HistoryAction,

    // FIXME: DELETE ME AFTER WEBITEL-UI REFACTOR
    vuetable,
    pagination,
    switcher,
    status,
    search,
    loader,
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
