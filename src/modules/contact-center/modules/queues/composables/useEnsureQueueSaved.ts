import { type InjectionKey, inject, provide } from 'vue';

export type QueueId = string | number | null | undefined;

/**
 * Resolves to the saved queue's id, or `null` if it could not be saved.
 */
export type EnsureQueueSaved = () => Promise<QueueId>;

export const EnsureQueueSavedKey: InjectionKey<EnsureQueueSaved> =
	Symbol('ensureQueueSaved');

/**
 * Lets a nested tab add its first record before the queue itself exists.
 *
 * The card page provides its own already-validated `save`, so an invalid queue
 * blocks the add and surfaces its errors rather than saving half-filled.
 */
export const provideEnsureQueueSaved = (ensure: EnsureQueueSaved) => {
	provide(EnsureQueueSavedKey, ensure);
};

/**
 * Nested tabs call this before opening their "new record" popup. Outside a
 * queue card — nothing provided — it resolves to `null`, and the caller aborts.
 */
export const useEnsureQueueSaved = (): EnsureQueueSaved =>
	inject(EnsureQueueSavedKey, async () => null);

/** the card page owns every one of these; kept out of it to stay testable */
interface EnsureQueueSavedDeps {
	isNew: () => boolean;
	itemId: () => QueueId;
	save: () => Promise<unknown>;
	hasValidationErrors: () => boolean;
	/** the blocking field errors render on a tab the nested one hides */
	notifyValidationBlocked: () => void;
	/** lets the card's own `id` redirect land before the tab routes anywhere */
	settleIdRedirect: () => Promise<unknown>;
}

export const createEnsureQueueSaved =
	({
		isNew,
		itemId,
		save,
		hasValidationErrors,
		notifyValidationBlocked,
		settleIdRedirect,
	}: EnsureQueueSavedDeps): EnsureQueueSaved =>
	async () => {
		if (!isNew()) return itemId();

		await save();

		if (!itemId()) {
			// a rejected save already notified; silent validation did not — WTEL-10406
			if (hasValidationErrors()) notifyValidationBlocked();
			return null;
		}

		await settleIdRedirect();

		return itemId();
	};
