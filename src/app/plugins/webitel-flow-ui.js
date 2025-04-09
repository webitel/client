// import locale
import WebitelUIEn from '@webitel/flow-ui-sdk/src/locale/en/en';
import WebitelUIRu from '@webitel/flow-ui-sdk/src/locale/ru/ru';
import WebitelUIUa from '@webitel/flow-ui-sdk/src/locale/ua/ua';

import i18n from '../locale/i18n';

// add plugin locales to main i18n
i18n.global.mergeLocaleMessage('en', WebitelUIEn);
i18n.global.mergeLocaleMessage('ru', WebitelUIRu);
i18n.global.mergeLocaleMessage('ua', WebitelUIUa);
