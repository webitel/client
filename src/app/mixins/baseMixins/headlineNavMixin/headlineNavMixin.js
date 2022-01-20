import HeadlineNav from '../../../components/utils/headline-nav/headline-nav.vue';

export default {
  data: () => ({
    pathName: '',
  }),
  components: { HeadlineNav },
  watch: {
    'itemInstance._dirty': {
      handler(value) {
        if (!value) this.setPathName();
      },
      immediate: true,
    },
  },
  methods: {
    setPathName() {
      this.pathName = this.itemInstance.name;
    },
  },
};
