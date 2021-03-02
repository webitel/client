import PermissionsAPI from '../../../api/shared/permissions/PermissionsAPI';
import AccessMode from '../permissions/objects/_internals/enums/AccessMode.enum';

export class DefaultPermissionsModule {
  defaultState = () => ({
    dataList: [],
    page: 1,
    size: 10,
    search: '',
    isNextPage: false,
  })

  getters = {};

  actions = {
    SET_PARENT_ITEM_ID: (context, id) => {
      context.commit('SET_PARENT_ITEM_ID', id);
    },
    LOAD_DATA_LIST: async (context) => {
      if (context.state.parentId) {
        try {
          const response = await context.dispatch('GET_LIST');
          if (response.list) {
            context.commit('SET_DATA_LIST', response.list);
            context.commit('SET_IS_NEXT', response.next);
          }
        } catch (err) {
          throw err;
        }
      }
    },
    SET_SIZE: (context, size) => {
      context.commit('SET_SIZE', size);
    },
    SET_SEARCH: (context, search) => {
      context.commit('SET_SEARCH', search);
    },

    NEXT_PAGE: (context) => {
      if (context.state.isNextPage) {
        context.commit('INCREMENT_PAGE');
        context.dispatch('LOAD_DATA_LIST');
      }
    },
    PREV_PAGE: (context) => {
      if (context.state.page) {
        context.commit('DECREMENT_PAGE');
        context.dispatch('LOAD_DATA_LIST');
      }
    },
    CHANGE_CREATE_ACCESS_MODE: (context, payload) => context.dispatch('CHANGE_ACCESS_MODE', { ruleName: 'x', ...payload }),
    CHANGE_READ_ACCESS_MODE: (context, payload) => context.dispatch('CHANGE_ACCESS_MODE', { ruleName: 'r', ...payload }),
    CHANGE_UPDATE_ACCESS_MODE: (context, payload) => context.dispatch('CHANGE_ACCESS_MODE', { ruleName: 'w', ...payload }),
    CHANGE_DELETE_ACCESS_MODE: (context, payload) => context.dispatch('CHANGE_ACCESS_MODE', { ruleName: 'd', ...payload }),
    CHANGE_ACCESS_MODE: async (context, { mode, ruleName, item }) => {
      const have = item.access[ruleName];
      let want;
      /*
           has | patch | got
          -----+-------+-----
             - |  w    | w
             w |  w    | -
             - |  ww   | ww
             w |  ww   | ww
            ww |  ww   | w
            ww |  w    | -
       */
      switch (mode.id) {
        case AccessMode.FORBIDDEN:
          want = ruleName;
          break;
        case AccessMode.ALLOW:
          want = have.rule || ruleName;
          break;
        case AccessMode.MANAGE:
          want = `${ruleName}${ruleName}`;
          break;
        default:
          return;
      }
      const changes = {
        grantee: +item.grantee.id,
        grants: want,
      };
      try {
        await context.dispatch('PATCH_ACCESS_MODE', { item, changes });
      } catch (err) {
        throw err;
      } finally {
        context.dispatch('LOAD_DATA_LIST');
      }
    },
    ADD_ROLE_PERMISSIONS: async (context, role) => {
      const changes = {
        grantee: +role.id,
        grants: 'r',
      };
      try {
        await context.dispatch('PATCH_ACCESS_MODE', { changes });
      } catch {
      } finally {
        context.dispatch('LOAD_DATA_LIST');
      }
    },
    RESET_ITEM_STATE: async (context) => {
      context.commit('RESET_ITEM_STATE');
    },
  };

  mutations = {
    SET_PARENT_ITEM_ID: (state, id) => {
      state.parentId = id;
    },
    SET_DATA_LIST: (state, list) => {
      state.dataList = list;
    },
    SET_SIZE: (state, size) => {
      state.size = size;
    },
    SET_SEARCH: (state, search) => {
      state.search = search;
    },
    INCREMENT_PAGE: (state) => {
      state.page++;
    },
    DECREMENT_PAGE: (state) => {
      state.page--;
    },
    SET_IS_NEXT: (state, next) => {
      state.isNextPage = next;
    },
    RESET_ITEM_STATE: (state) => {
      Object.assign(state, this.defaultState());
    },
  };

  constructor() {
    this.state = {
      parentId: 0,
      ...this.defaultState(),
    };
  }

  generateAPIMethods(url) {
    const permissionsAPI = new PermissionsAPI(url);
    this.actions.GET_LIST = (context) => {
      return permissionsAPI.getList(context.state);
    }
    this.actions.PATCH_ACCESS_MODE = (context, { changes }) => {
      return permissionsAPI.patch(context.state.parentId, [changes])
    }
    return this;
  }

  getModule() {
    return {
      state: this.state,
      getters: this.getters,
      actions: this.actions,
      mutations: this.mutations,
      namespaced: true,
    }
  }
}

export default DefaultPermissionsModule;
