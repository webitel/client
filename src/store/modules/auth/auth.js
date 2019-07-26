
const state = {
  username: null,
};

const getters = {
  isAuthenticated: state => {
    return state.username || false;
  },
};

const actions = {
  setUser(context, username) {
    context.commit('setUser', username);
  },
};

const mutations = {
  setUser(state, username) {
    state.username = username;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
