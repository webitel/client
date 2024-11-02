// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';
import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router';
import i18n from '../../../src/app/locale/i18n';
// import WebitelUI from '../../../src/app/plugins/webitel-ui.js';
// import sharedComponents from '../../shared';
// import '../../../src/assets//icons/sprite';
import 'prismjs/themes/prism.min.css';
import Layout from './Layout.vue';
import './main.scss';

const router = createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes: [],
});

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.use(i18n);
    app.use(router); // for wt-navigation-bar docs
    // WebitelUI.install(app, {});
    // Object.keys(sharedComponents).forEach((name) => {
    //   app.component(name, sharedComponents[name]);
    // });
    return app;
  },
};
