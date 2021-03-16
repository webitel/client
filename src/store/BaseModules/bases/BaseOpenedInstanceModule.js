import proxy from '../../../utils/editProxy';
import deepCopy from 'deep-copy';

const state = {
  itemId: 0,
  itemInstance: {},
};

const actions = {
  SET_PARENT_ITEM_ID: (context, id) => {
    context.commit('SET_PARENT_ITEM_ID', id);
  },
  SET_ITEM_ID: (context, id) => {
    if (id !== 'new') context.commit('SET_ITEM_ID', id);
    else context.commit('SET_ITEM_ID', 0);
  },
  LOAD_ITEM: async (context) => {
    if (context.state.itemId) {
      const item = await context.dispatch('GET_ITEM');
      context.commit('SET_ITEM', proxy(item));
    }
  },
  SET_ITEM_PROPERTY: (context, payload) => {
    context.commit('SET_ITEM_PROPERTY', payload);
  },
  RESET_ITEM_STATE: async (context) => {
    context.commit('RESET_ITEM_STATE');
  },
};

const mutations = {
  SET_PARENT_ITEM_ID: (state, id) => {
    state.parentId = id;
  },
  SET_ITEM_ID: (state, id) => {
    state.itemId = id;
  },
  SET_ITEM_PROPERTY: (state, { prop, value }) => {
    state.itemInstance[prop] = value;
  },
  SET_ITEM: (state, item) => {
    state.itemInstance = item;
  },
};

export default {
  getActions: () => actions,
  getMutations: () => mutations,
  generateState: () => deepCopy(state),
};
