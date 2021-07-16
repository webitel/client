import router from '../../../app/router/router';
import { getApplicationsAccess, getSession } from '../../../app/api/userinfo/userinfo';
import Permissions from './_internals/enums/Permissions.enum';
import NavigationPages from '../../../app/router/_internals/NavigationPages.lookup';
import convertScope from './_internals/scripts/convertScope';
import convertPermissions from './_internals/scripts/convertPermissions';
import ApplicationsAccess from '../../permissions/modules/roles/store/_internals/ApplicationsAccess';

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
  access: {},
  language: localStorage.getItem('lang'),
});

const state = {
  ...defaultState(),
};

const getters = {
  CHECK_APP_ACCESS: (state) => (app) => state.access[app]?._enabled,
  GET_OBJECT_SCOPE: (state, getters) => ({ name, route }) => {
    if (route) return getters.GET_OBJECT_SCOPE_BY_ROUTE(route);
    return getters.GET_OBJECT_SCOPE_BY_NAME(name);
  },
  GET_OBJECT_SCOPE_BY_NAME: (state) => (name) => (
    Object.values(state.scope).find((object) => name === object.name)
  ),
  GET_OBJECT_SCOPE_BY_ROUTE: (state) => (route) => (
    Object.values(state.scope).find((object) => route.name.includes(object.route))
  ),
  CHECK_OBJECT_ACCESS: (state, getters) => ({ name, route }) => {
    if (!state.access.admin || !state.access.admin._enabled) return false;
    if (route) return getters.CHECK_OBJECT_ACCESS_BY_ROUTE(route);
    return getters.CHECK_OBJECT_ACCESS_BY_NAME(name);
  },
  CHECK_OBJECT_ACCESS_BY_NAME: (state) => (name) => (
    state.access.admin[name]?._enabled
  ),
  CHECK_OBJECT_ACCESS_BY_ROUTE: (state) => (route) => {
    const accessKey = Object.keys(state.access.admin).find((object) => route.name.includes(object));
    return state.access.admin[accessKey]?._enabled;
  },
  HAS_READ_ACCESS: (state, getters) => (checkedObject) => {
    if (!getters.CHECK_OBJECT_ACCESS(checkedObject)) return false;
    if (state.permissions[Permissions.READ]) return true;
    const objectScope = getters.GET_OBJECT_SCOPE(checkedObject);
    return objectScope?.access?.includes('r');
  },
  HAS_CREATE_ACCESS: (state, getters) => (checkedObject) => {
    if (state.permissions[Permissions.CREATE]) return true;
    const objectScope = getters.GET_OBJECT_SCOPE(checkedObject);
    return objectScope?.access?.includes('x');
  },
  HAS_EDIT_ACCESS: (state, getters) => (checkedObject) => {
    if (state.permissions[Permissions.EDIT]) return true;
    const objectScope = getters.GET_OBJECT_SCOPE(checkedObject);
    return objectScope?.access?.includes('w');
  },
  HAS_DELETE_ACCESS: (state, getters) => (checkedObject) => {
    if (state.permissions[Permissions.DELETE]) return true;
    const objectScope = getters.GET_OBJECT_SCOPE(checkedObject);
    return objectScope?.access?.includes('d');
  },
  ACCESSIBLE_NAV: (state, getters) => NavigationPages.reduce((accumulator, nav) => {
      const subNav = nav.subNav.filter((subNav) => (
        getters.HAS_READ_ACCESS({ name: subNav.value })
      ));
      if (subNav.length) {
        const newNav = { ...nav, subNav };
        return [...accumulator, newNav];
      }
      return accumulator;
    }, []),
};

const actions = {
  OPEN_SESSION: async (context) => {
    if (!localStorage.getItem('access-token')) {
      router.replace('/auth');
      throw new Error('No access-token in localStorage');
    }
    const session = await getSession();
    await context.dispatch('SET_SESSION', session);
    const access = await getApplicationsAccess();
    await context.dispatch('SET_APPLICATIONS_ACCESS', new ApplicationsAccess({ access }).getAccess());
  },

  SET_SESSION: async (context, _session) => {
    const defaultSession = {
      domainId: 0,
      username: '',
      userId: 0,
      scope: [],
      roles: [],
      license: [],
    };

    try {
      await context.dispatch('RESET_STATE');
      const session = { ...defaultSession, ..._session };
      const scope = convertScope(session.scope);
      const permissions = convertPermissions(session.permissions);
      context.commit('SET_SESSION', { ...session, scope, permissions });
      await context.dispatch('SET_LOADING', false);
    } catch (err) {
      throw err;
    }
  },

  SET_APPLICATIONS_ACCESS: (context, access) => context.commit('SET_APPLICATIONS_ACCESS', access),

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

  SET_APPLICATIONS_ACCESS: (state, access) => {
    state.access = access;
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
