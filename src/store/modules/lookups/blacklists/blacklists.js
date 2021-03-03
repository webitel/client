import {
  addBlacklist,
  deleteBlacklist,
  getBlacklist,
  getBlacklistList,
  updateBlacklist,
} from "../../../../api/lookups/blacklists/blacklists";
import numbers from './blacklistNumbers';
import { DefaultModule } from "../../defaults/DefaultModule";
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

  GET_LIST: async () => {
    return await getBlacklistList(state.page, state.size, state.search);
  },

  GET_ITEM: async () => {
    return await getBlacklist(state.itemId);
  },

  POST_ITEM: async () => {
    return await addBlacklist(state.itemInstance);
  },

  UPD_ITEM: async () => {
    await updateBlacklist(state.itemId, state.itemInstance);
  },

  DELETE_ITEM: async (context, id) => {
    await deleteBlacklist(id);
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
