import deepMerge from 'deepmerge';
import { QueueType } from 'webitel-sdk/esm2015/enums';

import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import PermissionsStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule/PermissionsStoreModule';
import QueuesAPI from '../api/queues';
import agents from '../modules/agents/store/queue-agents';
import buckets from '../modules/buckets/store/queue-buckets';
import filters from '../modules/filters/store/filters';
import hooks from '../modules/hooks/store/queue-hooks';
import log from '../modules/logs/store/queue-logs';
import members from '../modules/members/store/queue-members';
import resGroups from '../modules/res-groups/store/queue-res-groups';
import skills from '../modules/skills/store/queue-skills';
import headers from './_internals/headers';
import defaultChatInboundQueueState from './_internals/queueSchema/chatInboundQueue';
import defaultQueueState from './_internals/queueSchema/defaults/defaultQueue';
import defaultInboundJobQueueState from './_internals/queueSchema/inboundJobQueue';
import defaultInboundQueueState from './_internals/queueSchema/inboundQueue';
import defaultOfflineQueueState from './_internals/queueSchema/offlineQueue';
import defaultOutboundIVRQueueState from './_internals/queueSchema/outboundIVRQueue';
import defaultOutboundJobQueueState from './_internals/queueSchema/outboundJobQueue';
import defaultPredictiveDialerState from './_internals/queueSchema/predictiveDialer';
import defaultPreviewDialerState from './_internals/queueSchema/previewDialer';
import defaultProgressiveDialerState from './_internals/queueSchema/progressiveDialer';

const resettableState = {
  itemInstance: defaultQueueState(),
};

const queueStateMap = {
  [QueueType.OFFLINE_QUEUE]: defaultOfflineQueueState,
  [QueueType.INBOUND_QUEUE]: defaultInboundQueueState,
  [QueueType.OUTBOUND_IVR_QUEUE]: defaultOutboundIVRQueueState,
  [QueueType.PREVIEW_DIALER]: defaultPreviewDialerState,
  [QueueType.PROGRESSIVE_DIALER]: defaultProgressiveDialerState,
  [QueueType.PREDICTIVE_DIALER]: defaultPredictiveDialerState,
  [QueueType.CHAT_INBOUND_QUEUE]: defaultChatInboundQueueState,
  [QueueType.INBOUND_JOB_QUEUE]: defaultInboundJobQueueState,
  [QueueType.OUTBOUND_JOB_QUEUE]: defaultOutboundJobQueueState,
};

const actions = {
  LOAD_ITEM: async (context, type) => {
    if (context.state.itemId) {
      const item = await context.dispatch('GET_ITEM');
      context.dispatch('SET_TYPED_ITEM', {
        item,
        type: item.type,
      });
    } else {
      context.dispatch('SET_TYPED_ITEM', {
        type,
      });
    }
  },
  SET_TYPED_ITEM: (context, { type, item = {} }) => {
    const typedItem = deepMerge(queueStateMap[type](), item);
    context.commit('SET_ITEM', typedItem);
  },
  SET_ITEM_PAYLOAD_PROPERTY: (context, payload) => {
    context.commit('SET_ITEM_PAYLOAD_PROPERTY', payload);
    context.commit('SET_ITEM_PROPERTY', {
      prop: '_dirty',
      value: true,
    });
  },
  SET_ITEM_PROCESSING_PROPERTY: (context, payload) => {
    context.commit('SET_ITEM_PROCESSING_PROPERTY', payload);
    context.commit('SET_ITEM_PROPERTY', {
      prop: '_dirty',
      value: true,
    });
  },
  SET_ITEM_PROLONGATION_OPTION: (context, payload) => {
    context.commit('SET_ITEM_PROLONGATION_OPTION', payload);
    context.commit('SET_ITEM_PROPERTY', {
      prop: '_dirty',
      value: true,
    });
  },
  SET_AMD_ITEM_PROPERTY: (context, payload) => {
    context.commit('SET_AMD_ITEM_PROPERTY', payload);
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
  RESET_ITEM_STATE: async (context) => {
    context.commit('RESET_ITEM_STATE');
    context.dispatch('ccenter/queues/skills/RESET_STATE', {}, { root: true });
    context.dispatch('ccenter/queues/agents/RESET_STATE', {}, { root: true });
    context.dispatch('ccenter/queues/hooks/RESET_STATE', {}, { root: true });
    context.dispatch('ccenter/queues/buckets/RESET_STATE', {}, { root: true });
    context.dispatch('ccenter/queues/resGroups/RESET_STATE', {}, { root: true });
    context.dispatch('ccenter/queues/members/RESET_STATE', {}, { root: true });
  },
};

const mutations = {
  SET_ITEM_PAYLOAD_PROPERTY: (state, { prop, value }) => {
    state.itemInstance.payload[prop] = value;
  },
  SET_ITEM_PROCESSING_PROPERTY: (state, { prop, value }) => {
    state.itemInstance.taskProcessing[prop] = value;
  },
  SET_ITEM_PROLONGATION_OPTION: (state, { prop, value }) => {
    state.itemInstance.taskProcessing.prolongationOptions[prop] = value;
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
  .setChildModules({
    agents,
    skills,
    buckets,
    resGroups,
    hooks,
    log,
    members,
    permissions,
    filters,
  })
  .getModule({ actions, mutations });

export default queues;
