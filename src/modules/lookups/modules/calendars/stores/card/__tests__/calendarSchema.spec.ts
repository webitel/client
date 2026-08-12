import { calendarSchema } from '@webitel/api-services/validations';
import { describe, expect, it } from 'vitest';

describe('calendarSchema', () => {
	it('rejects empty name and timezone without id', () => {
		const result = calendarSchema.safeParse({
			name: '',
			timezone: {
				name: 'UTC',
			},
		});

		expect(result.success).toBe(false);
	});

	it('accepts a minimal valid card draft', () => {
		const result = calendarSchema.safeParse({
			name: 'Support hours',
			timezone: {
				id: '1',
				name: 'UTC',
			},
		});

		expect(result.success).toBe(true);
	});

	it('defaults accepts to seven enabled weekday slots', () => {
		const result = calendarSchema.safeParse({
			name: 'Default week',
			timezone: {
				id: '1',
			},
		});

		expect(result.success).toBe(true);
		if (!result.success) return;

		const accepts = result.data.accepts as Array<{
			disabled: boolean;
		}>;
		const specials = result.data.specials as Array<{
			disabled: boolean;
		}>;

		expect(accepts).toHaveLength(7);
		expect(accepts.every(({ disabled }) => disabled === false)).toBe(true);
		expect(specials).toHaveLength(7);
		expect(specials.every(({ disabled }) => disabled === true)).toBe(true);
	});
});
