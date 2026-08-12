import type { SuperCompatibleRegleFieldStatus } from '@regle/core';
import { type MaybeRef, toValue } from 'vue';
import { useI18n } from 'vue-i18n';

type AcceptsRegleFields = {
	$each?: Array<
		Partial<
			Record<'start' | 'end', SuperCompatibleRegleFieldStatus | undefined>
		>
	>;
};

const VALIDATION_MESSAGE_KEYS = [
	'hourRange',
	'timerangeStartLessThanEnd',
	'timerangeNotIntersect',
] as const;

type ValidationMessageKey = (typeof VALIDATION_MESSAGE_KEYS)[number];

const isValidationMessageKey = (
	value: unknown,
): value is ValidationMessageKey =>
	typeof value === 'string' &&
	(VALIDATION_MESSAGE_KEYS as readonly string[]).includes(value);

const translateRegleField = (
	field: SuperCompatibleRegleFieldStatus | undefined,
	translate: (key: ValidationMessageKey) => string,
) => {
	if (!field?.$error) return field;

	const errors = Array.isArray(field.$errors) ? field.$errors : [];

	return {
		...field,
		$errors: errors.map((error) =>
			isValidationMessageKey(error) ? translate(error) : String(error),
		),
	};
};

export function useAcceptsRegleField(
	validationFields: MaybeRef<
		| {
				accepts?: unknown;
		  }
		| undefined
	>,
) {
	const { t } = useI18n();

	const getAcceptsRegleField = (
		index: number,
		prop: 'start' | 'end',
	): SuperCompatibleRegleFieldStatus | undefined => {
		const accepts = toValue(validationFields)?.accepts as
			| AcceptsRegleFields
			| undefined;
		const field = accepts?.$each?.[index]?.[prop];

		return translateRegleField(field, (key) => t(`validation.${key}`));
	};

	return {
		getAcceptsRegleField,
	};
}
