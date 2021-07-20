import Vue from 'vue';
// import main file
import WebitelUI from '@webitel/ui-sdk/dist/ui-sdk.common';

// import locale
import WebitelUIEn from '@webitel/ui-sdk/src/locale/en/en';
import WebitelUIRu from '@webitel/ui-sdk/src/locale/ru/ru';
import WebitelUIUa from '@webitel/ui-sdk/src/locale/ua/ua';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import i18n from '../locale/i18n';

// import styles
import '@webitel/ui-sdk/dist/ui-sdk.css';
// import scss variables and other reusables
// import '@webitel/ui-sdk/src/css/main.scss';
import '@webitel/ui-sdk/dist/img/svg-sprites/wt-icon.svg';

const globals = {
  $baseURL: process.env.BASE_URL,
};
// init plugin
Vue.use(WebitelUI, { eventBus, globals });
// add plugin locales to main i18n
i18n.mergeLocaleMessage('en', WebitelUIEn);
i18n.mergeLocaleMessage('ru', WebitelUIRu);
i18n.mergeLocaleMessage('ua', WebitelUIUa);
