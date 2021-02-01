import Permissions from './_internals/enums/Permissions.enum';
import convertScope from './_internals/scripts/convertScope';
import convertPermissions from './_internals/scripts/convertPermissions';

const defaultState = () => ({
    isLoading: true,
    domainId: 0,
    name: '',
    username: '',
    account: '',
    userId: 0,
    scope: {},
    permissions: {},
    roles: [],
    license: [],
    language: localStorage.getItem('lang'),
});

const state = {
    ...defaultState()
};

const getters = {
  GET_OBJECT_SCOPE_BY_ROUTE: (state) => (route) => (
    Object.values(state.scope).find((object) => route.name.includes(object.route))
  ),
  HAS_READ_ACCESS: (state, getters) => (route) => {
    if (state.permissions[Permissions.READ]) return true;
    const objectScope = getters.GET_OBJECT_SCOPE_BY_ROUTE(route);
    return  objectScope.access?.includes('r');
  },
  HAS_DELETE_ACCESS: (state, getters) => (route) => {
    if (state.permissions[Permissions.DELETE]) return true;
    const objectScope = getters.GET_OBJECT_SCOPE_BY_ROUTE(route);
    return  objectScope.access?.includes('d');
  },
};

const actions = {
    SET_SESSION: async (context, session) => {
      try {
        await context.dispatch('RESET_STATE');
        const scope = convertScope(session.scope);
        const permissions = convertPermissions(session.permissions);
        context.commit('SET_SESSION', {...session, scope, permissions });
        await context.dispatch('SET_LOADING', false);
      } catch (err) {
        throw err;
      }
    },

    SET_DOMAIN_ID: (context, domainId) => {
        context.commit('SET_DOMAIN_ID', domainId);
    },

    SET_LOADING: (context, isLoading) => {
      context.commit('SET_LOADING', isLoading);
    },

    RESET_STATE: (context) => {
        context.commit('RESET_STATE');
    },
};

const mutations = {
    SET_SESSION: (state, session) => {
        Object.assign(state, session);
    },

    SET_DOMAIN_ID: (state, domainId) => {
        state.domainId = domainId;
    },

    SET_LOADING: (state, isLoading) => {
        state.isLoading = isLoading;
    },

    RESET_STATE: (state) => {
        Object.assign(state, defaultState());
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
