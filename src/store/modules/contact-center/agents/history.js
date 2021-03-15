import { getAgentHistory } from "../../../../api/contact-center/agents/agents";
import { DefaultHistoryModule } from "../../../BaseModules/defaults/DefaultHistoryModule";

const defaultState = () => {
  return {
    from: new Date().setHours(0, 0, 0, 0),
    to: Date.now(),
  };
};

const defaultModule = new DefaultHistoryModule(defaultState);

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  GET_HISTORY_LIST: async (context) => {
    return await getAgentHistory(context.state);
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
