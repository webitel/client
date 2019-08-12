import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth/auth';
import permissions from './modules/objects/permissions/permissions';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: [
        auth,
        permissions
    ],
});
