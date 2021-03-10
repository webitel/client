import {
  addQueueBucket,
  deleteQueueBucket,
  getQueueBucket,
  getQueueBucketsList,
  updateQueueBucket,
} from "../../../../api/contact-center/queues/queueBuckets";
import DefaultNestedModule from "../../../BaseModules/defaults/DefaultNestedModule";

const defaultItemState = () => ({
  itemId: 0,
  itemInstance: {
    bucket: '',
    ratio: 0,
  },
});

const defaultModule = new DefaultNestedModule(null, defaultItemState);

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  GET_LIST: (context) => {
    return getQueueBucketsList(context.state.parentId, context.state.page, context.state.size, context.state.search);
  },

  GET_ITEM: (context) => {
    return getQueueBucket(context.state.parentId, context.state.itemId);
  },

  POST_ITEM: (context) => {
    return addQueueBucket(context.state.parentId, context.state.itemInstance);
  },

  UPD_ITEM: (context) => {
    return updateQueueBucket(context.state.parentId, context.state.itemId, context.state.itemInstance);
  },

  DELETE_ITEM: async (context, id) => {
    await deleteQueueBucket(context.state.parentId, id);
    await context.dispatch('LOAD_DATA_LIST');
  },

  ...defaultModule.actions,
};

const mutations = {
  ...defaultModule.mutations,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
