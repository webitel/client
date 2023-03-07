import { mapActions, mapState } from 'vuex';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import ObjectListPopup from '../../../components/utils/object-list-popup/object-list-popup.vue';
import openedTabComponentMixin from '../openedObjectTabMixin/openedTabComponentMixin';
import baseTableMixin from '../../baseMixins/baseTableMixin/baseTableMixin';
import OnePlusMany from '../../../components/utils/table-cell/one-plus-many-table-cell/one-plus-many-table-cell.vue';

/**
 * @fileOverview contains openedObject tab with table
 *      (tab with subordinate entity, like opened-agent-teams.vue) common logic
 * @param {string} this.subNamespace - should be declared in data()
 *      and contain a string name for sub-entity storeModule like 'teams'
 * @extends openedTabComponentMixin,
 * @extends baseTableMixin
 */
export default {
  mixins: [openedTabComponentMixin, baseTableMixin],
  components: { OnePlusMany, ObjectListPopup },
  inject: ['$eventBus'],
  watch: {
    parentId(value) {
      this.setParentId(value);
    },
  },

  computed: {
    ...mapState({
      parentId(state) {
        return getNamespacedState(state, `${this.namespace}`).itemId;
      },
      headersValue(state) {
        return getNamespacedState(state, `${this.namespace}/${this.subNamespace}`).headers;
      },
      dataList(state) {
        return getNamespacedState(state, `${this.namespace}/${this.subNamespace}`).dataList;
      },
      page(state) {
        return getNamespacedState(state, `${this.namespace}/${this.subNamespace}`).page;
      },
      size(state) {
        return getNamespacedState(state, `${this.namespace}/${this.subNamespace}`).size;
      },
      search(state) {
        return getNamespacedState(state, `${this.namespace}/${this.subNamespace}`).search;
      },
      isNext(state) {
        return getNamespacedState(state, `${this.namespace}/${this.subNamespace}`).isNextPage;
      },
    }),
    headers() {
      if (!this.headersValue) return [];
      return this.headersValue.map((header) => ({
        ...header,
        text: typeof header.locale === 'string' ? this.$t(header.locale) : this.$tc(...header.locale),
      }));
    },
  },

  methods: {
    ...mapActions({
      addParentItem(dispatch, payload) {
        return dispatch(`${this.namespace}/ADD_ITEM`, payload);
      },
    }),
    ...mapActions({
      setParentId(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/SET_PARENT_ITEM_ID`, payload);
      },
      setId(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/SET_ITEM_ID`, payload);
      },
      loadDataList(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/LOAD_DATA_LIST`, payload);
      },
      setSize(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/SET_SIZE`, payload);
      },
      setSearch(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/SET_SEARCH`, payload);
      },
      nextPage(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/NEXT_PAGE`, payload);
      },
      prevPage(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/PREV_PAGE`, payload);
      },
      dispatchSort(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/SORT`, payload);
      },
      dispatchDelete(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/DELETE`, payload);
      },
      patchItem(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/PATCH_ITEM_PROPERTY`, payload);
      },
      resetItemState(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/RESET_ITEM_STATE`, payload);
      },
    }),

    async create() {
      const invalid = this.checkValidations();
      if (!invalid) {
        try {
          if (!this.parentId) {
            await this.addParentItem();
            const routeName = this.$route.name.replace('-new', '-edit');
            await this.$router.replace({ name: routeName, params: { id: this.parentId } });
          }
          this.openPopup();
        } catch (err) {
          throw err;
        }
      } else {
        this.$eventBus.$emit('notification', { type: 'error', text: 'Check your validations!' });
      }
    },

    edit(item) {
      this.setId(item.id);
      this.openPopup();
    },
    sort(...params) {
      this.dispatchSort({ header: params[0], nextSortOrder: params[1] });
    },
  },
};
