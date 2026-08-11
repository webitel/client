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

	function ensureList(): CalendarAcceptOfDayUi[] {
		if (!modelValue.value[field]) {
			modelValue.value[field] = [];
		}
		return modelValue.value[field] as CalendarAcceptOfDayUi[];
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
		const list = ensureList();
		if (!list[index]) return;
		list[index] = {
			...list[index],
			[prop]: value,
		};
	}

	function addRange(day: number) {
		const list = ensureList();
		const dayIndex = list.findIndex((workday) => workday.day > day);
		const dayItem: CalendarAcceptOfDayUi = {
			day,
			disabled: false,
			start: 9 * 60,
			end: 20 * 60,
		};
		if (dayIndex === -1) {
			list.push(dayItem);
		} else {
			list.splice(dayIndex, 0, dayItem);
		}
	}

	function removeRange(index: number) {
		ensureList().splice(index, 1);
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

export function defaultSpecials(): CalendarAcceptOfDayUi[] {
	return Array.from(
		{
			length: 7,
		},
		(_, day) => ({
			day,
			disabled: true,
			start: 9 * 60,
			end: 20 * 60,
		}),
	);
}
