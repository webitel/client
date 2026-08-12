import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';
import { describe, expect, it } from 'vitest';

import { headers } from '../headers';

describe('calendars datalist headers', () => {
	it('exposes name and description as visible sortable columns', () => {
		expect(headers.map(({ field }) => field)).toEqual([
			'name',
			'description',
		]);
	});

	it('keeps legacy locale keys for migrated table labels', () => {
		expect(headers.map(({ locale }) => locale)).toEqual([
			'objects.name',
			'objects.description',
		]);
	});

	it('marks both columns shown with neutral sort state', () => {
		for (const header of headers) {
			expect(header.show).toBe(true);
			expect(header.sort).toBe(SortSymbols.NONE);
		}
	});
});
