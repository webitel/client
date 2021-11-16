import { mapActions, mapState } from 'vuex';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import tableComponentMixin from '../objectTableMixin/tableComponentMixin';

export default {
  mixins: [tableComponentMixin],
  destroyed() {
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
      resetState(dispatch, payload) {
        return dispatch(`${this.namespace}/RESET_ITEM_STATE`, payload);
      },
    }),
    prettifyTime(time) {
      if (!time) return 'none';
      return new Date(+time).toLocaleString();
    },
    close() {
      this.$emit('close');
    },
  },
};
