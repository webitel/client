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
