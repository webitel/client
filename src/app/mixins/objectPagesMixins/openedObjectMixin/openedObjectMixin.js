import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';
import { ErrorRedirectMap } from '../../../../modules/error-pages/enems/ErrorRedirectMap.enum';

import Permissions from '../../../../modules/_shared/permissions-tab/components/permissions-tab.vue';
import baseObjectMixin from '../../baseMixins/baseObjectMixin/baseObjectMixin';
import breadcrumbMixin from '../../baseMixins/breadcrumbMixin/breadcrumbMixin';
import openedObjectAccessControlMixin from './_internals/openedObjectAccessControlMixin';

/**
 * @fileOverview contains openedObject (wrapper with tabs, like opened-agent.vue) common logic
 * @param {string} this.namespace - should be declared in data()
 *      and contain a string name for storeModule like 'ccenter/agents/skills'
 * @extends baseObjectMixin
 */
export default {
  mixins: [openedObjectAccessControlMixin, breadcrumbMixin, baseObjectMixin],
  components: {
    Permissions,
  },

  async created() {
    try {
      await this.loadPageData();
    } catch (err) {
      this.handleError(err)
    }
  },

  computed: {
    ...mapState({
      id(state) {
        return getNamespacedState(state, this.namespace).itemId;
      },
      itemInstance(state) {
        return getNamespacedState(state, this.namespace).itemInstance;
      },
    }),
    permissionsTab() {
      return {
        text: this.$tc('objects.permissions.permissions', 2),
        value: 'permissions',
        pathName: this.permissionsTabPathName,
      };
    },
    currentTab() {
      return this.tabs.find(({ pathName }) => this.$route.name === pathName) || this.tabs[0];
    },
    tabs() {
      return [];
    },
  },

  methods: {
    ...mapActions({
      setId(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_ID`, payload);
      },
    }),

    async loadPageData() {
      await this.setId(this.$route.params.id);
      return this.loadItem();
    },

    setInitialTab() {

      if (this.tabs.length) this.currentTab = this.tabs[0];
    },

    close() {
      // Need to close the tab if it was open in a new tab
      // https://webitel.atlassian.net/browse/WTEL-4575
      // TODO delete close method in all opened objects and add to them routeName property
      if (window.history.length === 1) window.close();
      this.$router.push({ name: this.routeName });
    },
    changeTab(tab) {
      this.$router.push({ ...this.$route, name: tab.pathName });
    },

    handleError (err) {
      const status = err?.status ?? err?.response?.status;
      const to = ErrorRedirectMap[status];
      if (to) return this.$router.push(to);
    }
  },
};
