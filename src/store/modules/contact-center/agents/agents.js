import skills from './agent-skills';
import history from './history';
import queues from './agent-queues';
import subordinates from './agent-subordinates';
import AgentsAPI from '../../../../api/contact-center/agents/agents';
import { DefaultModule } from '../../defaults/DefaultModule';
import DefaultPermissionsModule from '../../defaults/DefaultPermissionsModule';

const defaultState = () => ({
  itemId: 0,
  itemInstance: {
    user: {},
    team: {},
    supervisor: {},
    auditor: {},
    region: {},
    progressiveCount: 1,
    chatCount: 1,
    isSupervisor: false,
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
    return AgentsAPI.getList(context.state);
  },
  GET_ITEM: (context) => {
    return AgentsAPI.get(context.state);
  },
  POST_ITEM: (context) => {
    return AgentsAPI.add(context.state);
  },
  UPD_ITEM: (context) => {
    return AgentsAPI.update(context.state);
  },
  DELETE_ITEM: (context, id) => {
    return AgentsAPI.delete({ id });
  },
  RESET_ITEM_STATE: async (context) => {
    context.commit('RESET_ITEM_STATE');
    context.dispatch('ccenter/agents/queues/RESET_STATE', {}, { root: true });
    context.dispatch('ccenter/agents/skills/RESET_STATE', {}, { root: true });
    context.dispatch('ccenter/agents/subordinates/RESET_STATE', {}, { root: true });
  },
};

const mutations = {
  ...defaultModule.mutations,
};

const PERMISSIONS_API_URL = '/call_center/agents';
const permissions = new DefaultPermissionsModule()
  .generateAPIMethods(PERMISSIONS_API_URL)
  .getModule();

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: { history, skills, queues, subordinates, permissions },
};
