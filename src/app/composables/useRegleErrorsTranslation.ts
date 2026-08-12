import type { SuperCompatibleRegleFieldStatus } from '@regle/core';
import { useI18n } from 'vue-i18n';

type RegleField = SuperCompatibleRegleFieldStatus | undefined;

type RegleCollectionField = {
	$each?: Array<Record<string, RegleField>>;
};

/**
 * Reads the validation state of one property of one collection item, e.g.
 * `accepts.$each[2].start`.
 */
export const getRegleEachField = (
	collection: unknown,
	index: number,
	prop: string,
): RegleField =>
	(collection as RegleCollectionField | undefined)?.$each?.[index]?.[prop];

export const useRegleErrorsTranslation = () => {
	const { t, te, fallbackLocale } = useI18n();

	/** `te` checks the active locale only, so ask the fallback locale too */
	const hasTranslation = (key: string) =>
		te(key) || te(key, String(fallbackLocale.value));

	/**
	 * Zod schemas from `@webitel/api-services` report custom rules by their i18n
	 * key (`hourRange`, `timerangeNotIntersect`, ...) instead of a message, and
	 * regle hands `$errors` to the ui components untouched. Translate the errors
	 * we have a `validation.*` key for, pass the rest through.
	 */
	const translateRegleErrors = (field: RegleField): RegleField => {
		if (!field?.$error) return field;

		const errors = Array.isArray(field.$errors) ? field.$errors : [];

		return {
			...field,
			$errors: errors.map((error) => {
				const key = `validation.${error}`;
				return hasTranslation(key) ? t(key) : String(error);
			}),
		};
	};

	return {
		translateRegleErrors,
	};
};
