import history from './history';
import {
  addDevice,
  deleteDevice,
  getDevice,
  getDeviceList,
  updateDevice,
} from "../../../../api/directory/devices/devices";
import DefaultModule from "../../../BaseModules/defaults/DefaultModule";
import DefaultPermissionsModule from '../../../BaseModules/defaults/DefaultPermissionsModule';
import router from "../../../../router/router";
import proxy from "../../../../utils/editProxy";

const generateHotdeskAccount = (length = 7) => {
  const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let value = 'hot-';
  for (let i = 0; i < length; i += 1) {
    value += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return value;
};

const defaultState = () => {
  return {
    itemId: 0,
    ...defaultItem(),
    ...defaultHotdeskItem(),
  };
};

const defaultItem = () => {
  return {
    itemId: 0,
    itemInstance: {
      name: '',
      account: '',
      password: '',
      user: {},
      phone: {},
      ip: '',
      brand: '',
      model: '',
      mac: '',
      vars: [],
    },
  };
};

const defaultHotdeskItem = () => {
  return {
    itemId: 0,
    itemInstance: {
      name: '',
      account: generateHotdeskAccount(),
      password: '',
      user: {},
      phone: {},
      ip: '',
      brand: '',
      model: '',
      mac: '',
      hotdesks: [],
      hotdesk: true,
      vars: [],
    },
  };
};

const defaultModule = new DefaultModule(defaultState);

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  GET_LIST: async (context) => {
    return await getDeviceList(context.state.page, context.state.size, context.state.search);
  },

  GET_ITEM: async (context) => {
    return await getDevice(context.state.itemId);
  },

  POST_ITEM: async (context) => {
    return await addDevice(context.state.itemInstance);
  },

  UPD_ITEM: async (context) => {
    await updateDevice(context.state.itemId, context.state.itemInstance);
  },

  DELETE_ITEM: async (context, id) => {
    await deleteDevice(id);
  },

  LOAD_HOTDESK_ITEM: async (context) => {
    if (context.state.itemId) {
      const item = await context.dispatch('GET_ITEM');
      if (!item.hotdesk) {
        router.replace('/directory/devices/' + item.id);
        return;
      }
      context.commit('SET_HOTDESK_ITEM', proxy(item));
    } else {
      context.commit('SET_HOTDESK_ITEM');
    }
  },

  LOAD_SINGLE_ITEM: async (context) => {
    if (context.state.itemId) {
      const item = await context.dispatch('GET_ITEM');
      if (item.hotdesk) {
        router.replace('/directory/devices/hotdesk/' + item.id);
        return;
      }
      context.commit('SET_SINGLE_ITEM', proxy(item));
    } else {
      context.commit('SET_SINGLE_ITEM');
    }
  },

  ...defaultModule.actions,
};

const mutations = {
  ...defaultModule.mutations,

  SET_SINGLE_ITEM: (state, item) => {
    if (item) {
      state.itemInstance = item;
    } else {
      Object.assign(state, defaultState(), defaultItem());
    }
  },

  SET_HOTDESK_ITEM: (state, item) => {
    if (item) {
      state.itemInstance = item;
    } else {
      Object.assign(state, defaultState(), defaultHotdeskItem());
    }
  },
};

const PERMISSIONS_API_URL = '/devices';
const permissions = new DefaultPermissionsModule()
  .generateAPIActions(PERMISSIONS_API_URL)
  .getModule();

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: { history, permissions },
};
