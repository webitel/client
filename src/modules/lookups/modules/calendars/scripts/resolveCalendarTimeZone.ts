import { getUserTimeZone } from '@webitel/api-services/utils';

const isValidTimeZone = (timeZone: string): boolean => {
	try {
		new Intl.DateTimeFormat(undefined, {
			timeZone,
		});
		return true;
	} catch {
		return false;
	}
};

/**
 * Time zone a calendar's holiday dates are picked and shown in.
 *
 * A holiday is a calendar day stored as an instant, so the picker and the
 * table must agree on one zone — otherwise the day shifts when the browser
 * zone differs from the profile zone. The calendar's own zone is the one its
 * holiday work hours are already labelled with; without it, fall back to the
 * operator's zone, which is what `formatDate` uses by default.
 */
export const resolveCalendarTimeZone = (timeZone?: string | null): string =>
	timeZone && isValidTimeZone(timeZone) ? timeZone : getUserTimeZone();
