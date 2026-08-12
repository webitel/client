import type { EngineMemberInQueue } from '@webitel/api-services/gen/models';
import { describe, expect, it } from 'vitest';
import { ref, toRaw } from 'vue';

import { useMemberCommunications } from '../useMemberCommunications';

const communication = (destination: string, typeId = '1') => ({
	destination,
	type: {
		id: typeId,
	},
});

const member = (communications?: unknown[]) =>
	ref({
		communications,
	} as EngineMemberInQueue);

describe('useMemberCommunications', () => {
	it('creates the collection on first add', () => {
		const draft = member(undefined);
		const { add, communications } = useMemberCommunications(draft);

		add(communication('380001'));

		expect(communications.value).toHaveLength(1);
		expect(draft.value.communications).toHaveLength(1);
	});

	it('replaces a row by index', () => {
		const draft = member([
			communication('380001'),
			communication('380002'),
		]);
		const { update, communications } = useMemberCommunications(draft);

		update(1, communication('380003'));

		expect(communications.value.map((c) => c.destination)).toEqual([
			'380001',
			'380003',
		]);
	});

	/**
	 * Regression guard. Deletion used to match on destination + type id, so with
	 * two identical rows it removed whichever came first rather than the one the
	 * user picked. Matching by identity fixes that, and only a duplicate pair
	 * can tell the two approaches apart.
	 */
	it('removes the row it was handed, not an equal one', () => {
		const first = communication('380001');
		const duplicate = communication('380001');
		const draft = member([
			first,
			duplicate,
		]);
		const { remove, communications } = useMemberCommunications(draft);

		remove([
			duplicate,
		]);

		expect(communications.value).toHaveLength(1);
		// through toRaw: the draft hands back reactive proxies, not the originals
		expect(toRaw(communications.value[0])).toBe(first);
	});

	it('removes several rows at once', () => {
		const [a, b, c] = [
			communication('1'),
			communication('2'),
			communication('3'),
		];
		const draft = member([
			a,
			b,
			c,
		]);
		const { remove, communications } = useMemberCommunications(draft);

		remove([
			a,
			c,
		]);

		expect(communications.value.map((row) => toRaw(row))).toEqual([
			b,
		]);
	});

	it('tolerates removing a row that is already gone', () => {
		const kept = communication('1');
		const draft = member([
			kept,
		]);
		const { remove, communications } = useMemberCommunications(draft);

		remove([
			communication('nope'),
		]);

		expect(communications.value).toEqual([
			kept,
		]);
	});

	/**
	 * The card decides "any field edited" by comparing the draft's identity, so
	 * adds and updates have to mutate the array rather than replace the member.
	 */
	it('edits the draft in place', () => {
		const draft = member([]);
		const original = draft.value;
		const { add, update } = useMemberCommunications(draft);

		add(communication('380001'));
		update(0, communication('380002'));

		expect(draft.value).toBe(original);
	});
});
