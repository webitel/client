import communications from './queue-member-communications';
import {
  addMember,
  deleteMember,
  deleteMembers,
  getMember,
  getMembersList,
  updateMember,
} from '../../../../api/contact-center/queues/queueMembers';
import { getQueue } from '../../../../api/contact-center/queues/queues';
import DefaultNestedModule from '../../../BaseModules/defaults/DefaultNestedModule';

const defaultItemState = () => ({
  itemId: 0,
  parentQueue: {},
  itemInstance: {
    name: '',
    priority: 0,
    expireAt: Date.now() + 24 * 60 * 60 * 1000,
    skill: {},
    bucket: {},
    timezone: {},
    communications: [],
    variables: [],
  },
});

const defaultModule = new DefaultNestedModule(null, defaultItemState);

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  ...defaultModule.actions,

  LOAD_PARENT_QUEUE: async (context) => {
    try {
      const queue = await getQueue(context.state.parentId);
      context.commit('SET_PARENT_QUEUE', queue);
    } catch (err) {
      throw err;
    }
  },

  ADD_ITEM: async (context) => {
    if (!context.state.itemId) {
      const id = await context.dispatch('POST_ITEM');
      context.dispatch('SET_ITEM_ID', id);
      await context.dispatch('LOAD_ITEM');
    }
  },

  UPDATE_ITEM: async (context) => {
    if (context.state.itemInstance._dirty) {
      await context.dispatch('UPD_ITEM');
      await context.dispatch('LOAD_ITEM');
    }
  },

  GET_LIST: (context) => {
    return getMembersList(context.state.parentId, context.state.page, context.state.size, context.state.search);
  },

  GET_ITEM: (context) => {
    return getMember(context.state.parentId, context.state.itemId);
  },

  POST_ITEM: (context) => {
    return addMember(context.state.parentId, context.state.itemInstance);
  },

  UPD_ITEM: (context) => {
    return updateMember(context.state.parentId, context.state.itemId, context.state.itemInstance);
  },

  DELETE_ITEM: (context, id) => {
    return deleteMember(context.state.parentId, id);
  },

  DELETE_ITEMS: async (context, ids) => {
    await deleteMembers(context.state.parentId, ids);
  },

  SET_PARENT_ITEM_ID: async (context, payload) => {
    await defaultModule.actions.SET_PARENT_ITEM_ID(context, payload);
    return context.dispatch('LOAD_PARENT_QUEUE');
  },

  ADD_COMMUNICATION_ITEM: (context, item) => {
    context.commit('ADD_COMMUNICATION_ITEM', item);
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },

  UPDATE_COMMUNICATION_ITEM: (context, { index, item }) => {
    context.commit('UPDATE_COMMUNICATION_ITEM', { index, item });
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },

  REMOVE_COMMUNICATION_ITEM: async (context, index) => {
    context.commit('REMOVE_COMMUNICATION_ITEM', index);
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
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

  REMOVE_ITEMS: async (context, ids) => {
    try {
      await context.dispatch('DELETE_ITEMS', ids);
    } catch {
    }
  },
};

const mutations = {
  ...defaultModule.mutations,

  SET_PARENT_QUEUE: (state, queue) => {
    state.parentQueue = queue;
  },

  ADD_COMMUNICATION_ITEM: (state, item) => {
    state.itemInstance.communications.push(item);
  },

  UPDATE_COMMUNICATION_ITEM: (state, { index, item }) => {
    state.itemInstance.communications[index] = item;
  },

  REMOVE_COMMUNICATION_ITEM: (state, index) => {
    state.itemInstance.communications.splice(index, 1);
  },

  ADD_VARIABLE_PAIR: (state, pair) => {
    state.itemInstance.variables.push(pair);
  },

  SET_VARIABLE_PROP: (state, { index, prop, value }) => {
    state.itemInstance.variables[index][prop] = value;
  },

  DELETE_VARIABLE_PAIR: (state, index) => {
    state.itemInstance.variables.splice(index, 1);
  },

  REMOVE_ITEMS: (state, indexs) => {
    for (const item of indexs) {
      state.dataList.splice(item, 1);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: { communications },
};
