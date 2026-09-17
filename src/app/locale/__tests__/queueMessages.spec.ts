import { describe, expect, it } from 'vitest';

import en from '../en/en';
import es from '../es/es';
import kz from '../kz/kz';
import pl from '../pl/pl';
import ro from '../ro/ro';
import ru from '../ru/ru';
import uk from '../uk/uk';
import uz from '../uz/uz';
import vi from '../vi/vi';

const locales = {
	en,
	es,
	kz,
	pl,
	ro,
	ru,
	uk,
	uz,
	vi,
};

/**
 * A toast the user only ever sees in one language: a locale missing the key
 * shows the raw path instead, and nothing else in the app would catch it.
 */
describe.each(Object.entries(locales))('%s queue messages', (_name, locale) => {
	it('translates the blocked nested add', () => {
		const message = locale.objects.ccenter.queues.saveBeforeAddingRecords;

		expect(typeof message).toBe('string');
		expect(message).not.toBe('');
	});
});
