import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './app/components/app.vue';
import router from './app/router/router';
import store from './app/store/store';
import i18n from './app/locale/i18n';
import './app/plugins/webitel-ui';

// import './assets/lib/bootstrap-grid.min.css';
import './app/css/1.scss';
// import './app/css/main.scss';
// import './app/css/objects/objects.scss';

import './app/assets/icons/sprite';

Vue.config.productionTip = false;

Vue.use(Vuelidate);

const fetchConfig = async () => {
  const response = await fetch(`${process.env.BASE_URL}config.json`);
  return response.json();
};

const initSession = async () => store.dispatch('userinfo/OPEN_SESSION');

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
  let config = {};
  try {
    config = await fetchConfig();
    await initSession();
  } catch (err) {
  } finally {
    Vue.prototype.$config = config;
    createVueInstance();
  }
})();
