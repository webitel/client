import Vue from 'vue';
import Vuex from 'vuex';
import userinfo from './modules/userinfo/userinfo';
import auth from './modules/auth/auth';
import directory from "./modules/directory/directory";
import routing from "./modules/routing/routing";
import lookups from "./modules/lookups/lookups";
import ccenter from "./modules/contact-center/ccenter";
import integrations from "./modules/integrations/integrations";
import permissions from './modules/permissions/permissions';

Vue.use(Vuex);
export default new Vuex.Store({
    strict: true,
    modules: {
        userinfo,
        auth,
        directory,
        routing,
        lookups,
        ccenter,
        integrations,
        permissions,
    },
});
