import {
  addBlacklistCommunication,
  deleteBlacklistCommunication,
  getBlacklistCommunication,
  getBlacklistCommunicationList,
  updateBlacklistCommunication,
} from "../../../../api/lookups/blacklists/blacklistNumbers";
import { DefaultNestedModule } from "../../defaults/DefaultNestedModule";

const defaultItemState = () => ({
  itemId: 0,
  itemInstance: {
    number: '',
    description: '',
  },
});


const defaultModule = new DefaultNestedModule(null, defaultItemState);

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  ...defaultModule.actions,

  GET_LIST: async () => {
    return await getBlacklistCommunicationList(state.parentId, state.page, state.size, state.search);
  },

  GET_ITEM: async () => {
    return await getBlacklistCommunication(state.parentId, state.itemId);
  },

  POST_ITEM: async () => {
    return await addBlacklistCommunication(state.parentId, state.itemInstance);
  },

  UPD_ITEM: async () => {
    await updateBlacklistCommunication(state.parentId, state.itemId, state.itemInstance);
  },

  DELETE_ITEM: async (context, id) => {
    await deleteBlacklistCommunication(state.parentId, id);
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
