import { getDeviceHistory } from "../../../../api/directory/devices/devices";
import { DefaultHistoryModule } from "../../../BaseModules/defaults/DefaultHistoryModule";

const defaultState = () => {
  return {
    from: new Date().setHours(0, 0, 0, 0),
    to: Date.now(),
  };
};

const defaultHistoryModule = new DefaultHistoryModule(defaultState);

const state = {
  ...defaultHistoryModule.state,
};

const getters = {};

const actions = {
  GET_HISTORY_LIST: async (context) => {
    return await getDeviceHistory({
      id: context.state.itemId,
      from: context.state.from,
      to: context.state.to,
      page: context.state.page,
      size: context.state.size,
    });
  },

  ...defaultHistoryModule.actions,
};

const mutations = {
  ...defaultHistoryModule.mutations,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
