import { describe, expect, it } from 'vitest';

import { headers } from '../headers';

const byValue = (value: string) => {
	const header = headers.find((h) => h.value === value);
	if (!header) throw new Error(`no header ${value}`);
	return header;
};

/** engine has no column to order these two by; see headers.ts */
const notSortable = [
	'bucket',
	'timezone',
];

const shownValues = () =>
	headers.filter((h) => h.show).map((h) => h.value as string);

describe('queue members table headers', () => {
	/** both the set and the order matter, so the whole list is asserted */
	it('shows exactly the nine default columns, in order', () => {
		expect(shownValues()).toEqual([
			'name',
			'createdAt',
			'offeringAt',
			'destination',
			'priority',
			'endCause',
			'attempts',
			'bucket',
			'agent',
		]);
	});

	it('offers all eleven columns to the column select', () => {
		expect(headers.map((h) => h.value)).toEqual([
			'name',
			'createdAt',
			'offeringAt',
			'destination',
			'priority',
			'endCause',
			'attempts',
			'bucket',
			'agent',
			'expireAt',
			'timezone',
		]);
	});

	it('asks the api for the fields the new columns render from', () => {
		expect(byValue('destination').field).toBe('communications');
		expect(byValue('bucket').field).toBe('bucket');
		expect(byValue('expireAt').field).toBe('expire_at');
		expect(byValue('timezone').field).toBe('timezone');
	});

	/** only an absent `sort` blocks the click; `SortSymbols.NONE` is still clickable */
	it('offers no sorting by bucket or timezone', () => {
		for (const value of notSortable) {
			expect(byValue(value).sort, `${value} is sortable`).toBeUndefined();
		}
	});
});
