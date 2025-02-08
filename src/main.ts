import { createApp } from 'vue';
// dont know why but when i import dropzone css is css files, it brakes build on firefox (only build!)
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import './app/assets/icons/sprite';
import './app/css/main.scss';
import instance from './app/api/instance';

/*
Don't know why, but without this empty file import styles just breaking :/
I suppose, it's a problem with webpack or sass/sass loader.
I think, this issue should go on migration to Vue 3, so I left it "as is".
 */
import './app/css/do-not-delete-me.scss';
import ActionComponents from './app/components/actions';
import App from './app/components/app.vue';
import AdmItemLink from './app/components/utils/adm-item-link.vue';
import i18n from './app/locale/i18n';
import BreakpointPlugin from './app/plugins/breakpoint';
import './app/plugins/webitel-flow-ui';
import WebitelUi from './app/plugins/webitel-ui';
import router from './app/router/router';
import store, { pinia } from './app/store/store';
import { useUserinfoStore } from './modules/userinfo/userinfoStore';
import { createUserAccessControl } from './app/composables/useUserAccessControl';

const fetchConfig = async () => {
  const response = await fetch(`${import.meta.env.BASE_URL}config.json`);
  return response.json();
};

const setTokenFromUrl = () => {
  try {
    const queryMap = window.location.search
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

const initSession = async () =>
  store.dispatch('userinfo/OPEN_SESSION', { instance });

const createVueInstance = async () => {
  const app = createApp(App)
    .use(store)
    .use(i18n)
    .use(pinia)
    .use(...WebitelUi)
    .use(BreakpointPlugin);

  const { initialize, routeAccessGuard } = useUserinfoStore();
  await initialize();
  createUserAccessControl(useUserinfoStore);
  router.beforeEach(routeAccessGuard);

  app.use(router);

  ActionComponents.forEach((component) => {
    app.component(component.name, component);
  });

  app.component('adm-item-link', AdmItemLink);

  return app;
};

// init IIFE
(async () => {
  let config = {};
  try {
    setTokenFromUrl();

    config = await fetchConfig();
    await initSession();
  } catch (err) {
    console.error('Error initializing app', err);
  } finally {
    const app = await createVueInstance();
    app.provide('$config', config);
    app.mount('#app');
  }
})();
