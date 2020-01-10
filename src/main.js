import VueLogger from 'vuejs-logger';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './app.vue';
import router from './router/router';
import store from './store/store';
import i18n from './locale/i18n';

import './assets/lib/normalize.scss';
import './assets/lib/bootstrap-grid.min.css';
import './assets/css/objects/lib-custom-styling/vuetable.scss';
import './assets/css/fonts.scss';
import './assets/css/main.scss';

import tableCheckboxColumn from './components/object-utils/utils/table-checkbox-column';
import errorMixin from './mixins/errorMixin';


Vue.config.productionTip = false;

Vue.component('vuetable-field-table-checkbox', tableCheckboxColumn);
Vue.use(Vuelidate);
Vue.mixin(errorMixin);

Vue.use(VueLogger, {
  isEnabled: true,
  // logLevel: isProduction ? 'error' : 'debug',
  stringifyArguments: false, // If true, all input will go through JSON.stringify().
  // Useful when printing reactive properties.
  showLogLevel: true,
  showMethodName: true, // If true, the method name of
  // the parent function will be shown in the console.
  separator: ' | ',
  showConsoleColors: false, // If true, enables console.warn,
  // console.fatal, console.error for corresponding loglevels.
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
