import AgentsAPI from '../../../../api/contact-center/agents/agents';
import DefaultNestedModule from '../../../BaseModules/defaults/DefaultNestedModule';

const defaultModule = new DefaultNestedModule();

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  ...defaultModule.actions,
  GET_LIST: (context) => {
    return AgentsAPI.getAgentsInQueue(context.state);
  },
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
