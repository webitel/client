import { mapActions, mapState } from 'vuex';
import tableComponentMixin from '../objectTableMixin/tableComponentMixin';
import getNamespacedState from '../../../store/helpers/getNamespacedState';

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
