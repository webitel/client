import ObjectHeader from '../../../components/utils/object-utils/the-object-header.vue';
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
        await this.loadDataList(this.$route.query);
      } catch (e) {
      } finally {
        this.isLoaded = true;
      }
    },
  },
};
