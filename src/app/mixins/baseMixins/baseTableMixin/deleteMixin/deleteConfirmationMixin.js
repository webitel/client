import DeleteConfirmationPopup
  from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';

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
