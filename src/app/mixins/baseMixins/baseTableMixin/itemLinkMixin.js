import ItemLink from '../../../components/utils/table-cell/item-link-table-cell/item-link-table-cell.vue';

export default {
  components: { ItemLink },
  data: () => ({}),
  methods: {
    itemLink({ id }) {
      const routeName = this.routeName || this.tableObjectRouteName;
      return { name: `${routeName}-edit`, params: { id } };
    },
  },
};
