import UserinfoStoreModule from '@webitel/ui-sdk/src/modules/Userinfo/store/UserinfoStoreModule';
import WebitelApplications from '@webitel/ui-sdk/src/enums/WebitelApplications/WebitelApplications.enum';

// register api's
import authAPI from '@webitel/ui-sdk/src/modules/Userinfo/api/auth';
import userinfoAPI from '@webitel/ui-sdk/src/modules/Userinfo/api/userinfo';
import instance from '../../../app/api/instance';

import NavigationPages from '../../../app/router/_internals/NavigationPages.lookup';
import convertScope from './_internals/scripts/convertScope';

authAPI.setInstance(instance);
userinfoAPI.setInstance(instance);

const state = {
  thisApp: WebitelApplications.ADMIN,
};

const getters = {
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
  CONVERT_USER_SCOPE: (context, scope) => convertScope(scope),
};

const userinfo = new UserinfoStoreModule().getModule({ state, getters, actions });

export default userinfo;
