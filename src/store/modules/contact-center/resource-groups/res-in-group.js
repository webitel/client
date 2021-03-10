import {
  addResInGroup,
  deleteResInGroup,
  getResInGroup,
  getResInGroupList,
  updateResInGroup,
} from "../../../../api/contact-center/resourceGroups/resInGroup";
import DefaultNestedModule from "../../../BaseModules/defaults/DefaultNestedModule";

const defaultItemState = () => ({
  itemId: 0,
  itemInstance: {
    resource: {},
  },
});


const defaultModule = new DefaultNestedModule(null, defaultItemState);

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  ...defaultModule.actions,

  GET_LIST: (context) => {
    return getResInGroupList(context.state.parentId, context.state.page, context.state.size, context.state.search);
  },

  GET_ITEM: (context) => {
    return getResInGroup(context.state.parentId, context.state.itemId);
  },

  POST_ITEM: (context) => {
    return addResInGroup(context.state.parentId, context.state.itemInstance);
  },

  UPD_ITEM: (context) => {
    return updateResInGroup(context.state.parentId, context.state.itemId, context.state.itemInstance);
  },

  DELETE_ITEM: (context, id) => {
    return deleteResInGroup(context.state.parentId, id);
  },
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
