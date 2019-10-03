
const state = {
  username: null,
  domainId: null,
};

const getters = {
  isAuthenticated (state) {
    return state.username || false;
  },

  getDomainId(state) {
    return state.domainId;
  }
};

const actions = {
  setUser(context, username) {
    context.commit('setUser', username);
  },

  setDomainId(context, domainId) {
    context.commit('setDomainId', domainId);
  }
};

const mutations = {
  setUser(state, username) {
    state.username = username;
  },

  setDomainId(state, domainId) {
    state.domainId = domainId;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
