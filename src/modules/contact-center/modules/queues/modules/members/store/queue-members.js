import MembersAPI, { deleteMembers } from '../api/queueMembers';
import { getQueue } from '../../../api/queues';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import headers from './_internals/headers';

const resettableItemState = {
  parentQueue: {},
  itemInstance: {
    name: '',
    priority: 0,
    expireAt: Date.now() + 24 * 60 * 60 * 1000,
    bucket: {},
    timezone: {},
    communications: [],
    variables: [],
  },
};

const actions = {
  LOAD_PARENT_QUEUE: async (context) => {
    try {
      const queue = await getQueue({ itemId: context.state.parentId });
      context.commit('SET_PARENT_QUEUE', queue);
    } catch (err) {
      throw err;
    }
  },
  DELETE_ITEMS: async (context, ids) => {
    await deleteMembers(context.state.parentId, ids);
  },
  ADD_ITEM: async (context) => {
    if (!context.state.itemId) {
      const { id } = await context.dispatch('POST_ITEM');
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
  SET_PARENT_ITEM_ID: (context, id) => {
    context.commit('SET_PARENT_ITEM_ID', id);
    return context.dispatch('LOAD_PARENT_QUEUE');
  },
  ADD_MEMBER_COMMUNICATION: (context, item) => {
    const value = context.state.itemInstance.communications.concat(item);
    context.commit('SET_ITEM_PROPERTY', { prop: 'communications', value });
  },
  UPDATE_MEMBER_COMMUNICATION: (context, { index, item }) => {
    const value = [...context.state.itemInstance.communications];
    value.splice(index, 1, item);
    context.commit('SET_ITEM_PROPERTY', { prop: 'communications', value });
  },
  REMOVE_MEMBER_COMMUNICATION: (context, index) => {
    const value = [...context.state.itemInstance.communications];
    value.splice(index, 1);
    context.commit('SET_ITEM_PROPERTY', { prop: 'communications', value });
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
  SET_PARENT_QUEUE: (state, queue) => {
    state.parentQueue = queue;
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

const queueMembers = new NestedObjectStoreModule({ resettableItemState, headers })
  .attachAPIModule(MembersAPI)
  .generateAPIActions()
  .getModule({ actions, mutations });

export default queueMembers;
