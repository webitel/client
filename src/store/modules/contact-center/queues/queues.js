import deepMerge from 'deepmerge';
import buckets from './queue-buckets';
import resGroups from './queue-res-groups';
import members from './queue-members';
import permissions from './permissions';
import {
  addQueue, deleteQueue, patchQueue,
  getQueue, getQueuesList, updateQueue,
} from '../../../../api/contact-center/queues/queues';
import { DefaultModule } from '../../defaults/DefaultModule';
import QueueType from './_internals/enums/QueueType.enum';
import defaultQueueState from './_internals/queueSchema/defaults/defaultQueue';
import defaultInboundQueueState from './_internals/queueSchema/inboundQueue';
import defaultOutboundIVRQueueState from './_internals/queueSchema/outboundIVRQueue';
import defaultOfflineQueueState from './_internals/queueSchema/offlineQueue';
import defaultPreviewDialerState from './_internals/queueSchema/previewDialer';
import defaultPredictiveDialerState from './_internals/queueSchema/predictiveDialer';
import defaultProgressiveDialerState from './_internals/queueSchema/progressiveDialer';
import proxy from '../../../../utils/editProxy';

const defaultState = () => {
  return {
    itemId: 0,
    itemInstance: defaultQueueState(),
  };
};


const defaultModule = new DefaultModule(defaultState);

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  ...defaultModule.actions,

  GET_LIST: async (context) => {
    return await getQueuesList(context.state.page, context.state.size, context.state.search);
  },

  GET_ITEM: async (context) => {
    return await getQueue(context.state.itemId);
  },

  POST_ITEM: async (context) => {
    return await addQueue(context.state.itemInstance);
  },

  PATCH_ITEM: async (context, { id, changes }) => {
    return await patchQueue(id, changes);
  },

  UPD_ITEM: async (context) => {
    await updateQueue(context.state.itemId, context.state.itemInstance);
  },

  DELETE_ITEM: async (context, id) => {
    await deleteQueue(id);
  },

  LOAD_ITEM: async (context, type) => {
    if (context.state.itemId) {
      const item = await context.dispatch('GET_ITEM');
      context.dispatch('SET_TYPED_ITEM', { item, type: item.type });
    } else {
      context.dispatch('SET_TYPED_ITEM', { type });
    }
  },

  SET_TYPED_ITEM: (context, { type, item = {} }) => {
    switch (type) {
      case QueueType.OFFLINE_QUEUE:
        item = deepMerge(defaultOfflineQueueState(), item);
        break;
      case QueueType.INBOUND_QUEUE:
        item = deepMerge(defaultInboundQueueState(), item);
        break;
      case QueueType.OUTBOUND_IVR_QUEUE:
        item = deepMerge(defaultOutboundIVRQueueState(), item);
        break;
      case  QueueType.PREVIEW_DIALER:
        item = deepMerge(defaultPreviewDialerState(), item);
        break;
      case  QueueType.PROGRESSIVE_DIALER:
        item = deepMerge(defaultProgressiveDialerState(), item);
        break;
      case  QueueType.PREDICTIVE_DIALER:
        item = deepMerge(defaultPredictiveDialerState(), item);
        break;
    }
    context.commit('SET_ITEM', proxy(item));
  },

  SET_ITEM_PAYLOAD_PROPERTY: (context, payload) => {
    context.commit('SET_ITEM_PAYLOAD_PROPERTY', payload);
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },

  SET_AMD_ITEM_PROPERTY: (context, payload) => {
    context.commit('SET_AMD_ITEM_PROPERTY', payload);
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

  RESET_ITEM_STATE: async (context) => {
    context.commit('RESET_ITEM_STATE');
    context.dispatch('ccenter/queues/buckets/RESET_ITEM_STATE', {}, { root: true });
    context.dispatch('ccenter/queues/resGroups/RESET_ITEM_STATE', {}, { root: true });
    context.dispatch('ccenter/queues/members/RESET_ITEM_STATE', {}, { root: true });
  },
};

const mutations = {

  SET_ITEM_PAYLOAD_PROPERTY: (state, { prop, value }) => {
    state.itemInstance.payload[prop] = value;
  },

  SET_AMD_ITEM_PROPERTY: (state, { prop, value }) => {
    state.itemInstance.payload.amd[prop] = value;
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

  ...defaultModule.mutations,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: { buckets, resGroups, members, permissions },
};
