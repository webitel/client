import { createI18n } from 'vue-i18n';

import en from './en/en';
import es from './es/es';
import kz from './kz/kz';
import ro from './ro/ro';
import ru from './ru/ru';
import uk from './uk/uk';
import pl from './pl/pl';
import uz from './uz/uz';
import vi from './vi/vi';

const messages = {
  en,
  es,
  ru,
  ro,
  uk,
  kz,
  pl,
  uz,
  vi,
};

export default new createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  allowComposition: true,
  messages,
});
