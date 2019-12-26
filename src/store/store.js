import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth/auth';
import directory from "./modules/objects/directory/directory";
import routing from "./modules/objects/routing/routing";
import lookups from "./modules/objects/lookups/lookups";
import permissions from './modules/objects/permissions/permissions';

Vue.use(Vuex);
export default new Vuex.Store({
    strict: true,
    modules: {
        auth,
        directory,
        routing,
        lookups,
        permissions
    },
});
