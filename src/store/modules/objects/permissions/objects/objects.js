const state = {
    permissionsList: []

};

const getters = {};

const actions ={
    setObjectPermissions(context, permissions) {
        context.commit('setObjectPermissions', permissions);
    }

};

const mutations = {
    setObjectPermissions(state, permissions) {
        state.permissionsList = permissions;
    }
};

export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
