import supervisors from './team-supervisors';
import agents from './team-agents';
import {
  addTeam,
  deleteTeam,
  getTeam,
  getTeamsList,
  updateTeam,
} from "../../../../api/contact-center/teams/teams";
import DefaultModule from "../../../BaseModules/defaults/DefaultModule";
import DefaultPermissionsModule from '../../../BaseModules/defaults/DefaultPermissionsModule';

const defaultState = () => ({
  itemId: 0,
  itemInstance: {
    name: '',
    description: '',
    strategy: {},
    admin: {},
    maxNoAnswer: 3,
    wrapUpTime: 15,
    noAnswerDelayTime: 30,
    callTimeout: 60,
  },
});

const defaultModule = new DefaultModule(defaultState);

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  ...defaultModule.actions,

  GET_LIST: (context) => {
    return getTeamsList(context.state);
  },

  GET_ITEM: (context) => {
    return getTeam(context.state);
  },

  POST_ITEM: (context) => {
    return addTeam(context.state);
  },

  UPD_ITEM: (context) => {
    return updateTeam(context.state);
  },

  DELETE_ITEM: (context, id) => {
    return deleteTeam({ id });
  },

  RESET_ITEM_STATE: (context) => {
    context.commit('RESET_ITEM_STATE');
    context.dispatch('ccenter/teams/supervisors/RESET_STATE', {}, { root: true });
    context.dispatch('ccenter/teams/agents/RESET_STATE', {}, { root: true });
  },
};

const mutations = {
  ...defaultModule.mutations,
};

const PERMISSIONS_API_URL = '/call_center/teams';
const permissions = new DefaultPermissionsModule()
  .generateAPIActions(PERMISSIONS_API_URL)
  .getModule();

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: { supervisors, agents, permissions },
};
