import { createI18n } from 'vue-i18n';
import en from './en/en.js';
import kz from './kz/kz.js';
import ru from './ru/ru.js';
import ua from './ua/ua.js';

const messages = {
  en,
  ru,
  ua,
  kz,
};

export default new createI18n({
  // legacy: false,
  locale: localStorage.getItem('lang'),
  fallbackLocale: 'en',
  allowComposition: true,
  messages,
});
