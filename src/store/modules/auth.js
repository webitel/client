
const state = {
    username: null,
    // accessToken: null,
    // refreshToken: null
};

const getters = {

};

const actions = {
    // setCredentials(context, credentials) {
    //     context.commit('setCredentials', credentials);
    // },
    setUser(context, username) {
        context.commit('setUser', username);
    }
};

const mutations = {
    // setCredentials(state, credentials) {
    //     state.accessToken = credentials.access_token;
    //     state.refreshToken = credentials.refresh_token;
    // },
    setUser(state, username) {
        state.username = username;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};