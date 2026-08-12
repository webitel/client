import type { SuperCompatibleRegleFieldStatus } from '@regle/core';
import { computed, type Ref } from 'vue';

import type { CalendarAcceptOfDayUi } from '../stores';

type WeekDaysHourRangeField = 'start' | 'end';

type VuelidateLikeFieldValidation = {
	$invalid: boolean;
	$error: boolean;
	hourRange: {
		$invalid: boolean;
	};
	timerangeStartLessThanEnd: {
		$invalid: boolean;
	};
	timerangeNotIntersect: {
		$invalid: boolean;
	};
};

type AcceptsValidationFields = {
	$each?: Array<
		Record<WeekDaysHourRangeField, SuperCompatibleRegleFieldStatus | undefined>
	>;
};

const DAY_MINUTE_MAX = 24 * 60 - 1;

const getIntersectingIndices = (items: CalendarAcceptOfDayUi[]) => {
	const indices = new Set<number>();
	const indicesByDay = new Map<number, number[]>();

	items.forEach((item, index) => {
		const dayIndices = indicesByDay.get(item.day) ?? [];
		dayIndices.push(index);
		indicesByDay.set(item.day, dayIndices);
	});

	indicesByDay.forEach((dayIndices) => {
		const ranges: Array<{
			start: number;
			end: number;
			index: number;
		}> = [];

		dayIndices.forEach((index) => {
			const current = items[index];

			ranges.forEach((range) => {
				if (
					(current.start >= range.start && current.end <= range.end) ||
					(current.start <= range.start && current.end >= range.start) ||
					(current.start <= range.end && current.end >= range.end)
				) {
					indices.add(index);
					indices.add(range.index);
				}
			});

			ranges.push({
				start: current.start,
				end: current.end,
				index,
			});
		});
	});

	return indices;
};

const emptyFieldValidation = (): VuelidateLikeFieldValidation => ({
	$invalid: false,
	$error: false,
	hourRange: {
		$invalid: false,
	},
	timerangeStartLessThanEnd: {
		$invalid: false,
	},
	timerangeNotIntersect: {
		$invalid: false,
	},
});

const isHourRangeInvalid = (value: number | undefined) =>
	value == null ||
	!Number.isInteger(value) ||
	value < 0 ||
	value > DAY_MINUTE_MAX;

const mapRegleFieldToVuelidate = ({
	field,
	item,
	index,
	prop,
	intersectingIndices,
}: {
	field: SuperCompatibleRegleFieldStatus | undefined;
	item: CalendarAcceptOfDayUi | undefined;
	index: number;
	prop: WeekDaysHourRangeField;
	intersectingIndices: Set<number>;
}): VuelidateLikeFieldValidation => {
	if (!field && !item) {
		return emptyFieldValidation();
	}

	const errors = Array.isArray(field?.$errors) ? field.$errors : [];
	const hourRangeInvalid =
		errors.includes('hourRange') || isHourRangeInvalid(item?.[prop]);
	const startLessThanEndInvalid =
		errors.includes('timerangeStartLessThanEnd') ||
		(item != null && item.start >= item.end);
	const notIntersectInvalid =
		errors.includes('timerangeNotIntersect') || intersectingIndices.has(index);
	const isInvalid =
		Boolean(field?.$invalid) ||
		Boolean(field?.$error) ||
		hourRangeInvalid ||
		startLessThanEndInvalid ||
		notIntersectInvalid;

	return {
		$invalid: isInvalid,
		$error: isInvalid,
		hourRange: {
			$invalid: hourRangeInvalid,
		},
		timerangeStartLessThanEnd: {
			$invalid: startLessThanEndInvalid,
		},
		timerangeNotIntersect: {
			$invalid: notIntersectInvalid,
		},
	};
};

export function useWeekDaysAcceptsFieldValidation(
	validationFields: Ref<Record<string, unknown> | undefined>,
	accepts: Ref<CalendarAcceptOfDayUi[] | undefined>,
) {
	const acceptsFields = computed(
		() =>
			validationFields.value?.accepts as AcceptsValidationFields | undefined,
	);

	const intersectingIndices = computed(() =>
		getIntersectingIndices(accepts.value ?? []),
	);

	const getFieldValidation = (
		index: number,
		prop: WeekDaysHourRangeField,
	): VuelidateLikeFieldValidation =>
		mapRegleFieldToVuelidate({
			field: acceptsFields.value?.$each?.[index]?.[prop],
			item: accepts.value?.[index],
			index,
			prop,
			intersectingIndices: intersectingIndices.value,
		});

	return {
		getFieldValidation,
	};
}
