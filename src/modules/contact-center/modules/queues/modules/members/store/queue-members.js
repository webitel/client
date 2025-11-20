import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import QueuesAPI from '../../../api/queues';
import MembersAPI from '../api/queueMembers';
import filters from '../modules/filters/store/filters';
import headers from './_internals/headers';

const resettableItemState = {
  parentQueue: {},
  itemInstance: {
    name: '',
    priority: 0,
    expireAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    bucket: {},
    timezone: {},
    agent: {},
    communications: [],
    variables: [],
  },
};

const actions = {
  LOAD_PARENT_QUEUE: async (context) => {
    try {
      const queue = await QueuesAPI.get({
        itemId: context.state.parentId,
      });
      context.commit('SET_PARENT_QUEUE', queue);
    } catch (err) {
      throw err;
    }
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
  DELETE_SINGLE: (context, { id }) => context.dispatch('DELETE_ITEM', id),
  DELETE_BULK: (context, deleted) => {
    const id = deleted.map((item) => item.id);
    return MembersAPI.deleteBulk(context.state.parentId, { id });
  },
  DELETE_FILTERED: (context, query = context.getters['filters/GET_FILTERS']) => {
    return MembersAPI.deleteBulk(context.state.parentId, query);
  },
  DELETE_ALL: (context) =>
    MembersAPI.deleteBulk(context.state.parentId, {
      id: [],
    }),
  RESET_MEMBERS: (context) => {
    const response = MembersAPI.resetMembers(context.state);
    context.dispatch('LOAD_DATA_LIST');
    return response;
  },
  SET_PARENT_ITEM_ID: (context, id) => {
    context.commit('SET_PARENT_ITEM_ID', id);
    return context.dispatch('LOAD_PARENT_QUEUE');
  },
  ADD_MEMBER_COMMUNICATION: (context, item) => {
    const value = context.state.itemInstance.communications.concat(item);
    context.commit('SET_ITEM_PROPERTY', {
      prop: 'communications',
      value,
    });
    context.commit('SET_ITEM_PROPERTY', {
      prop: '_dirty',
      value: true,
    });
  },
  UPDATE_MEMBER_COMMUNICATION: (context, { index, item }) => {
    const value = [...context.state.itemInstance.communications];
    value.splice(index, 1, item);
    context.commit('SET_ITEM_PROPERTY', {
      prop: 'communications',
      value,
    });
    context.commit('SET_ITEM_PROPERTY', {
      prop: '_dirty',
      value: true,
    });
  },
  DELETE_MEMBER_COMMUNICATION: (context, deleted) => {
    let action = 'DELETE_SINGLE_COMMUNICATION';
    if (Array.isArray(deleted)) {
      if (deleted.length) action = 'DELETE_BULK_COMMUNICATIONS';
      else action = 'DELETE_ALL_COMMUNICATIONS';
    }
    return context.dispatch(action, deleted);
  },
  DELETE_SINGLE_COMMUNICATION: (context, deleted) => {
    const communications = [...context.state.itemInstance.communications];
    const index = communications.findIndex((comm) => 
      comm.destination === deleted.destination && 
      comm.type?.id === deleted.type?.id
    );
    if (index !== -1) {
      communications.splice(index, 1);
    }
    context.commit('SET_ITEM_PROPERTY', {
      prop: 'communications',
      value: communications,
    });
    context.commit('SET_ITEM_PROPERTY', {
      prop: '_dirty',
      value: true,
    });
  },
  DELETE_BULK_COMMUNICATIONS: (context, deleted) => {
    const communications = context.state.itemInstance.communications.filter(
      (comm) => !deleted.some((delComm) => 
        delComm.destination === comm.destination && 
        delComm.type?.id === comm.type?.id
      ),
    );
    context.commit('SET_ITEM_PROPERTY', {
      prop: 'communications',
      value: communications,
    });
    context.commit('SET_ITEM_PROPERTY', {
      prop: '_dirty',
      value: true,
    });
  },
  DELETE_ALL_COMMUNICATIONS: (context) => {
    const communications = [];
    context.commit('SET_ITEM_PROPERTY', {
      prop: 'communications',
      value: communications,
    });
    context.commit('SET_ITEM_PROPERTY', {
      prop: '_dirty',
      value: true,
    });
  },
  ADD_VARIABLE_PAIR: (context) => {
    const pair = { key: '', value: '' };
    context.commit('ADD_VARIABLE_PAIR', pair);
    context.commit('SET_ITEM_PROPERTY', {
      prop: '_dirty',
      value: true,
    });
  },
  SET_VARIABLE_PROP: (context, { index, prop, value }) => {
    context.commit('SET_VARIABLE_PROP', {
      index,
      prop,
      value,
    });
    context.commit('SET_ITEM_PROPERTY', {
      prop: '_dirty',
      value: true,
    });
  },
  DELETE_VARIABLE_PAIR: (context, index) => {
    context.commit('DELETE_VARIABLE_PAIR', index);
    context.commit('SET_ITEM_PROPERTY', {
      prop: '_dirty',
      value: true,
    });
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
};

const queueMembers = new NestedObjectStoreModule({
  resettableItemState,
  headers,
})
  .attachAPIModule(MembersAPI)
  .generateAPIActions()
  .setChildModules({ filters })
  .getModule({ actions, mutations });

export default queueMembers;
