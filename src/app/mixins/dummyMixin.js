import Dummy from '../assets/dummy/adm-dummy.svg';
import DummyAfterSearch from '../assets/dummy/adm-dummy-after-search.svg';

export default {
  data: () => ({
    dummyValue: '',
    dummyPic: Dummy,
    dummyPicAfterSearch: DummyAfterSearch,
  }),
  computed: {
    dummyLocale() {
      return this.$t('objects.emptyWorkspace');
    },
    dummyLocaleAfterSearch() {
      return this.$t('objects.emptyResultSearch');
    },
  },
  watch: {
    dataList: {
      handler() {
        if (!this.dataList.length) {
          if (this.search || Object.values(this.$route.query).some((query) => query.length) ) {
            return this.dummyValue = {
              src: this.dummyPicAfterSearch,
              locale: this.dummyLocaleAfterSearch,
            };
          } else return this.dummyValue = {
            src: this.dummyPic,
            locale: this.dummyLocale,
          };
        } else return this.dummyValue = '';
      },
      immediate: true,
    },
  },
};
