import deepMerge from 'deepmerge';
import agents from '../modules/agents/store/queue-agents';
import buckets from '../modules/buckets/store/queue-buckets';
import skills from '../modules/skills/store/queue-skills';
import hooks from '../modules/hooks/store/queue-hooks';
import resGroups from '../modules/res-groups/store/queue-res-groups';
import log from '../modules/logs/store/queue-logs';
import members from '../modules/members/store/queue-members';
import QueuesAPI from '../api/queues';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import PermissionsStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule';
import QueueType from './_internals/enums/QueueType.enum';
import defaultQueueState from './_internals/queueSchema/defaults/defaultQueue';
import defaultInboundQueueState from './_internals/queueSchema/inboundQueue';
import defaultOutboundIVRQueueState from './_internals/queueSchema/outboundIVRQueue';
import defaultOfflineQueueState from './_internals/queueSchema/offlineQueue';
import defaultPreviewDialerState from './_internals/queueSchema/previewDialer';
import defaultProgressiveDialerState from './_internals/queueSchema/progressiveDialer';
import defaultPredictiveDialerState from './_internals/queueSchema/predictiveDialer';
import defaultChatInboundQueueState from './_internals/queueSchema/chatInboundQueue';
import defaultTaskQueueState from './_internals/queueSchema/taskQueue';
import proxy from '../../../../../app/utils/editProxy';
import headers from './_internals/headers';

const resettableState = {
  itemInstance: defaultQueueState(),
};

const actions = {
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
      case QueueType.PREVIEW_DIALER:
        item = deepMerge(defaultPreviewDialerState(), item);
        break;
      case QueueType.PROGRESSIVE_DIALER:
        item = deepMerge(defaultProgressiveDialerState(), item);
        break;
      case QueueType.PREDICTIVE_DIALER:
        item = deepMerge(defaultPredictiveDialerState(), item);
        break;
      case QueueType.CHAT_INBOUND_QUEUE:
        item = deepMerge(defaultChatInboundQueueState(), item);
        break;
      case QueueType.TASK_QUEUE:
        item = deepMerge(defaultTaskQueueState(), item);
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
    context.dispatch('ccenter/queues/skills/RESET_STATE', {}, { root: true });
    context.dispatch('ccenter/queues/buckets/RESET_STATE', {}, { root: true });
    context.dispatch('ccenter/queues/resGroups/RESET_STATE', {}, { root: true });
    context.dispatch('ccenter/queues/members/RESET_STATE', {}, { root: true });
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
};

const PERMISSIONS_API_URL = '/call_center/queues';
const permissions = new PermissionsStoreModule()
  .generateAPIActions(PERMISSIONS_API_URL)
  .getModule();

const queues = new ObjectStoreModule({ resettableState, headers })
  .attachAPIModule(QueuesAPI)
  .generateAPIActions()
  .setChildModules({ agents, skills, buckets, resGroups, hooks, log, members, permissions })
  .getModule({ actions, mutations });

export default queues;
