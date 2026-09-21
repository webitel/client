import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createEnsureQueueSaved } from '../useEnsureQueueSaved';

const setup = ({
	isNew = true,
	savesAs = null as string | number | null,
	hasValidationErrors = false,
} = {}) => {
	let itemId: string | number | null = isNew ? null : 'existing';

	const save = vi.fn(async () => {
		itemId = savesAs;
	});
	const notifyValidationBlocked = vi.fn();
	const settleIdRedirect = vi.fn(async () => {});

	const ensureQueueSaved = createEnsureQueueSaved({
		isNew: () => isNew,
		itemId: () => itemId,
		save,
		hasValidationErrors: () => hasValidationErrors,
		notifyValidationBlocked,
		settleIdRedirect,
	});

	return {
		ensureQueueSaved,
		save,
		notifyValidationBlocked,
		settleIdRedirect,
	};
};

describe('createEnsureQueueSaved', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('returns a saved queue as is', async () => {
		const { ensureQueueSaved, save } = setup({
			isNew: false,
		});

		await expect(ensureQueueSaved()).resolves.toBe('existing');
		expect(save).not.toHaveBeenCalled();
	});

	it('saves a new queue and waits for the id redirect', async () => {
		const { ensureQueueSaved, save, settleIdRedirect } = setup({
			savesAs: 42,
		});

		await expect(ensureQueueSaved()).resolves.toBe(42);
		expect(save).toHaveBeenCalledOnce();
		expect(settleIdRedirect).toHaveBeenCalledOnce();
	});

	/** the add silently did nothing before: the errors are on a hidden tab */
	it('notifies when validation blocked the save', async () => {
		const { ensureQueueSaved, notifyValidationBlocked, settleIdRedirect } =
			setup({
				hasValidationErrors: true,
			});

		await expect(ensureQueueSaved()).resolves.toBeNull();
		expect(notifyValidationBlocked).toHaveBeenCalledOnce();
		expect(settleIdRedirect).not.toHaveBeenCalled();
	});

	/** a rejected request notifies on its own — saying it twice reads as two faults */
	it('stays quiet when the save failed without validation errors', async () => {
		const { ensureQueueSaved, notifyValidationBlocked } = setup();

		await expect(ensureQueueSaved()).resolves.toBeNull();
		expect(notifyValidationBlocked).not.toHaveBeenCalled();
	});

	it('notifies on every blocked add', async () => {
		const { ensureQueueSaved, notifyValidationBlocked } = setup({
			hasValidationErrors: true,
		});

		await ensureQueueSaved();
		await ensureQueueSaved();

		expect(notifyValidationBlocked).toHaveBeenCalledTimes(2);
	});
});
