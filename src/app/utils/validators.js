import { helpers } from '@vuelidate/validators';

export const macValidator = (value) => {
	if (typeof value === 'undefined' || value === null || value === '') {
		return true;
	}
	return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(value);
};

export const requiredArrayValue = (array) => array.some((value) => value);

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
