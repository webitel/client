import proxy from '../../../../utils/editProxy';
import {
  addGateway,
  deleteGateway,
  getGateway,
  getGatewayList,
  patchGateway,
  updateGateway,
} from '../../../../api/routing/gateways/gateways';
import DefaultModule from '../../../BaseModules/defaults/DefaultModule';
import registerGateway from './_internals/gatewaySchema/registerGateway';
import trunkingGateway from './_internals/gatewaySchema/trunkingGateway';

const defaultState = () => ({
  itemId: 0,
  itemInstance: {},
});

const defaultModule = new DefaultModule(defaultState);

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  ...defaultModule.actions,

  GET_LIST: (context) => {
    return getGatewayList(context.state.page, context.state.size, context.state.search);
  },

  GET_ITEM: (context) => {
    return getGateway(context.state.itemId);
  },

  POST_ITEM: (context) => {
    return addGateway(context.state.itemInstance);
  },

  PATCH_ITEM: (context, { id, changes }) => {
    return patchGateway(id, changes);
  },

  UPD_ITEM: (context) => {
    return updateGateway(context.state.itemId, context.state.itemInstance);
  },

  DELETE_ITEM: (context, id) => {
    return deleteGateway(id);
  },

  CHANGE_STATE: async (context, { value, item }) => {
    const changes = { enable: value };
    const index = context.state.dataList.indexOf(item);
    try {
      await context.dispatch('PATCH_ITEM', { id: item.id, changes });
      context.commit('CHANGE_STATE', { value, index });
    } catch {
      context.dispatch('LOAD_DATA_LIST');
    }
  },

  LOAD_REGISTER_ITEM: async (context) => {
    if (context.state.itemId) {
      const item = await context.dispatch('GET_ITEM');
      context.commit('SET_ITEM', proxy(item));
    } else {
      context.commit('SET_REGISTER_ITEM');
    }
  },

  LOAD_TRUNKING_ITEM: async (context) => {
    if (context.state.itemId) {
      const item = await context.dispatch('GET_ITEM');
      context.commit('SET_ITEM', proxy(item));
    } else {
      context.commit('SET_TRUNKING_ITEM');
    }
  },

  ADD_VARIABLE_PAIR: (context) => {
    const pair = { ip: '', proto: 'any', port: null };
    context.commit('ADD_VARIABLE_PAIR', pair);
  },

  SET_VARIABLE_PROP: (context, { index, prop, value }) => {
    context.commit('SET_VARIABLE_PROP', { index, prop, value });
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },

  DELETE_VARIABLE_PAIR: (context, index) => {
    context.commit('DELETE_VARIABLE_PAIR', index);
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },


};

const mutations = {
  ...defaultModule.mutations,

  CHANGE_STATE: (state, { value, index }) => {
    state.dataList[index].enable = value;
  },

  SET_REGISTER_ITEM: (state) => {
    state.itemInstance = registerGateway();
  },

  SET_TRUNKING_ITEM: (state) => {
    state.itemInstance = trunkingGateway();
  },

  ADD_VARIABLE_PAIR: (state, pair) => {
    state.itemInstance.ipacl.push(pair);
  },

  SET_VARIABLE_PROP: (state, { index, prop, value }) => {
    state.itemInstance.ipacl[index][prop] = value;
  },

  DELETE_VARIABLE_PAIR: (state, index) => {
    state.itemInstance.ipacl.splice(index, 1);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
