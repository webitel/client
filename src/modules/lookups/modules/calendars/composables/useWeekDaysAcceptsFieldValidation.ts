import { getCalendarAcceptsIntersectingIndices } from '@webitel/api-services/validations';
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
		getCalendarAcceptsIntersectingIndices(accepts.value ?? []),
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
