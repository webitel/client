// dont know why but when i import dropzone css is css files, it brakes build on firefox (only build!)
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import './app/assets/icons/sprite/_index';
import { setConfig as setApiServicesConfig } from '@webitel/api-services';
import { setDefaultAxiosInstance } from '@webitel/api-services/api/axios';
import { eventBus, reloadOnStaleChunk } from '@webitel/ui-sdk/scripts';
import { createApp } from 'vue';
import instance from './app/api/instance';
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
import { configureZod } from '@webitel/ui-sdk/validations';
import { setTokenFromUrl } from './app/scripts/setTokenFromUrl';

const fetchConfig = async () => {
	const response = await fetch(`${import.meta.env.BASE_URL}config.json`);
	return response.json();
};

reloadOnStaleChunk();

configureZod({
	t: i18n.global.t,
});

setApiServicesConfig({
	eventBus,
	i18n,
});

// generated api-services clients call through this app's instance
setDefaultAxiosInstance(instance);

const createVueInstance = async () => {
	const app = createApp(App)
		.use(store)
		.use(i18n)
		.use(pinia)
		.use(BreakpointPlugin);

	const { initialize, routeAccessGuard, clearStorageNotifications } =
		useUserinfoStore();

	try {
		await initialize();
		createUserAccessControl(useUserinfoStore);
	} catch (err) {
		// [Claude] without userinfo the access store is empty, so the router would
		// send the user to /access-denied (and on 401 we're already leaving for auth):
		// don't build the app at all, same as the other apps.
		// authGuard won't run then, so do its unauthorized cleanup here
		console.error('Error initializing app', err);
		if (!localStorage.getItem('access-token')) clearStorageNotifications();
		return null;
	}

	const router = await initRouter({
		beforeEach: [
			routeAccessGuard,
		],
		onUnauthorized: clearStorageNotifications,
	});

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
		if (app) {
			app.provide('$config', config);
			app.mount('#app');
		}
	}
})();
