import { mapActions } from 'vuex';
import openedTabComponentMixin from '../openedTabComponentMixin';
import baseTableMixin from '../baseTableMixin/baseTableMixin';

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
  watch: {
    parentId(value) {
      this.setParentId(value);
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
      removeItem(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/REMOVE_ITEM`, payload);
      },
      resetItemState(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/RESET_ITEM_STATE`, payload);
      },
    }),

    async create() {
      if (!this.checkValidations()) {
        if (!this.id) await this.addParentItem();
        this.openPopup();
      } else {
        this.$eventBus.$emit('notification', { type: 'error', text: 'Check your validations!' });
      }
    },

    edit(item) {
      this.setId(item.id);
      this.openPopup();
    },
  },
};
