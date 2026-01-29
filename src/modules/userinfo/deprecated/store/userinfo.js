import { WtApplication } from '@webitel/ui-sdk/enums';
import UserinfoStoreModule from '@webitel/ui-sdk/src/modules/Userinfo/store/UserinfoStoreModule.js';

import NavigationPages from '../../../../app/router/_internals/NavigationPages.lookup.js';
import RouteNames from '../../../../app/router/_internals/RouteNames.enum';
import convertScope from './_internals/scripts/convertScope.js';

const state = {
  thisApp: WtApplication.Admin,
};

const getters = {
  ACCESSIBLE_NAV: (state, getters) =>
    NavigationPages.reduce((accumulator, nav) => {
      const subNav = nav.subNav.filter((subNav) =>
        getters.HAS_READ_ACCESS({
          name: subNav.value,
        }),
      );
      if (subNav.length) {
        const newNav = {
          ...nav,
          subNav,
        };
        return [...accumulator, newNav];
      }
      return accumulator;
    }, []),

  IS_CHANGE_USER_PASSWORD_ALLOW: (state) =>
    !!state.permissions.change_user_password,

  IS_RESET_ACTIVE_ATTEMPTS_ALLOW: (state) =>
    !!state.permissions.reset_active_attempts,

  // FIXME: remove this getter after refactoring of userinfo module in SDK
  HAS_ACCESS_TO_OBJECT: (state, getters) => (objectName) => {
    const objectScope = getters.GET_OBJECT_SCOPE({ name: objectName });
    if (!objectScope) return false;
    // don`t used existing HAS_READ_ACCESS, because it have CHECK_OBJECT_ACCESS inside (UI-access)
    return objectScope.access.includes('r');
  },
};

const actions = {
  CONVERT_USER_SCOPE: (context, scope) => convertScope(scope),
};

const userinfo = new UserinfoStoreModule().getModule({
  state,
  getters,
  actions,
});

/* 𝓦𝓣𝓕?
* need to check for a strict equality for this specific route
* https://webitel.atlassian.net/browse/WTEL-6526
* */

const CHECK_OBJECT_ACCESS_BY_ROUTE = userinfo.getters.CHECK_OBJECT_ACCESS_BY_ROUTE;

userinfo.getters.CHECK_OBJECT_ACCESS_BY_ROUTE = (state, getters) => (route) => {
  if (route.name === RouteNames.STORAGE_POLICIES) {
    const accessKey = Object.keys(state.access[getters.THIS_APP]).find(
      (object) => route.name === object,
    );
    return state.access[getters.THIS_APP][accessKey]?._enabled;
  }
  return CHECK_OBJECT_ACCESS_BY_ROUTE(state, getters)(route);
};


export default userinfo;
