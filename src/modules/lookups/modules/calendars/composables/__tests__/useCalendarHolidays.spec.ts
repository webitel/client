import { describe, expect, it } from 'vitest';
import { ref } from 'vue';

import type { CalendarCard, CalendarExceptUi } from '../../stores';
import { useCalendarHolidays } from '../useCalendarHolidays';

const holiday = (name: string): CalendarExceptUi => ({
	name,
	date: 0,
	repeat: false,
	working: false,
	workStart: null,
	workStop: null,
});

const setup = (excepts: CalendarExceptUi[] = []) => {
	const modelValue = ref<CalendarCard>({
		name: '',
		excepts,
	});
	const search = ref('');

	return {
		modelValue,
		search,
		...useCalendarHolidays(modelValue, search),
	};
};

describe('useCalendarHolidays', () => {
	it('filters by name and keeps the position in the card collection', () => {
		const { rows, search } = setup([
			holiday('New year'),
			holiday('Easter'),
			holiday('Christmas'),
		]);

		search.value = 'ster';

		expect(rows.value).toHaveLength(1);
		expect(rows.value[0]).toMatchObject({
			name: 'Easter',
			sourceIndex: 1,
		});
	});

	it('upsert replaces the holiday at a known index', () => {
		const { modelValue, upsert } = setup([
			holiday('New year'),
			holiday('Easter'),
		]);

		upsert('1', holiday('Easter Monday'));

		expect(modelValue.value.excepts?.map(({ name }) => name)).toEqual([
			'New year',
			'Easter Monday',
		]);
	});

	it.each([
		'new',
		'7',
		undefined,
	])('upsert appends when the index is %s', (index) => {
		const { modelValue, upsert } = setup([
			holiday('New year'),
		]);

		upsert(index, holiday('Easter'));

		expect(modelValue.value.excepts?.map(({ name }) => name)).toEqual([
			'New year',
			'Easter',
		]);
	});

	it('remove deletes by source index, not by filtered position', () => {
		const { modelValue, rows, remove, search } = setup([
			holiday('New year'),
			holiday('Easter'),
			holiday('Christmas'),
		]);

		search.value = 'christmas';
		remove(rows.value);

		expect(modelValue.value.excepts?.map(({ name }) => name)).toEqual([
			'New year',
			'Easter',
		]);
	});

	it('setRepeat updates only the addressed holiday', () => {
		const { modelValue, rows, setRepeat } = setup([
			holiday('New year'),
			holiday('Easter'),
		]);

		setRepeat(rows.value[1], true);

		expect(modelValue.value.excepts?.map(({ repeat }) => repeat)).toEqual([
			false,
			true,
		]);
	});
});
