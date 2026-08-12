import { type InjectionKey, inject, provide } from 'vue';

export type QueueId = string | number | null | undefined;

/**
 * Resolves to the saved queue's id, or `null` if it could not be saved.
 */
export type EnsureQueueSaved = () => Promise<QueueId>;

export const EnsureQueueSavedKey: InjectionKey<EnsureQueueSaved> =
	Symbol('ensureQueueSaved');

/**
 * @description
 * Lets a nested tab add its first record before the queue itself exists.
 *
 * The legacy tab mixin did this by dispatching the parent's `ADD_ITEM` straight
 * from the tab, which skipped validation entirely — a queue could be persisted
 * half-filled. The card page provides its own already-validated `save` here
 * instead, so an invalid queue blocks the add and surfaces its errors rather
 * than saving.
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
