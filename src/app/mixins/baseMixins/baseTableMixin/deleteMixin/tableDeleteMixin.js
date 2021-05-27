import deleteConfirmationMixin from './deleteConfirmationMixin';

export default {
  mixins: [deleteConfirmationMixin],
  methods: {
    callDelete(deleted) {
      if (this.isDeleteConfirmation) {
        this.askDeleteConfirmation({ deleted, callback: this.makeDelete.bind(this, deleted) });
      } else this.makeDelete(deleted);
    },
    makeDelete(deleted) {
      return this.dispatchDelete(deleted);
    },
    dispatchDelete() {
      throw new TypeError('implement dispatchDelete method first');
    },

    // deleteSelected() {
    //   const selectedItems = this.dataList.filter((item) => item._isSelected);
    //   this.remove(null, selectedItems);
    // },
    //
    // async remove(rowIndex, items) {
    //   if (items) {
    //     for (const item of items) {
    //       const initialIndex = this.dataList.indexOf(item);
    //       await this.removeItem(initialIndex);
    //     }
    //   } else {
    //     await this.removeItem(rowIndex);
    //   }
    //   this.loadList();
    // },
  },
};
