import Vue from 'vue';
import App from './app.vue';
import router from './router/router';
import store from './store/store';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import i18n from './locale/i18n';
import './assets/css/main.css';

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
