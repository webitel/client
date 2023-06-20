import getNamespacedState
  from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapState } from 'vuex';
import Dummy from '../assets/dummy/adm-dummy.svg';
import DummyAfterSearch from '../assets/dummy/adm-dummy-after-search.svg';

export default {
  data: () => ({
    dummyValue: '',
  }),
  computed: {
    ...mapState({
      dataList(state) {
        return getNamespacedState(state, this.namespace).dataList;
      },
      search(state) {
        return getNamespacedState(state, this.namespace).search;
      },
    }),
  },
  watch: {
    dataList: {
      handler() {
        if (!this.dataList.length) {
          if (this.search) {
            return this.dummyValue = {
              src: DummyAfterSearch,
              locale: this.$t('objects.emptyResultSearch'),
            };
          } else return this.dummyValue = {
            src: Dummy,
            locale: this.$t('objects.emptyWorkspace'),
          };
        } else return this.dummyValue = '';
      },
      immediate: true,
    },
  },
};
