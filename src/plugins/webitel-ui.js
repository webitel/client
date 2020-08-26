// import main file
import WebitelUI from '@webitel/ui-sdk/dist/ui-sdk.common';

// import locale
import WebitelUIEn from '@webitel/ui-sdk/src/locale/en/en';
import WebitelUIRu from '@webitel/ui-sdk/src/locale/ru/ru';
import i18n from '../locale/i18n';
import eventBus from '../scripts/eventBus';

// import styles
import '@webitel/ui-sdk/dist/ui-sdk.css';
// import scss variables and other reusables
import '@webitel/ui-sdk/src/css/main.scss';

// init plugin
Vue.use(WebitelUI, { eventBus });
// add plugin locales to main i18n
i18n.mergeLocaleMessage('en', WebitelUIEn);
i18n.mergeLocaleMessage('ru', WebitelUIRu);