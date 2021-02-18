import {
  addUser,
  deleteUser,
  getUser,
  getUsersList,
  patchUser,
  updateUser,
} from "../../../../api/directory/users/users";
import { DefaultModule } from "../../defaults/DefaultModule";
import tokens from './usersTokens';
import permissions from './permissions';

const defaultState = () => {
  return {
    itemId: 0,
    itemInstance: {
      name: '',
      username: '',
      password: '',
      extension: '',
      roles: [],
      device: {},
      license: [],
      devices: [],
      presence: {
        status: '',
        note: '',
      },
      variables: [],
    },
  };
};

const defaultModule = new DefaultModule(defaultState);

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  ...defaultModule.actions,

  GET_LIST: async () => {
    return await getUsersList(state.page, state.size, state.search);
  },

  GET_ITEM: async () => {
    return await getUser(state.itemId);
  },

  POST_ITEM: async () => {
    return await addUser(state.itemInstance);
  },

  PATCH_ITEM: async (context, { id, changes }) => {
    await patchUser(id, changes);
  },

  UPD_ITEM: async () => {
    await updateUser(state.itemId, state.itemInstance);
  },

  DELETE_ITEM: async (context, id) => {
    await deleteUser(id);
  },

  ADD_VARIABLE_PAIR: (context) => {
    const pair = { key: '', value: '' };
    context.commit('ADD_VARIABLE_PAIR', pair);
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },

  SET_VARIABLE_PROP: (context, { index, prop, value }) => {
    context.commit('SET_VARIABLE_PROP', { index, prop, value });
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },

  DELETE_VARIABLE_PAIR: (context, index) => {
    context.commit('DELETE_VARIABLE_PAIR', index);
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },

  SET_USER_DND: async (context, { item, value }) => {
    const dnd = value ? 'dnd' : '';
    const changes = { status: dnd };
    try {
      await context.dispatch('PATCH_ITEM', { id: item.id, changes });
    } catch (err) {
      throw err;
    } finally {
      await context.dispatch('LOAD_DATA_LIST');
    }
  },

  RESET_ITEM_STATE: (context) => {
    context.commit('RESET_ITEM_STATE');
    context.dispatch('directory/users/tokens/RESET_STATE', {}, { root: true });
  },
};

const mutations = {
  ADD_VARIABLE_PAIR: (state, pair) => {
    state.itemInstance.variables.push(pair);
  },

  SET_VARIABLE_PROP: (state, { index, prop, value }) => {
    state.itemInstance.variables[index][prop] = value;
  },

  DELETE_VARIABLE_PAIR: (state, index) => {
    state.itemInstance.variables.splice(index, 1);
  },

  ...defaultModule.mutations,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: { tokens, permissions },
};
