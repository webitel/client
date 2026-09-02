import { describe, expect, it } from 'vitest';

import en from '../../../../../../../../../../app/locale/en/en.js';
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

/** walks a dotted i18n path; every key used here holds a plain string */
const localeText = (path: string) =>
	path
		.split('.')
		.reduce<unknown>(
			(node, key) => (node as Record<string, unknown> | undefined)?.[key],
			en,
		);

describe('queue members table headers', () => {
	/** WTEL-10232 fixes both the set and the order, so the whole list is asserted */
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

	/** the column is labelled Communications while the api field stays as it was */
	it('labels the communications column Communications', () => {
		const header = byValue('destination');

		expect(header.locale).toBe('objects.ccenter.members.communications');
		expect(localeText(header.locale as string)).toBe('Communications');
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
