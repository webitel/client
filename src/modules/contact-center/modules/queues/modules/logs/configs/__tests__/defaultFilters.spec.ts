import { normalizeDatetimeRange } from '@webitel/api-services/scripts';
import { RelativeDatetimeValue } from '@webitel/ui-sdk/enums';
import { endOfToday, startOfToday } from 'date-fns';
import { describe, expect, it } from 'vitest';

import { defaultJoinedAtFilter } from '../defaultFilters';

describe('the queue log default date range', () => {
	it('filters on the start date', () => {
		// QueueLogsAPI.getList maps `joinedAt` onto joined_at.from / joined_at.to
		expect(defaultJoinedAtFilter().name).toBe('joinedAt');
	});

	/**
	 * A relative value, so a bookmarked or shared url keeps meaning "today"
	 * instead of freezing on the day it was copied. It also lets the static
	 * panel preselect the Today preset instead of opening on a custom range.
	 */
	it('is relative rather than a frozen range', () => {
		expect(defaultJoinedAtFilter().value).toBe(RelativeDatetimeValue.Today);
	});

	it('still resolves to today when the request is built', () => {
		expect(normalizeDatetimeRange(defaultJoinedAtFilter().value)).toEqual({
			from: startOfToday().getTime(),
			to: endOfToday().getTime(),
		});
	});
});
