// dont know why but when i import dropzone css is css files, it brakes build on firefox (only build!)
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import './app/assets/icons/sprite/_index';
/*
Don't know why, but without this empty file import styles just breaking :/
I suppose, it's a problem with webpack or sass/sass loader.
I think, this issue should go on migration to Vue 3, so I left it "as is".
 */
import './app/css/do-not-delete-me.scss';
import './app/plugins/webitel-flow-ui';

import { createApp } from 'vue';

import ActionComponents from './app/components/actions';
import AdmItemLink from './app/components/utils/adm-item-link.vue';
import { createUserAccessControl } from './app/composables/useUserAccessControl';
import i18n from './app/locale/i18n';
import BreakpointPlugin from './app/plugins/breakpoint';
import {
	plugin as WebitelUi,
	options as WebitelUiOptions,
} from './app/plugins/webitel/ui-sdk';
import { initRouter } from './app/router/router';
import store, { pinia } from './app/store/store';
import { useUserinfoStore } from './modules/userinfo/stores/userinfoStore';
import App from './the-app.vue';

import './app/css/main.scss';

const fetchConfig = async () => {
	const response = await fetch(`${import.meta.env.BASE_URL}config.json`);
	return response.json();
};

const setTokenFromUrl = () => {
	try {
		const queryMap: {
			accessToken?: string;
		} = window.location.search
			.slice(1)
			.split('&')
			.reduce((obj, query) => {
				const [key, value] = query.split('=');
				obj[key] = value;
				return obj;
			}, {});

		if (queryMap.accessToken) {
			localStorage.setItem('access-token', queryMap.accessToken);
		}
	} catch (err) {
		console.error('Error restoring token from url', err);
	}
};

const createVueInstance = async () => {
	const app = createApp(App)
		.use(store)
		.use(i18n)
		.use(pinia)
		.use(BreakpointPlugin);

	const { initialize, routeAccessGuard } = useUserinfoStore();

	const router = await initRouter({
		beforeEach: [
			routeAccessGuard,
		],
	});

	try {
		await initialize();
		createUserAccessControl(useUserinfoStore);
	} catch (err) {
		console.error('Error initializing app', err);
	}

	app.use(router);
	app.use(WebitelUi, {
		...WebitelUiOptions,
		router,
	}); // setup webitel ui after router init

	ActionComponents.forEach((component) => {
		app.component(component.name, component);
	});

	app.component('AdmItemLink', AdmItemLink);

	return app;
};

// init IIFE
(async () => {
	let config = {};
	try {
		setTokenFromUrl();

		config = await fetchConfig();
	} catch (err) {
		console.error('Error initializing app', err);
	} finally {
		const app = await createVueInstance();
		app.provide('$config', config);
		app.mount('#app');
	}
})();
