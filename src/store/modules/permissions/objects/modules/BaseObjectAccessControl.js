import AccessMode from '../_internals/enums/AccessMode.enum';

const getters = {
  OBJECT_ID: (state, getters, rootState) => rootState.permissions.objects.itemId,
};

const actions = {
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
};

const mutations = {};

export default {
  getters,
  actions,
  mutations,
};
