import { computed, type Ref } from 'vue';

import type { CalendarCard, CalendarExceptUi } from '../stores';

/** a holiday plus its position in the card's `excepts`, kept through filtering */
export type CalendarHolidayRow = CalendarExceptUi & {
	sourceIndex: number;
};

export function useCalendarHolidays(
	modelValue: Ref<CalendarCard>,
	search: Ref<string>,
) {
	const holidays = computed(() => modelValue.value.excepts ?? []);

	const rows = computed<CalendarHolidayRow[]>(() => {
		const q = search.value.toLowerCase();

		return holidays.value
			.map((holiday, sourceIndex) => ({
				...holiday,
				sourceIndex,
			}))
			.filter((holiday) => (holiday.name ?? '').toLowerCase().includes(q));
	});

	function write(excepts: CalendarExceptUi[]) {
		modelValue.value.excepts = excepts;
	}

	/** `index` comes from the route param, so `'new'` and garbage both mean "add" */
	function upsert(index: string | undefined, item: CalendarExceptUi) {
		const excepts = [
			...holidays.value,
		];
		const position = Number(index);
		const isKnownPosition =
			Number.isInteger(position) && position >= 0 && position < excepts.length;

		if (isKnownPosition) {
			excepts.splice(position, 1, {
				...item,
			});
		} else {
			excepts.push({
				...item,
			});
		}

		write(excepts);
	}

	function remove(deleted: CalendarHolidayRow[]) {
		const indexes = new Set(deleted.map(({ sourceIndex }) => sourceIndex));

		write(holidays.value.filter((_, index) => !indexes.has(index)));
	}

	function setRepeat(row: CalendarHolidayRow, repeat: boolean) {
		write(
			holidays.value.map((holiday, index) =>
				index === row.sourceIndex
					? {
							...holiday,
							repeat,
						}
					: holiday,
			),
		);
	}

	return {
		rows,
		upsert,
		remove,
		setRepeat,
	};
}
