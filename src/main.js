import VueLogger from 'vuejs-logger';
import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './app.vue';
import router from './router/router';
import store from './store/store';
import 'vuetify/dist/vuetify.min.css';
import i18n from './locale/i18n';
import './assets/css/main.css';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VueLogger, {
  isEnabled: true,
  // logLevel: isProduction ? 'error' : 'debug',
  stringifyArguments: false, // If true, all input will go through JSON.stringify(). Useful when printing reactive properties.
  showLogLevel: true,
  showMethodName: true,      // If true, the method name of the parent function will be shown in the console.
  separator: ' | ',
  showConsoleColors: false,   // If true, enables console.warn, console.fatal, console.error for corresponding loglevels.
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
