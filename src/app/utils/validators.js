import { helpers } from '@vuelidate/validators';

export const macValidator = (value) => {
	if (typeof value === 'undefined' || value === null || value === '') {
		return true;
	}
	return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(value);
};

export const ipValidator = (value) => {
	if (typeof value === 'undefined' || value === null || value === '') {
		return true;
	}
	if (value === '127.0.0.1' || value === '0.0.0.0') {
		return false;
	}
	return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(
		value,
	);
};

export const gatewayHostValidator = (value) => {
	if (typeof value === 'undefined' || value === null || value === '') {
		return true;
	}
	return (
		/^(sips?:)?(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(:[0-9]{1,5})?$/.test(
			value,
		) ||
		/^(sips?:)?(?=.{1,254}$)((?=[a-z0-9-]{1,63}\.)(xn--+)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}/i.test(
			value,
		)
	);
};

export const sipAccountValidator = (value) => {
	if (typeof value === 'undefined' || value === null || value === '') {
		return true;
	}
	return /^(sips?:)?([\w\-.!~*()&=+$,;?/]+)(?:@([\w\-.]+)(?::(\d{3,5}))?)?$/i.test(
		value,
	);
};

export const requiredArrayValue = (array) => array.some((value) => value);

export const timerangeStartLessThanEnd = (object) => object.start < object.end;

export const timerangeNotIntersect = (array) => {
	let isIntersecting = false;
	let ranges = [
		{
			start: array[0].start,
			end: array[0].end,
		},
	];
	array.reduce((prev, curr) => {
		if (prev.day !== curr.day) {
			ranges = [
				{
					start: curr.start,
					end: curr.end,
				},
			];
			return curr;
		}
		ranges.forEach((range) => {
			if (
				(curr.start >= range.start && curr.end <= range.end) || // if [..{--}..]
				(curr.start <= range.start && curr.end >= range.start) || // or {--[--}....]
				(curr.start <= range.end && curr.end >= range.end)
			) {
				// or [....{--]-}
				isIntersecting = true;
			}
		});
		ranges.push({
			start: curr.start,
			end: curr.end,
		});
		return curr;
	});
	return !isIntersecting;
};

export const lessOrEqualTo = (comparedProp) => (value, vm) =>
	value <= vm[comparedProp];
export const moreOrEqualTo = (comparedProp) => (value, vm) =>
	value >= vm[comparedProp];

export const regExpValidator = (value) => {
	try {
		return new RegExp(value) instanceof RegExp;
	} catch (e) {
		return false;
	}
};
export const isRegExpMatched = (regExp, errorMessage) => {
	return helpers.withParams(
		{
			type: 'isRegExpMatched',
			regExp,
			errorMessage,
		},
		(value) => {
			if (!value) return true;
			return regExp.test(value);
		},
	);
};
