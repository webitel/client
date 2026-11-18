import { createI18n, type I18nOptions } from 'vue-i18n';

import en from './en/en';
import es from './es/es';
import kz from './kz/kz';
import pl from './pl/pl';
import ro from './ro/ro';
import ru from './ru/ru';
import uk from './uk/uk';
import uz from './uz/uz';
import vi from './vi/vi';

// [Claude] typed loosely so `i18n.global.t` keeps vue-i18n's default signature,
// which shared ui-sdk helpers (e.g. `configureZod`) expect
const messages: I18nOptions['messages'] = {
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

export default createI18n({
	legacy: false,
	locale: 'en',
	fallbackLocale: 'en',
	allowComposition: true,
	messages,
});
