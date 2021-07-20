import UserinfoStoreModule from '@webitel/ui-sdk/src/modules/Userinfo/store/UserinfoStoreModule';

// register api's
import authAPI from '@webitel/ui-sdk/src/modules/Userinfo/api/auth';
import userinfoAPI from '@webitel/ui-sdk/src/modules/Userinfo/api/userinfo';
import instance from '../../../app/api/instance';

import router from '../../../app/router/router';
import Permissions from './_internals/enums/Permissions.enum';
import NavigationPages from '../../../app/router/_internals/NavigationPages.lookup';
import convertScope from './_internals/scripts/convertScope';
import convertPermissions from './_internals/scripts/convertPermissions';

authAPI.setInstance(instance);
userinfoAPI.setInstance(instance);

const getters = {
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
  REDIRECT_TO_AUTH: () => router.replace('/auth'),
  CONVERT_USER_SCOPE: (context, scope) => convertScope(scope),
  CONVERT_USER_PERMISSIONS: (context, permissions) => convertPermissions(permissions),
};

const userinfo = new UserinfoStoreModule().getModule({ getters, actions });

export default userinfo;
