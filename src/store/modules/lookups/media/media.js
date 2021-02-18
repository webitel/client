import { addMedia, deleteMedia, getMedia, getMediaList } from "../../../../api/lookups/media/media";
import { DefaultModule } from "../../defaults/DefaultModule";


const defaultState = () => {
  return {
    itemId: 0,
    itemInstance: {},
  };
};

const defaultModule = new DefaultModule(defaultState);

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  GET_LIST: async () => {
    return await getMediaList(state.page, state.size, state.search);
  },

  GET_ITEM: async () => {
    return await getMedia(state.itemId);
  },

  POST_ITEM: async () => {
    return await addMedia(state.itemInstance);
  },

  DELETE_ITEM: async (context, id) => {
    await deleteMedia(id);
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
