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
  ...defaultModule.actions,
  GET_LIST: (context) => {
    return getMediaList(context.state);
  },
  GET_ITEM: (context) => {
    return getMedia(context.state);
  },
  POST_ITEM: (context) => {
    return addMedia(context.state);
  },
  DELETE_ITEM: (context, id) => {
    return deleteMedia({ id });
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
