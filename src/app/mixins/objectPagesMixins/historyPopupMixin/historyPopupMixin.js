import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { formatDate } from '@webitel/ui-sdk/utils';
import { mapActions, mapState } from 'vuex';

import tableComponentMixin from '../objectTableMixin/tableComponentMixin';

export default {
  mixins: [tableComponentMixin],
  beforeUnmount() {
    this.resetState();
  },
  computed: {
    ...mapState({
      from(state) {
        return getNamespacedState(state, this.namespace).from;
      },
      to(state) {
        return getNamespacedState(state, this.namespace).to;
      },
      isHistoryOpened() {
        return this.$route.params.historyId;
      },
      fromQuery() {
        return this.$route.query.from;
      },
      toQuery() {
        return this.$route.query.to;
      },
    }),
  },
  methods: {
    ...mapActions({
      setFrom(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_FROM`, payload);
      },
      setTo(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_TO`, payload);
      },
      setPeriod(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_PERIOD`, payload);
      },
      resetState(dispatch, payload) {
        return dispatch(`${this.namespace}/RESET_ITEM_STATE`, payload);
      },
      setParentItemId(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_PARENT_ITEM_ID`, payload);
      },
    }),
    selectForm(from) {
      return this.$router.push({
        ...this.$route,
        query: { ...this.$route.query, from, to: this.toQuery || Date.now() },
      });
    },
    selectTo(to) {
      return this.$router.push({
        ...this.$route,
        query: { ...this.$route.query, to, from: this.fromQuery || Date.now() },
      });
    },
    prettifyTime(time) {
      if (!time) return 'none';
      return formatDate(+time, 'datetime');
    },
    close() {
      this.$emit('close');
    },
    initTableView() {
      // just implement this method to use it with :shown prop.
    },
  },

  watch: {
    isHistoryOpened: {
      async handler(id) {
        if (id) {
          this.setParentItemId(id);
          await this.loadList();

          if (this.fromQuery && this.toQuery) {
            this.setPeriod({ from: this.fromQuery, to: this.toQuery });
          }
        } else {
          this.resetState();
        }
      },
      immediate: true,
    },
    fromQuery(from) {
      if (from) this.setFrom(from);
    },
    toQuery(to) {
      if (to) this.setTo(to);
    },
  },
};
