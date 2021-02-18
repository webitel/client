import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './app.vue';
import router from './router/router';
import store from './store/store';
import i18n from './locale/i18n';
import Icon from './components/utils/icon-wrap.vue';
import './plugins/webitel-ui';

import './assets/lib/normalize.scss';
// import './assets/lib/bootstrap-grid.min.css';
import './assets/css/objects/lib-custom-styling/vuetable.scss';
import './assets/css/fonts.scss';

import { getSession } from './api/userinfo/userinfo';
import tableCheckboxColumn from './components/object-utils/utils/table-checkbox-column.vue';

Vue.config.productionTip = false;

Vue.component('icon', Icon);
Vue.component('vuetable-field-table-checkbox', tableCheckboxColumn);
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
