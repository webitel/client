import CommunicationsAPI from '../../../../api/lookups/communications/communications';
import { DefaultModule } from "../../defaults/DefaultModule";

const defaultState = () => ({
  itemId: 0,
  itemInstance: {
    name: '',
    code: '',
    description: '',
  },
});

const defaultModule = new DefaultModule(defaultState);

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  ...defaultModule.actions,
  GET_LIST: (context) => {
    return CommunicationsAPI.getList(context.state);
  },
  GET_ITEM: (context) => {
    return CommunicationsAPI.get(context.state);
  },
  POST_ITEM: (context) => {
    return CommunicationsAPI.add(context.state);
  },
  UPD_ITEM: (context) => {
    return CommunicationsAPI.update(context.state);
  },
  DELETE_ITEM: async (context, id) => {
    return CommunicationsAPI.delete({ id });
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
