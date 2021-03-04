import BlacklistsAPI from '../../../../api/lookups/blacklists/blacklists';
import numbers from './blacklistNumbers';
import { DefaultModule } from '../../defaults/DefaultModule';
import DefaultPermissionsModule from '../../defaults/DefaultPermissionsModule';

const defaultState = () => ({
  itemId: 0,
  itemInstance: {
    name: '',
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
    return BlacklistsAPI.getList(context.state);
  },
  GET_ITEM: (context) => {
    return BlacklistsAPI.get(context.state);
  },
  POST_ITEM: (context) => {
    return BlacklistsAPI.add(context.state);
  },
  UPD_ITEM: (context) => {
    return BlacklistsAPI.update(context.state);
  },
  DELETE_ITEM: (context, id) => {
    return BlacklistsAPI.delete({ id });
  },
  RESET_ITEM_STATE: async (context) => {
    context.commit('RESET_ITEM_STATE');
    context.dispatch('lookups/blacklists/numbers/RESET_STATE', {}, { root: true });
  },
};

const mutations = {
  ...defaultModule.mutations,
};

const PERMISSIONS_API_URL = '/call_center/list';
const permissions = new DefaultPermissionsModule()
  .generateAPIMethods(PERMISSIONS_API_URL)
  .getModule();

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: { numbers, permissions },
};
