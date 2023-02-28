import { createApp } from 'vue';
import App from './app/components/app.vue';
import router from './app/router/router';
import store from './app/store/store';
import i18n from './app/locale/i18n';
import WebitelUi from './app/plugins/webitel-ui';
import './app/plugins/webitel-flow-ui';
import BreakpointPlugin from './app/plugins/breakpoint';
import ActionComponents from './app/components/actions';

import './app/assets/icons/sprite';

/*
Don't know why, but without this empty file import styles just breaking :/
I suppose, it's a problem with webpack or sass/sass loader.
I think, this issue should go on migration to Vue 3, so I left it "as is".
 */
import './app/css/do-not-delete-me.scss';

const fetchConfig = async () => {
  const response = await fetch(`${process.env.BASE_URL}config.json`);
  return response.json();
};

const initSession = async () => store.dispatch('userinfo/OPEN_SESSION');

const createVueInstance = () => {
  const app = createApp(App)
  .use(router)
  .use(store)
  .use(i18n)
  .use(...WebitelUi)
  .use(BreakpointPlugin);

  ActionComponents.forEach((component) => {
    app.component(component.name, component);
  });

  return app;
};

// init IIFE
(async () => {
  let config = {};
  try {
    config = await fetchConfig();
    await initSession();
  } catch (err) {
  } finally {
    const app = createVueInstance();
    app.provide('$config', config);
    app.mount('#app');
  }
})();
