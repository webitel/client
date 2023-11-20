import { createStore } from 'vuex';
import ccenter from '../../modules/contact-center/store/ccenter';
import directory from '../../modules/directory/store/directory';
import integrations from '../../modules/integrations/store/integrations';
import lookups from '../../modules/lookups/store/lookups';
import permissions from '../../modules/permissions/store/permissions';
import routing from '../../modules/routing/store/routing';
import system from '../../modules/system/store/system';
import userinfo from '../../modules/userinfo/store/userinfo';

export default createStore({
  strict: false,
  modules: {
    userinfo,
    directory,
    routing,
    lookups,
    ccenter,
    integrations,
    permissions,
    system,
  },
});
