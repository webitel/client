export default {
  data: () => ({
    dataPage: 1,
    dataSize: 20,
    dataSearch: '',
    rootMargin: '200px',
    isMounted: false, // isMounted recomputes observerOptions with $ref, when component renders
    isNext: true,
    isLoading: true,
  }),

  mounted() {
    this.isMounted = true;
  },

  computed: {
    obsOptions() {
      if (this.isMounted) {
        const root = this.$refs['scroll-wrap'];
        return {
          root,
          rootMargin: this.rootMargin,
        };
      }
      return null;
    },
  },

  methods: {
    setData(items) {
      if (this.dataPage === 1) {
        this.dataList = items.map((items) => ({ ...items, _isSelected: false }));
      } else {
        this.dataList = [...this.dataList, ...items]
        .map((items) => ({ ...items, _isSelected: false }));
      }
    },

    resetData() {
      this.dataPage = 1;
      this.loadDataList();
    },

    async loadDataList() {
      if (!this.dataList.length) this.isLoading = true;
      const params = this.collectParams();
      const { items, next } = await this.fetch(params);
      this.isNext = next;
      this.setData(items);
      this.dataPage += 1;
      this.isLoading = false;
    },

    async handleIntersect() {
      console.log('handleIntersect');
      if (this.isNext) {
        await this.loadDataList();
      }
    },

    collectParams() {
      const params = {
        page: this.dataPage,
        size: this.dataSize,
        search: this.dataSearch,
      };
      if (this.dataFields) params.fields = this.dataFields;
      if (this.dataSort) params.sort = this.dataSort;
      if (this.dataFilters) params.filters = this.dataFilters;
      return params;
    },

    fetch() {
    },
  },
};