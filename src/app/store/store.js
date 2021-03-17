import Vue from 'vue';
import Vuex from 'vuex';
import userinfo from '../../modules/userinfo/store/userinfo';
import directory from "../../modules/directory/store/directory";
import routing from "../../modules/routing/store/routing";
import lookups from "../../modules/lookups/store/lookups";
import ccenter from "../../modules/contact-center/store/ccenter";
import integrations from "../../modules/integrations/store/integrations";
import permissions from '../../modules/permissions/store/permissions';

Vue.use(Vuex);
export default new Vuex.Store({
  strict: false,
  modules: {
    userinfo,
    directory,
    routing,
    lookups,
    ccenter,
    integrations,
    permissions,
  },
});
