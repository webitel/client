import {
  addQueueResGroup,
  deleteQueueResGroup,
  getQueueResGroup,
  getQueueResGroupList,
  updateQueueResGroup,
} from "../../../../api/contact-center/queues/queueResGroups";
import DefaultNestedModule from "../../../BaseModules/defaults/DefaultNestedModule";

const defaultItemState = () => ({
  itemId: 0,
  itemInstance: {
    resourceGroup: {},
  },
});

const defaultModule = new DefaultNestedModule(null, defaultItemState);

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  GET_LIST: (context) => {
    return getQueueResGroupList(context.state.parentId, context.state.page, context.state.size, context.state.search);
  },

  GET_ITEM: (context) => {
    return getQueueResGroup(context.state.parentId, context.state.itemId);
  },

  POST_ITEM: (context) => {
    return addQueueResGroup(context.state.parentId, context.state.itemInstance);
  },

  UPD_ITEM: (context) => {
    return updateQueueResGroup(context.state.parentId, context.state.itemId, context.state.itemInstance);
  },

  DELETE_ITEM: async (context, id) => {
    await deleteQueueResGroup(context.state.parentId, id);
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
