import { computed, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { CalendarAcceptOfDayUi, CalendarCard } from '../stores';

type WeekDaysField = 'accepts' | 'specials';

export function useWeekDaysData(
	modelValue: Ref<CalendarCard>,
	field: WeekDaysField,
) {
	const { t } = useI18n();

	const dataList = computed(() => modelValue.value[field] ?? []);

	const headers = computed(() => [
		{
			value: 'name',
			text: t('objects.name'),
		},
		{
			value: 'start',
			text: t('objects.lookups.calendars.start'),
		},
		{
			value: 'end',
			text: t('objects.lookups.calendars.end'),
		},
		{
			value: 'state',
			text: t('reusable.state'),
		},
	]);

	const weekDaysList = computed(() => [
		t('objects.lookups.calendars.mon'),
		t('objects.lookups.calendars.tue'),
		t('objects.lookups.calendars.wed'),
		t('objects.lookups.calendars.thu'),
		t('objects.lookups.calendars.fri'),
		t('objects.lookups.calendars.sat'),
		t('objects.lookups.calendars.sun'),
	]);

	/** both collections come defaulted from the zod schema; guard anyway */
	function list(): CalendarAcceptOfDayUi[] {
		if (!modelValue.value[field]) modelValue.value[field] = [];

		return modelValue.value[field];
	}

	function setItemProp({
		prop,
		index,
		value,
	}: {
		prop: keyof CalendarAcceptOfDayUi;
		index: number;
		value: CalendarAcceptOfDayUi[keyof CalendarAcceptOfDayUi];
	}) {
		const items = list();
		if (!items[index]) return;
		items[index] = {
			...items[index],
			[prop]: value,
		};
	}

	function addRange(day: number) {
		const items = list();
		const dayIndex = items.findIndex((workday) => workday.day > day);
		const dayItem: CalendarAcceptOfDayUi = {
			day,
			disabled: false,
			start: 9 * 60,
			end: 20 * 60,
		};
		if (dayIndex === -1) {
			items.push(dayItem);
		} else {
			items.splice(dayIndex, 0, dayItem);
		}
	}

	function removeRange(index: number) {
		list().splice(index, 1);
	}

	function isDayStart(index: number) {
		if (index === 0) return true;
		return dataList.value[index].day !== dataList.value[index - 1].day;
	}

	function minToSec(min: number) {
		return min * 60;
	}

	function secToMin(sec: number) {
		return sec / 60;
	}

	return {
		dataList,
		headers,
		weekDaysList,
		setItemProp,
		addRange,
		removeRange,
		isDayStart,
		minToSec,
		secToMin,
	};
}
