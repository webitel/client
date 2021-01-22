import { mapActions } from 'vuex';
import editComponentMixin from '../editComponentMixin';

/**
 * @fileOverview contains openedObject (wrapper with tabs, like opened-agent.vue) common logic
 * @param {string} this.namespace - should be declared in data()
 *      and contain a string name for storeModule like 'ccenter/agents/skills'
 * @extends editComponentMixin
 */
export default {
  mixins: [editComponentMixin],
  data: () => ({
    currentTab: {
      value: 'general',
    },
  }),

  created() {
    this.setId(this.$route.params.id);
    this.loadItem();
    this.setInitialTab();
  },

  methods: {
    ...mapActions({
      setId(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_ID`, payload);
      },
      resetState(dispatch, payload) {
        return dispatch(`${this.namespace}/RESET_ITEM_STATE`, payload);
      },
    }),

    setInitialTab() {
      // eslint-disable-next-line prefer-destructuring
      if (this.tabs) this.currentTab = this.tabs[0];
    },
  },
};
