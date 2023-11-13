import { createI18n } from 'vue-i18n';
import en from './en/en';
import ru from './ru/ru';
import ua from './ua/ua';
import kz from './kz/kz';

const messages = {
  en,
  ru,
  ua,
  kz,
};

export default new createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  allowComposition: true,
  messages,
});
