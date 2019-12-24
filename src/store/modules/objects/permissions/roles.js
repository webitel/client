import proxy from '../../../../utils/editProxy';
import {addRole, deleteRole, getRole, getRoleList, updateRole} from "../../../../api/objects/permissions/roles";

const defaultState = () => {
  return {
    itemId: 0,
    itemInstance: {
      name: 'role name',
      description: 'descr',
    },
  };
};

const state = {
  dataList: [],
  size: '10',
  search: '',
  ...defaultState()
};

const getters = {};

const actions = {
  SET_ITEM_ID: (context, id) => {
    if (id !== 'new') context.commit('SET_ITEM_ID', id);
  },

  LOAD_DATA_LIST: async (context) => {
    const response = await getRoleList(state.size, state.search);
    context.commit('RESET_ITEM_STATE');
    context.commit('SET_DATA_LIST', response);
  },

  SET_SIZE: (context, size) => {
    context.commit('SET_SIZE', size);
  },

  SET_SEARCH: (context, search) => {
    context.commit('SET_SEARCH', search);
  },

  LOAD_ITEM: async (context) => {
    if (state.itemId) {
      const item = await getRole(state.itemId);
      context.commit('SET_ITEM', proxy(item));
    }
  },

  SET_ITEM_PROPERTY: (context, payload) => {
    context.commit('SET_ITEM_PROPERTY', payload);
  },

  ADD_ITEM: async (context) => {
    if(!state.itemId) {
      const id = await addRole(state.itemInstance);
      context.dispatch('SET_ITEM_ID', id);
      context.dispatch('LOAD_ITEM');
    }
  },

  UPDATE_ITEM: async (context) => {
    if (state.itemInstance._dirty) {
      await updateRole(state.itemId, state.itemInstance);
      context.dispatch('LOAD_ITEM');
    }
  },

  REMOVE_ITEM: async (context, index) => {
    const id = state.dataList[index].id;
    context.commit('REMOVE_ITEM', index);
    try {
      await deleteRole(id);
    } catch {
    }
  },

  RESET_ITEM_STATE: async (context) => {
    context.commit('RESET_ITEM_STATE');
  },
};

const mutations = {
  SET_ITEM_ID: (state, id) => {
    state.itemId = id;
  },

  SET_DATA_LIST: (state, list) => {
    state.dataList = list;
  },

  SET_SIZE: (state, size) => {
    state.size = size;
  },

  SET_SEARCH: (state, search) => {
    state.search = search;
  },

  SET_ITEM_PROPERTY: (state, {prop, value}) => {
    state.itemInstance[prop] = value;
  },

  SET_ITEM: (state, item) => {
    state.itemInstance = item;
  },

  REMOVE_ITEM: (state, index) => {
    state.dataList.splice(index, 1);
  },

  RESET_ITEM_STATE: (state) => {
    Object.assign(state, defaultState());
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
