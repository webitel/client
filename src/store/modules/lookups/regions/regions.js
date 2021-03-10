import DefaultModule from '../../../BaseModules/defaults/DefaultModule';
import RegionsAPI from '../../../../api/lookups/regions/regions';

const defaultState = () => ({
  itemId: 0,
  itemInstance: {
    name: '',
    timezone: {},
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
    return RegionsAPI.getList(context.state);
  },
  GET_ITEM: (context) => {
    return RegionsAPI.get(context.state);
  },
  POST_ITEM: (context) => {
    return RegionsAPI.add(context.state);
  },
  UPD_ITEM: (context) => {
    return RegionsAPI.update(context.state);
  },
  DELETE_ITEM: (context, id) => {
    return RegionsAPI.delete({ id });
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
