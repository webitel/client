import res from './res-in-group';
import {
  addResGroup,
  deleteResGroup,
  getResGroup,
  getResGroupList,
  updateResGroup,
} from "../../../../api/contact-center/resourceGroups/resourceGroups";
import DefaultModule from "../../../BaseModules/defaults/DefaultModule";
import DefaultPermissionsModule from '../../../BaseModules/defaults/DefaultPermissionsModule';

const defaultState = () => {
  return {
    itemId: 0,
    itemInstance: {
      name: '',
      communication: {},
      description: '',
      time: [
        {
          start: 540,
          end: 1200,
        },
      ],
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

  GET_LIST: (context) => {
    return getResGroupList(context.state.page, context.state.size, context.state.search);
  },

  GET_ITEM: (context) => {
    return getResGroup(context.state.itemId);
  },

  POST_ITEM: (context) => {
    return addResGroup(context.state.itemInstance);
  },

  UPD_ITEM: (context) => {
    return updateResGroup(context.state.itemId, context.state.itemInstance);
  },

  DELETE_ITEM: (context, id) => {
    return deleteResGroup(id);
  },

  ADD_VARIABLE_PAIR: (context) => {
    const pair = { start: 540, end: 1200 };
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

  RESET_ITEM_STATE: (context) => {
    context.commit('RESET_ITEM_STATE');
    context.dispatch('ccenter/resGroups/res/RESET_STATE', {}, { root: true });
  },
};

const mutations = {
  ...defaultModule.mutations,

  ADD_VARIABLE_PAIR: (state, pair) => {
    state.itemInstance.time.push(pair);
  },

  SET_VARIABLE_PROP: (state, { index, prop, value }) => {
    state.itemInstance.time[index][prop] = value;
  },

  DELETE_VARIABLE_PAIR: (state, index) => {
    state.itemInstance.time.splice(index, 1);
  },
};

const PERMISSIONS_API_URL = '/call_center/resource_group';
const permissions = new DefaultPermissionsModule()
  .generateAPIActions(PERMISSIONS_API_URL)
  .getModule();

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: { res, permissions },
};
