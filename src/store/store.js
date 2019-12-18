import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth/auth';
import lookups from "./modules/objects/lookups/lookups";
import permissions from './modules/objects/permissions/permissions';

Vue.use(Vuex);
export default new Vuex.Store({
    strict: true,
    modules: {
        auth,
        lookups,
        permissions
    },
});
