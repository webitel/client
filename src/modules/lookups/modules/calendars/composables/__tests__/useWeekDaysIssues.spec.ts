import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, ref } from 'vue';

import type { CalendarAcceptOfDayUi } from '../../stores';
import { useWeekDaysIssues } from '../useWeekDaysIssues';

const row = (
	day: number,
	start: number,
	end: number,
): CalendarAcceptOfDayUi => ({
	day,
	disabled: false,
	start,
	end,
});

const setup = (rows: CalendarAcceptOfDayUi[]) => {
	const dataList = ref(rows);

	const Comp = defineComponent({
		setup: () => useWeekDaysIssues(dataList),
		template: '<div />',
	});

	return {
		dataList,
		...(mount(Comp).vm as unknown as ReturnType<typeof useWeekDaysIssues>),
	};
};

describe('useWeekDaysIssues', () => {
	it('marks nothing for rows that do not overlap', () => {
		const { issueFor } = setup([
			row(0, 540, 541),
			row(0, 600, 660),
		]);

		expect(issueFor(0, 'start')).toBeUndefined();
		expect(issueFor(1, 'end')).toBeUndefined();
	});

	it('marks both ends of a row that starts after it ends', () => {
		const { issueFor } = setup([
			row(0, 600, 540),
		]);

		expect(issueFor(0, 'start')).toEqual({
			$error: true,
			$errors: [
				'Time From cannot be greater than To',
			],
		});
		expect(issueFor(0, 'end')?.$error).toBe(true);
	});

	it('marks every row of an overlap, and clears once it is resolved', () => {
		const { dataList, issueFor } = setup([
			row(0, 540, 720),
			row(0, 600, 780),
		]);

		expect(issueFor(0, 'start')?.$errors).toEqual([
			'Time intervals on the same day cannot overlap',
		]);
		expect(issueFor(1, 'start')?.$error).toBe(true);

		dataList.value[1].start = 900;
		dataList.value[1].end = 960;

		expect(issueFor(0, 'start')).toBeUndefined();
		expect(issueFor(1, 'start')).toBeUndefined();
	});

	it('marks a time outside the day', () => {
		const { issueFor } = setup([
			row(0, 0, 24 * 60),
		]);

		expect(issueFor(0, 'end')?.$errors).toEqual([
			'Hours must be from 00 to 23',
		]);
	});
});
