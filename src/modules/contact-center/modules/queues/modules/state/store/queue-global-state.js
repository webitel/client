import { mapActions } from 'vuex';
import QueueStateAPI from '../api/queueState';

const state = {
  isAllEnabled: false,
  isLoading: false,
};

const actions = {
  FETCH_GLOBAL_STATE: async ({ commit }) => {
    commit('SET_LOADING', true);
    try {
      const state = await QueueStateAPI.getQueuesGlobalState();
      commit('SET_GLOBAL_STATE', state?.isAllEnabled || false);
      return state;
    } catch (error) {
      console.error('Failed to fetch global state:', error);
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  SET_GLOBAL_STATE: async ({ commit }, { enabled }) => {
    try {
      await QueueStateAPI.setQueuesGlobalState({ enabled });
      commit('SET_GLOBAL_STATE', enabled);
      return { enabled };
    } catch (error) {
      console.error('Failed to set global state:', error);
      throw error;
    }
  },
};

const mutations = {
  SET_GLOBAL_STATE: (state, isAllEnabled) => {
    state.isAllEnabled = isAllEnabled;
  },
  SET_LOADING: (state, isLoading) => {
    state.isLoading = isLoading;
  },
};

const getters = {
  IS_ALL_ENABLED: (state) => state.isAllEnabled,
  IS_LOADING: (state) => state.isLoading,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
