import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, ref } from 'vue';

import type { CalendarCard } from '../../stores';
import { useWeekDaysData } from '../useWeekDaysData';

describe('useWeekDaysData', () => {
	const mountWeekDays = (
		initial: Partial<CalendarCard> = {},
		field: 'accepts' | 'specials' = 'accepts',
	) => {
		const modelValue = ref<CalendarCard>({
			name: '',
			accepts: [],
			...initial,
		});

		const Comp = defineComponent({
			setup() {
				const api = useWeekDaysData(modelValue, field);
				return {
					modelValue,
					api,
				};
			},
			template: '<div />',
		});

		const wrapper = mount(Comp);
		return {
			modelValue,
			...wrapper.vm.api,
		};
	};

	it('addRange inserts before the first later day and appends when none follow', () => {
		const { modelValue, addRange } = mountWeekDays({
			accepts: [
				{
					day: 0,
					disabled: false,
					start: 540,
					end: 1200,
				},
				{
					day: 0,
					disabled: false,
					start: 600,
					end: 1300,
				},
				{
					day: 2,
					disabled: false,
					start: 540,
					end: 1200,
				},
			],
		});

		addRange(1);

		expect(modelValue.value.accepts?.map(({ day }) => day)).toEqual([
			0,
			0,
			1,
			2,
		]);
		expect(modelValue.value.accepts?.[2]).toMatchObject({
			day: 1,
			disabled: false,
			start: 9 * 60,
			end: 20 * 60,
		});

		addRange(5);
		expect(modelValue.value.accepts?.at(-1)?.day).toBe(5);
	});

	it('setItemProp mutates a slot on the draft card', () => {
		const { modelValue, setItemProp } = mountWeekDays({
			accepts: [
				{
					day: 1,
					disabled: false,
					start: 540,
					end: 1200,
				},
			],
		});

		setItemProp({
			prop: 'start',
			index: 0,
			value: 480,
		});

		expect(modelValue.value.accepts?.[0].start).toBe(480);
	});

	it('removeRange drops a slot by index', () => {
		const { modelValue, removeRange } = mountWeekDays({
			accepts: [
				{
					day: 0,
					disabled: false,
					start: 540,
					end: 1200,
				},
				{
					day: 1,
					disabled: false,
					start: 540,
					end: 1200,
				},
			],
		});

		removeRange(0);

		expect(modelValue.value.accepts).toHaveLength(1);
		expect(modelValue.value.accepts?.[0].day).toBe(1);
	});

	it('isDayStart marks only the first row of each weekday group', () => {
		const { isDayStart } = mountWeekDays({
			accepts: [
				{
					day: 0,
					disabled: false,
					start: 540,
					end: 1200,
				},
				{
					day: 0,
					disabled: false,
					start: 600,
					end: 1300,
				},
				{
					day: 2,
					disabled: false,
					start: 540,
					end: 1200,
				},
			],
		});

		expect(isDayStart(0)).toBe(true);
		expect(isDayStart(1)).toBe(false);
		expect(isDayStart(2)).toBe(true);
	});

	it('converts minutes and seconds for timepicker bindings', () => {
		const { minToSec, secToMin } = mountWeekDays();

		expect(minToSec(90)).toBe(5400);
		expect(secToMin(5400)).toBe(90);
	});
});
