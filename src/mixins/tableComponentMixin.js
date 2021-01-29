import { mapActions } from 'vuex';
import HeadlineNav from '../components/utils/headline-nav/headline-nav.vue';
import baseTableMixin from './baseTableMixin/baseTableMixin';
import scopeMixin from './scopeMixin/scopeMixin';

/**
 * @fileOverview contains main tables (like the-agents.vue) common logic
 * @param {string} this.namespace - should be declared in data()
 *      and contain a string name for storeModule like 'ccenter/agents/skills'
 * @param {string} this.routeName - should be declared in data()
 *      and contain a string name for edit and new entity route names
 *      like 'cc-agent' for create() and edit() method standardization
 * @extends baseTableMixin
 */
export default {
  mixins: [baseTableMixin, scopeMixin],
  components: { HeadlineNav },
  methods: {
    ...mapActions({
      loadDataList(dispatch, payload) {
        return dispatch(`${this.namespace}/LOAD_DATA_LIST`, payload);
      },
      setSize(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_SIZE`, payload);
      },
      setSearch(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_SEARCH`, payload);
      },
      nextPage(dispatch, payload) {
        return dispatch(`${this.namespace}/NEXT_PAGE`, payload);
      },
      prevPage(dispatch, payload) {
        return dispatch(`${this.namespace}/PREV_PAGE`, payload);
      },
      removeItem(dispatch, payload) {
        return dispatch(`${this.namespace}/REMOVE_ITEM`, payload);
      },
    }),

    create() {
      this.$router.push({ name: `${this.routeName}-new` });
    },

    edit(item) {
      this.$router.push({
        name: `${this.routeName}-edit`,
        params: { id: item.id },
      });
    },
  },
};
