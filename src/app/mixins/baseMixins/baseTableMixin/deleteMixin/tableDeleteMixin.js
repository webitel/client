import deleteConfirmationMixin from './deleteConfirmationMixin';

export default {
  mixins: [deleteConfirmationMixin],
  methods: {
    callDelete(deleted) {
      if (this.isDeleteConfirmation) {
        this.askDeleteConfirmation({
          deleted,
          callback: this.makeDelete.bind(this, deleted),
        });
      } else this.makeDelete(deleted);
    },
    makeDelete(deleted) {
      return this.dispatchDelete(deleted);
    },
    dispatchDelete() {
      throw new TypeError('implement dispatchDelete method first');
    },
  },
};
