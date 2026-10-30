import {
	queueTypeRules,
	sharedQueueRules,
} from '@webitel/api-services/validations';
import { QueueType } from '@webitel/ui-sdk/enums';
import { describe, expect, it } from 'vitest';
import { ref } from 'vue';

import QueueTypeProperties from '../../lookups/QueueTypeProperties.lookup';
import { useQueueTypeControls } from '../useQueueTypeControls';

const allQueueTypes = Object.values(QueueType).filter(
	(type) => QueueTypeProperties[type],
);

describe('useQueueTypeControls', () => {
	it.each(allQueueTypes)(
		'marks exactly the controls type %i declares',
		(type) => {
			const { specificControls } = useQueueTypeControls(() => type);

			const enabled = Object.entries(specificControls.value)
				.filter(([, on]) => on)
				.map(([control]) => control);

			expect(enabled.sort()).toEqual(
				[
					...QueueTypeProperties[type].controls,
				].sort(),
			);
		},
	);

	/**
	 * The Processing tab gates on dotted ids such as
	 * `taskProcessing.prolongationOptions.enabled`; flattening or splitting them
	 * would silently hide those fields.
	 */
	it('keeps dotted control ids intact', () => {
		const { specificControls } = useQueueTypeControls(
			() => QueueType.INBOUND_QUEUE,
		);

		expect(
			specificControls.value['taskProcessing.prolongationOptions.enabled'],
		).toBe(true);
		expect(specificControls.value.taskProcessing).toBeUndefined();
	});

	/** the legacy computed did `.reduce` straight onto `undefined.controls` */
	it('yields an empty map for an unknown type instead of throwing', () => {
		for (const type of [
			undefined,
			999,
		]) {
			const { specificControls } = useQueueTypeControls(() => type);
			expect(specificControls.value).toEqual({});
		}
	});

	it('follows the type as it changes', () => {
		const type = ref<number>(QueueType.OFFLINE_QUEUE);
		const { specificControls } = useQueueTypeControls(type);

		expect(specificControls.value.strategy).toBe(true);

		type.value = QueueType.INBOUND_QUEUE;
		// inbound has no strategy control, but does have maxWaitTime
		expect(specificControls.value.strategy).toBeUndefined();
		expect(specificControls.value.maxWaitTime).toBe(true);
	});
});

describe('isFieldRequired', () => {
	/**
	 * Drives the asterisk on type-dependent fields. It used to come from
	 * `:required="v.itemInstance.calendar"` — truthy only when that type's
	 * validations branch had declared a rule — so it must agree with the rules.
	 */
	it.each(allQueueTypes)('agrees with the rule table for type %i', (type) => {
		const { isFieldRequired } = useQueueTypeControls(() => type);

		const required = [
			...(sharedQueueRules.required ?? []),
			...(queueTypeRules[type]?.required ?? []),
		];

		for (const path of required) {
			expect(isFieldRequired(path), `${path} on type ${type}`).toBe(true);
		}
		expect(isFieldRequired('description')).toBe(false);
	});

	it('requires a calendar only for the types that declare one', () => {
		const requiresCalendar = (type: number) =>
			useQueueTypeControls(() => type).isFieldRequired('calendar');

		expect(requiresCalendar(QueueType.OFFLINE_QUEUE)).toBe(true);
		// inbound queues take their calendar from the flow
		expect(requiresCalendar(QueueType.INBOUND_QUEUE)).toBe(false);
		expect(requiresCalendar(QueueType.CHAT_INBOUND_QUEUE)).toBe(false);
	});

	it('never reports a name-only rule as type specific', () => {
		const { isFieldRequired } = useQueueTypeControls(() => undefined);
		// `name` is shared, so it holds even without a type
		expect(isFieldRequired('name')).toBe(true);
		expect(isFieldRequired('strategy')).toBe(false);
	});
});
