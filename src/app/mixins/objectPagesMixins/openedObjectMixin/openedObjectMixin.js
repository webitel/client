import { mapActions, mapState } from 'vuex';
import ObjectHeader from '../../../components/utils/object-utils/the-object-header.vue';
import Permissions from '../../../../modules/_shared/permissions-tab/components/permissions-tab.vue';
import baseObjectMixin from '../../baseMixins/baseObjectMixin/baseObjectMixin';
import headlineNavMixin from '../../baseMixins/headlineNavMixin/headlineNavMixin';
import openedObjectAccessControlMixin from './_internals/openedObjectAccessControlMixin';
import getNamespacedState from '../../../store/helpers/getNamespacedState';

/**
 * @fileOverview contains openedObject (wrapper with tabs, like opened-agent.vue) common logic
 * @param {string} this.namespace - should be declared in data()
 *      and contain a string name for storeModule like 'ccenter/agents/skills'
 * @extends baseObjectMixin
 */
export default {
  mixins: [
    openedObjectAccessControlMixin,
    headlineNavMixin,
    baseObjectMixin,
  ],
  components: {
    ObjectHeader,
    Permissions,
  },
  data: () => ({
    currentTab: {
      value: 'general',
    },
  }),

  created() {
    this.setInitialTab();
    this.loadPageData();
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
      };
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
      // eslint-disable-next-line prefer-destructuring
      if (this.tabs) this.currentTab = this.tabs[0];
    },

    close() {
      this.$router.go(-1);
    },
  },
};