import FlowAPI from '../../../../api/routing/flow/flow';
import { DefaultModule } from '../../defaults/DefaultModule';

const defaultState = () => ({
  itemId: 0,
  itemInstance: {
    name: '',
    schema: '[]',
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
    return FlowAPI.getList(context.state);
  },
  GET_ITEM: (context) => {
    return FlowAPI.get(context.state);
  },
  POST_ITEM: (context) => {
    return FlowAPI.add(context.state);
  },
  UPD_ITEM: (context) => {
    return FlowAPI.update(context.state);
  },
  DELETE_ITEM: (context, id) => {
    return FlowAPI.delete({ id });
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
