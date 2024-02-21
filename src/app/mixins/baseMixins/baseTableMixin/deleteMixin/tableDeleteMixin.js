export default {
  methods: {
    deleteData(deleted) {
      console.log('deleteData deleted:', deleted);
      return this.dispatchDelete(deleted);
    },
    dispatchDelete() {
      throw new TypeError('implement dispatchDelete method first');
    },
  },
};
