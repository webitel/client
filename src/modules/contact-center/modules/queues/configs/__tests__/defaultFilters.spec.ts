import { describe, expect, it } from 'vitest';

import { defaultJoinedAtFilter } from '../../modules/logs/configs/filtersOptions';
import { defaultCreatedAtFilter } from '../../modules/members/configs/defaultFilters';

describe('default filters', () => {
	it('opens the log on today, relatively', () => {
		expect(defaultJoinedAtFilter()).toEqual({
			name: 'joinedAt',
			value: 'rdt_today',
		});
	});

	it('opens the members list on the previous month through today', () => {
		const { name, value } = defaultCreatedAtFilter();

		expect(name).toBe('createdAt');

		const from = new Date(value.from);
		const to = new Date(value.to);
		const previousMonth = new Date();
		previousMonth.setMonth(previousMonth.getMonth() - 1);

		expect(from.getDate()).toBe(1);
		expect(from.getMonth()).toBe(previousMonth.getMonth());
		expect(to.toDateString()).toBe(new Date().toDateString());
		expect(value.from).toBeLessThan(value.to);
	});
});
