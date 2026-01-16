import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapGetters, mapState } from 'vuex';

import accessControlMixin from '../../baseMixins/accessControlMixin/accessControlMixin';
import baseTableMixin from '../../baseMixins/baseTableMixin/baseTableMixin';


/**
 * @fileOverview contains main tables (like the-agents.vue) common logic
 * @param {string} this.namespace - should be declared in data()
 *      and contain a string name for storeModule like 'ccenter/agents/skills'
 * @param {string} this.routeName - should be declared in data()
 *      and contain a string name for edit and new entity route names
 *      like 'cc-agent' for create() and edit() method standardization
 * @extends baseTableMixin, accessControlMixin
 */
export default {
  mixins: [baseTableMixin, accessControlMixin],
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
    ...mapGetters('appearance', {
      darkMode: 'DARK_MODE',
    }),
    headers() {
      if (!this.headersValue) return [];
      return this.headersValue.map((header) => {
        let localizedText;
        // set "false" if no locale prop
        if (header.locale) {
          localizedText =
            !header.locale || typeof header.locale === 'string'
              ? this.$t(header.locale)
              : this.$t(...header.locale);
        }
        return {
          ...header,
          text: localizedText || header.text,
        };
      });
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
      dispatchDelete(dispatch, payload) {
        return dispatch(`${this.namespace}/DELETE`, payload);
      },
      patchItem(dispatch, payload) {
        return dispatch(`${this.namespace}/PATCH_ITEM_PROPERTY`, payload);
      },
    }),
    create() {
      this.$router.push({ name: `${this.routeName}-card`, params: { id: 'new' } });
    },
    edit(item, config) {
      if (config?.blank) {
        const routeData = this.$router.resolve(this.editLink(item));
        window.open(routeData.href, '_blank');

        return
      }

      this.$router.push(this.editLink(item));
    },
    sort(...params) {
      this.dispatchSort({
        header: params[0],
        nextSortOrder: params[1],
      });
    },
  },
};
