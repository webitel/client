import type { SuperCompatibleRegleFieldStatus } from '@regle/core';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent } from 'vue';

import {
	getRegleEachField,
	useRegleErrorsTranslation,
} from '../useRegleErrorsTranslation';

const field = (
	$errors: string[],
	$error = true,
): SuperCompatibleRegleFieldStatus =>
	({
		$error,
		$errors,
	}) as unknown as SuperCompatibleRegleFieldStatus;

const setup = () => {
	const Comp = defineComponent({
		setup: () => useRegleErrorsTranslation(),
		template: '<div />',
	});

	return mount(Comp).vm as unknown as ReturnType<
		typeof useRegleErrorsTranslation
	>;
};

describe('useRegleErrorsTranslation', () => {
	it('translates errors reported as validation keys', () => {
		const { translateRegleErrors } = setup();

		expect(
			translateRegleErrors(
				field([
					'hourRange',
				]),
			)?.$errors,
		).toEqual([
			'Hours must be from 00 to 23',
		]);
	});

	it('passes messages without a validation key through', () => {
		const { translateRegleErrors } = setup();

		expect(
			translateRegleErrors(
				field([
					'Something already readable',
				]),
			)?.$errors,
		).toEqual([
			'Something already readable',
		]);
	});

	it('leaves a field without errors untouched', () => {
		const { translateRegleErrors } = setup();
		const valid = field(
			[
				'hourRange',
			],
			false,
		);

		expect(translateRegleErrors(valid)).toBe(valid);
	});
});

describe('getRegleEachField', () => {
	const collection = {
		$each: [
			{
				start: field([
					'hourRange',
				]),
			},
		],
	};

	it('reads one property of one collection item', () => {
		expect(getRegleEachField(collection, 0, 'start')).toBe(
			collection.$each[0].start,
		);
	});

	it('returns undefined for a missing item, property or collection', () => {
		expect(getRegleEachField(collection, 5, 'start')).toBeUndefined();
		expect(getRegleEachField(collection, 0, 'end')).toBeUndefined();
		expect(getRegleEachField(undefined, 0, 'start')).toBeUndefined();
	});
});
