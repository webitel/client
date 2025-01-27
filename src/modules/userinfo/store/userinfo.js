import WebitelApplications from '@webitel/ui-sdk/src/enums/WebitelApplications/WebitelApplications.enum';
import UserinfoStoreModule from '@webitel/ui-sdk/src/modules/Userinfo/store/UserinfoStoreModule';
import NavigationPages from '../../../app/router/_internals/NavigationPages.lookup';
import convertScope from './_internals/scripts/convertScope';

const state = {
  thisApp: WebitelApplications.ADMIN,
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

  IS_CHANGE_USER_PASSWORD_ALLOW: (state) => !!state.permissions.change_user_password,

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

export default userinfo;
