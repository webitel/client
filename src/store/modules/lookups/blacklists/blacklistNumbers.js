import BlacklistNumbersAPI from '../../../../api/lookups/blacklists/blacklistNumbers';
import { DefaultNestedModule } from '../../defaults/DefaultNestedModule';

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
  GET_LIST: (context) => {
    return BlacklistNumbersAPI.getList(context.state);
  },
  GET_ITEM: (context) => {
    return BlacklistNumbersAPI.get(context.state);
  },
  POST_ITEM: (context) => {
    return BlacklistNumbersAPI.add(context.state);
  },
  UPD_ITEM: (context) => {
    return BlacklistNumbersAPI.update(context.state);
  },
  DELETE_ITEM: (context, id) => {
    return BlacklistNumbersAPI.delete({ parentId: context.state.parentId, id });
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
