import { describe, expect, it } from 'vitest';

import { AdminNamespace } from '../../../../../../app/namespace';

import { CalendarsNamespace } from '../namespace';

describe('CalendarsNamespace', () => {
	it('prefixes lookups calendars under admin namespace', () => {
		expect(CalendarsNamespace).toBe(`${AdminNamespace}/lookups/calendars`);
	});
});
