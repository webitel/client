import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState.js';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

export function useWeekDaysData(namespace, dataName) {
	const { t } = useI18n();
	const store = useStore();

	const dataList = computed(
		() => getNamespacedState(store.state, namespace).itemInstance[dataName],
	);

	const headers = computed(() => {
		return [
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
		];
	});

	const weekDaysList = computed(() => {
		return [
			t('objects.lookups.calendars.mon'),
			t('objects.lookups.calendars.tue'),
			t('objects.lookups.calendars.wed'),
			t('objects.lookups.calendars.thu'),
			t('objects.lookups.calendars.fri'),
			t('objects.lookups.calendars.sat'),
			t('objects.lookups.calendars.sun'),
		];
	});

	function setItemProp(payload) {
		return store.dispatch(`${namespace}/SET_CALENDAR_ITEM_PROPERTY`, {
			name: dataName,
			...payload,
		});
	}

	function addRange(day) {
		return store.dispatch(`${namespace}/ADD_RANGE`, {
			day,
			name: dataName,
		});
	}

	function removeRange(index) {
		return store.dispatch(`${namespace}/REMOVE_RANGE`, {
			index,
			name: dataName,
		});
	}

	function isDayStart(index) {
		if (index === 0) return true;
		return (
			dataList.value[index].day !== // this day index is not equal to
			dataList.value[index - 1].day
		); // prev day index
	}

	function minToSec(min) {
		return min * 60;
	}

	function secToMin(sec) {
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
