import {
	queueTypeRules,
	sharedQueueRules,
} from '@webitel/api-services/validations';
import { computed, type MaybeRefOrGetter, toValue } from 'vue';

import QueueTypeProperties from '../lookups/QueueTypeProperties.lookup';

export type QueueSpecificControls = Record<string, boolean>;

/**
 * @description
 * Which form controls a queue of this type shows.
 *
 * The General, Parameters and Processing tabs each used to build this same
 * boolean map in their own `specificControls` computed. Keys are control ids
 * from `QueueTypeProperties`, including dotted ones such as
 * `'taskProcessing.prolongationOptions.enabled'`, so the templates' `v-if`
 * expressions carry over unchanged.
 */
export const useQueueTypeControls = (
	type: MaybeRefOrGetter<number | undefined>,
) => {
	const specificControls = computed<QueueSpecificControls>(() => {
		const queueType = toValue(type);
		// unlike the legacy computed, an unknown type yields {} instead of throwing
		const controls =
			queueType == null ? undefined : QueueTypeProperties[queueType]?.controls;

		return (controls ?? []).reduce<QueueSpecificControls>((acc, control) => {
			acc[control] = true;
			return acc;
		}, {});
	});

	/**
	 * Whether this queue type requires `path` (dotted, e.g. `payload.maxAttempts`),
	 * for the asterisk on a field's label.
	 *
	 * The old templates got this from `:required="v.itemInstance.calendar"` —
	 * truthy only when that type's `validations()` branch had declared a rule for
	 * the field. Reading the shared rule table says the same thing outright.
	 */
	const isFieldRequired = (path: string) => {
		const queueType = toValue(type);
		const required = [
			...(sharedQueueRules.required ?? []),
			...(queueType != null ? (queueTypeRules[queueType]?.required ?? []) : []),
		];
		return required.includes(path);
	};

	return {
		specificControls,
		isFieldRequired,
	};
};
