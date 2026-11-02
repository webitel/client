import { createPinia } from 'pinia';
import { createStore } from 'vuex';

import appearance from '../../modules/appearance/store/appearance';

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
		appearance,
	},
});

const pinia = createPinia();

window.store = store;
window.pinia = pinia;

export { pinia };

export default store;
