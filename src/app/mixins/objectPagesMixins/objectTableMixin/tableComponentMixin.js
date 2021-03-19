import { mapActions, mapState } from 'vuex';
import HeadlineNav from '../../../components/utils/headline-nav/headline-nav.vue';
import baseTableMixin from '../../baseMixins/baseTableMixin/baseTableMixin';
import objectTableAccessControlMixin from './_internals/objectTableAccessControlMixin';
import getNamespacedState from '../../../store/helpers/getNamespacedState';

/**
 * @fileOverview contains main tables (like the-agents.vue) common logic
 * @param {string} this.namespace - should be declared in data()
 *      and contain a string name for storeModule like 'ccenter/agents/skills'
 * @param {string} this.routeName - should be declared in data()
 *      and contain a string name for edit and new entity route names
 *      like 'cc-agent' for create() and edit() method standardization
 * @extends baseTableMixin, objectTableAccessControlMixin
 */
export default {
  mixins: [baseTableMixin, objectTableAccessControlMixin],
  components: { HeadlineNav },
  computed: {
    ...mapState({
      headersValue(state) {
        return getNamespacedState(state, this.namespace).headers;
      },
      dataList(state) {
        return getNamespacedState(state, this.namespace).dataList;
      },
      page(state) {
        return getNamespacedState(state, this.namespace).page;
      },
      size(state) {
        return getNamespacedState(state, this.namespace).size;
      },
      search(state) {
        return getNamespacedState(state, this.namespace).search;
      },
      isNext(state) {
        return getNamespacedState(state, this.namespace).isNextPage;
      },
    }),
    headers() {
      if (!this.headersValue) return [];
      return this.headersValue.map((header) => ({
        ...header,
        text: this.$t(header.locale),
      }));
    },
  },
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
      dispatchSort(dispatch, payload) {
        return dispatch(`${this.namespace}/SORT`, payload);
      },
      removeItem(dispatch, payload) {
        return dispatch(`${this.namespace}/REMOVE_ITEM`, payload);
      },
      patchItem(dispatch, payload) {
        return dispatch(`${this.namespace}/PATCH_ITEM_PROPERTY`, payload);
      },
    }),
    create() {
      this.$router.push({ name: `${this.routeName}-new` });
    },
    edit(item) {
      this.$router.push(this.itemLink(item));
    },
    sort(...params) {
      this.dispatchSort({ header: params[0], nextSortOrder: params[1] });
    },
  },
};
