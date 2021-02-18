import {
  addTeamSupervisor,
  deleteTeamSupervisor,
  getTeamSupervisor,
  getTeamSupervisorsList,
  updateTeamSupervisor,
} from '../../../../api/contact-center/teams/teamSupervisors';
import { DefaultNestedModule } from '../../defaults/DefaultNestedModule';

const defaultItemState = () => ({
  itemId: 0,
  itemInstance: {
    agent: {},
  },
});

const defaultModule = new DefaultNestedModule(null, defaultItemState);

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  GET_LIST: (context) => {
    return getTeamSupervisorsList(context.state.parentId, context.state.page, context.state.size, context.state.search);
  },

  GET_ITEM: (context) => {
    return getTeamSupervisor(context.state.parentId, context.state.itemId);
  },

  POST_ITEM: (context) => {
    return addTeamSupervisor(context.state.parentId, context.state.itemInstance);
  },

  UPD_ITEM: (context) => {
    return updateTeamSupervisor(context.state.parentId, context.state.itemId, context.state.itemInstance);
  },

  DELETE_ITEM: (context, id) => {
    return deleteTeamSupervisor(context.state.parentId, id);
  },

  ...defaultModule.actions,
};

const mutations = {
  ...defaultModule.mutations,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
