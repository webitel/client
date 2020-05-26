import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './app.vue';
import router from './router/router';
import store from './store/store';
import i18n from './locale/i18n';
import Icon from './components/utils/icon-wrap.vue';

import './assets/lib/normalize.scss';
import './assets/lib/bootstrap-grid.min.css';
import './assets/css/objects/lib-custom-styling/vuetable.scss';
import './assets/css/fonts.scss';
import './assets/css/main.scss';

import tableCheckboxColumn from './components/object-utils/utils/table-checkbox-column';
import errorMixin from './mixins/errorMixin';


Vue.config.productionTip = false;

Vue.component('icon', Icon);
Vue.component('vuetable-field-table-checkbox', tableCheckboxColumn);
Vue.use(Vuelidate);
Vue.mixin(errorMixin);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
