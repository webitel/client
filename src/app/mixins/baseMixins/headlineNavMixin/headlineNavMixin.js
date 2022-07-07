
export default {
  data: () => ({
    pathName: '',
  }),
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
