import { mapActions } from 'vuex';
import editComponentMixin from './editComponentMixin';
import headlineNavMixin from '../../baseMixins/headlineNavMixin/headlineNavMixin';

/**
 * @fileOverview contains openedObject (wrapper with tabs, like opened-agent.vue) common logic
 * @param {string} this.namespace - should be declared in data()
 *      and contain a string name for storeModule like 'ccenter/agents/skills'
 * @extends editComponentMixin
 */
export default {
  mixins: [editComponentMixin, headlineNavMixin],
  data: () => ({
    currentTab: {
      value: 'general',
    },
  }),

  created() {
    this.setInitialTab();
    this.loadPageData();
  },

  methods: {
    ...mapActions({
      setId(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_ID`, payload);
      },
      // editComponentMixin duplication
      // resetState(dispatch, payload) {
      //   return dispatch(`${this.namespace}/RESET_ITEM_STATE`, payload);
      // },
    }),

    async loadPageData() {
      await this.setId(this.$route.params.id);
      return this.loadItem();
    },

    setInitialTab() {
      // eslint-disable-next-line prefer-destructuring
      if (this.tabs) this.currentTab = this.tabs[0];
    },
  },
};
