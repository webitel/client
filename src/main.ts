import './app/css/main.css';
import './app/assets/icons/sprite/_index';
import { setConfig as setApiServicesConfig } from '@webitel/api-services';
import { eventBus, reloadOnStaleChunk } from '@webitel/ui-sdk/scripts';
import * as BreakpointPlugin from '@webitel/ui-sdk/src/plugins/breakpoint/breakpoint.plugin';
import { configureZod } from '@webitel/ui-sdk/validations';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createUserAccessControl } from './app/composables/useUserAccessControl';
import i18n from './app/locale/i18n';
import {
	plugin as WebitelUi,
	options as WebitelUiOptions,
} from './app/plugins/webitel/ui-sdk';
import { initRouter } from './app/router/router';
import { setTokenFromUrl } from './app/scripts/setTokenFromUrl';
import { useUserinfoStore } from './modules/userinfo/stores/userinfoStore';
import App from './the-app.vue';

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

const pinia = createPinia();

const createVueInstance = async () => {
	const app = createApp(App).use(i18n).use(pinia).use(BreakpointPlugin);

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
