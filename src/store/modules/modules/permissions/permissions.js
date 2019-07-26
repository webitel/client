
const state = {
  roles: []
};

const getters = {

};

const actions = {
  setRoles(context, roleList) {
    context.commit('setRoles', roleList);
  },
};

const mutations = {
  setRoles(state, roleList) {
    state.roles = [...roleList];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
