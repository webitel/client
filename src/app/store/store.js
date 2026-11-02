import { createPinia } from 'pinia';
import { createStore } from 'vuex';

import appearance from '../../modules/appearance/store/appearance';
import permissions from '../../modules/permissions/store/permissions';
import system from '../../modules/system/store/system';

const store = createStore({
	strict: false,
	state: {
		router: null,
	},
	mutations: {
		SET_ROUTER: (state, router) => {
			state.router = router;
		},
	},
	modules: {
		permissions,
		system,
		appearance,
	},
});

const pinia = createPinia();

window.store = store;
window.pinia = pinia;

export { pinia };

export default store;
