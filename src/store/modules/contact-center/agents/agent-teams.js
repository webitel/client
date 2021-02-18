import { getAgentTeamsList } from "../../../../api/contact-center/agents/agents";
import { DefaultNestedModule } from "../../defaults/DefaultNestedModule";

const defaultModule = new DefaultNestedModule();

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  GET_LIST: async (context) => {
    return await getAgentTeamsList(context.state.parentId, context.state.page, context.state.size, context.state.search);
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
