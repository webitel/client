import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './app.vue';
import router from './app/router/router';
import store from './app/store/store';
import i18n from './app/locale/i18n';
import './app/plugins/webitel-ui';

// import './assets/lib/bootstrap-grid.min.css';
import './app/css/fonts.scss';

import { getSession } from './app/api/userinfo/userinfo';

Vue.config.productionTip = false;

Vue.use(Vuelidate);

const fetchConfig = async () => {
  const response = await fetch(`${process.env.BASE_URL}config.json`);
  return response.json();
};

const fetchUserinfo = () => getSession();

const createVueInstance = () => {
  new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
  }).$mount('#app');
};

// init IIFE
(async () => {
  const config = await fetchConfig();
  await fetchUserinfo();
  Vue.prototype.$config = config;
  createVueInstance();
})();
