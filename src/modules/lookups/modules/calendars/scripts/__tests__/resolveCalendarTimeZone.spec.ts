import { formatDate } from '@webitel/api-services/utils';
import { FormatDateMode } from '@webitel/ui-sdk/enums';
import { fromZonedTime } from 'date-fns-tz';
import { afterEach, describe, expect, it } from 'vitest';

import { resolveCalendarTimeZone } from '../resolveCalendarTimeZone';

const TIMEZONE_STORAGE_KEY = 'user-timezone-setting';

describe('resolveCalendarTimeZone', () => {
	afterEach(() => {
		localStorage.removeItem(TIMEZONE_STORAGE_KEY);
	});

	it('uses the calendar time zone when it is a valid IANA name', () => {
		localStorage.setItem(TIMEZONE_STORAGE_KEY, 'Asia/Tokyo');

		expect(resolveCalendarTimeZone('Europe/Kyiv')).toBe('Europe/Kyiv');
	});

	// the backend names the zone with its offset appended, e.g. "Europe/Kyiv 03:00"
	it('strips the UTC offset the backend appends to the zone name', () => {
		localStorage.setItem(TIMEZONE_STORAGE_KEY, 'Asia/Tokyo');

		expect(resolveCalendarTimeZone('Europe/Kyiv 03:00')).toBe('Europe/Kyiv');
		expect(resolveCalendarTimeZone('America/New_York -05:00')).toBe(
			'America/New_York',
		);
	});

	it('falls back to the profile time zone when the calendar has none', () => {
		localStorage.setItem(TIMEZONE_STORAGE_KEY, 'Europe/Kyiv');

		expect(resolveCalendarTimeZone(undefined)).toBe('Europe/Kyiv');
		expect(resolveCalendarTimeZone('')).toBe('Europe/Kyiv');
	});

	it('falls back to the profile time zone for an unknown name', () => {
		localStorage.setItem(TIMEZONE_STORAGE_KEY, 'Europe/Kyiv');

		expect(resolveCalendarTimeZone('Not/AZone')).toBe('Europe/Kyiv');
	});

	// WTEL-11018: browser in Tokyo, profile in Kyiv — 17.11 showed as 16.11
	it('a day picked in the resolved zone is displayed as the same day', () => {
		localStorage.setItem(TIMEZONE_STORAGE_KEY, 'Europe/Kyiv');
		const timeZone = resolveCalendarTimeZone('Europe/Kyiv');

		// what wt-datepicker emits for 17.11.2026 with `timezone` set
		const picked = fromZonedTime(new Date(2026, 10, 17), timeZone).getTime();

		expect(
			formatDate(picked, FormatDateMode.DATE, {
				timezone: timeZone,
			}),
		).toBe('17.11.2026');
	});
});
