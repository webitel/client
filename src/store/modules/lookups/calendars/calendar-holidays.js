import store from '../../../store';
import { DefaultNestedListModule } from "../../defaults/DefaultNestedListModule";

const defaultState = () => {
  return {
    itemInstance: {
      name: '',
      date: Date.now(),
      repeat: true,
    },
  };
};

const defaultModule = new DefaultNestedListModule(defaultState);

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  GET_LIST: async () => {
    const defaultObject = {
      _isSelected: false,
      repeat: false,
    };

    return store.state.lookups.calendars.itemInstance.excepts.map(item => {
      return {
        ...defaultObject,
        ...item,
      };
    });
  },

  GET_ITEM: async () => {
    return { ...store.state.lookups.calendars.itemInstance.excepts[state.itemId], _dirty: false };
  },

  POST_ITEM: async (context) => {
    await context.dispatch('lookups/calendars/ADD_EXCEPT_ITEM',
      state.itemInstance, { root: true });
  },

  UPD_ITEM: async (context) => {
    await context.dispatch('lookups/calendars/UPDATE_EXCEPT_ITEM',
      { index: state.itemId, item: state.itemInstance }, { root: true });
  },

  DELETE_ITEM: async (context, id) => {
    await context.dispatch('lookups/calendars/REMOVE_EXCEPT_ITEM',
      id, { root: true });
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
