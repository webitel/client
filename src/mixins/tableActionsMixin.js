export default {
    methods: {
      tableActionsHandler(eventName) {
        switch (eventName) {
          case 'refresh':
            this.refreshList();
            break;
          case 'columnSelect':
            this.openColumnSelect();
            break;
          case 'filterReset':
            this.resetFilters();
            break;
          case 'settings':
            this.expandFilters();
            break;
          default:
        }
      },

      expandFilters() {
        this.isOpened = !this.isOpened;
      },
      refreshList() {
        this.loadList();
      },
      openColumnSelect() {
        this.isFilterFieldsOpened = true;
      },
      resetFilters() {
        this.$router.replace({ query: null });
      },
    },
  };
