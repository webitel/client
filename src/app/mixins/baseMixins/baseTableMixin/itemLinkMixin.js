import ItemLink from '../../../components/utils/table-cell/item-link-table-cell/item-link-table-cell.vue';
import RouteNames from '../../../router/_internals/RouteNames.enum';

export default {
  components: { ItemLink },
  data: () => ({
    RouteNames,
  }),
  methods: {
    editLink({ id }) {
      const routeName = this.routeName || this.tableObjectRouteName;
      return { name: `${routeName}-edit`, params: { id } };
    },
  },
};
