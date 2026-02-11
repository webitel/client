import { createPinia } from 'pinia';
import { createStore } from 'vuex';

import appearance from '../../modules/appearance/store/appearance';
import ccenter from '../../modules/contact-center/store/ccenter';
import directory from '../../modules/directory/store/directory';
import integrations from '../../modules/integrations/store/integrations';
import lookups from '../../modules/lookups/store/lookups';
import permissions from '../../modules/permissions/store/permissions';
import routing from '../../modules/routing/store/routing';
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
		directory,
		routing,
		lookups,
		ccenter,
		integrations,
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
