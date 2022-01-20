import DeleteConfirmationPopup
  from '../../../../components/utils/delete-confirmation-popup/delete-confirmation-popup.vue';

export default {
  components: {
    DeleteConfirmationPopup,
  },
  data: () => ({
    isDeleteConfirmation: true,
    deleteConfirmation: {
      isDeleteConfirmationPopup: false,
      deleteCount: null,
      callback: null,
    },
  }),
  computed: {
    actionPanelDeleteTooltip() {
      if (!this.selectedRows) return this.$t('reusable.delete');
      const count = this.selectedRows.length;
      return count ? this.$t('iconHints.deleteSelected', { count }) : this.$t('iconHints.deleteAll');
    },
  },
  methods: {
    askDeleteConfirmation({ deleted, callback }) {
      if (Array.isArray(deleted)) this.deleteConfirmation.deleteCount = deleted.length;
      else this.deleteConfirmation.deleteCount = 1;
      this.deleteConfirmation.isDeleteConfirmationPopup = true;
      this.deleteConfirmation.callback = callback;
    },
    confirmDelete() {
      this.deleteConfirmation.callback();
    },
    closeDelete() {
      this.deleteConfirmation.isDeleteConfirmationPopup = false;
    },
  },
};
