import { DefaultNestedModule } from '../../defaults/DefaultNestedModule';
import { addToken, deleteToken, getTokens } from '../../../../api/directory/users/users';

const defaultItemState = () => ({
  itemId: 0,
  itemInstance: {
    token: '',
    usage: '',
  },
});


const defaultModule = new DefaultNestedModule(null, defaultItemState);

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  ...defaultModule.actions,

  GET_LIST: async (context) => {
    return await getTokens(context.state.parentId, context.state.page, context.state.size, context.state.search);
  },

  POST_ITEM: async (context) => {
    return await addToken(context.state.parentId, context.state.itemInstance);
  },

  DELETE_ITEM: async (context, id) => {
    return await deleteToken(context.state.parentId, id);
  },

  ADD_TOKEN: async (context) => {
    try {
      let resp = await context.dispatch('POST_ITEM');
      await context.dispatch('LOAD_DATA_LIST');
      context.commit('SET_TOKEN', resp.token);
    } catch (err) {
      throw err;
    }
  },

  LOAD_DATA_LIST: async (context) => {
    if (context.state.parentId) {
      const response = await context.dispatch('GET_LIST');
      context.commit('SET_DATA_LIST', response.list);
      context.commit('SET_IS_NEXT', response.next);
    }
  },
};

const mutations = {
  ...defaultModule.mutations,

  SET_TOKEN: async (state, token) => {
    state.itemInstance.token = token;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
