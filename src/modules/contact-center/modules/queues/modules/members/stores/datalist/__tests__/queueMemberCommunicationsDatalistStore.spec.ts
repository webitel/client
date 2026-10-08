import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { unref } from 'vue';

const getCommunications = vi.fn();

vi.mock('@webitel/api-services/api', () => ({
	QueueMembersAPI: {
		getCommunications,
	},
}));

const {
	getMemberCommunicationsList,
	useQueueMemberCommunicationsDatalistStore,
} = await import('../queueMemberCommunicationsDatalistStore');

const lastRequest = () => getCommunications.mock.lastCall?.[0];

/** what the popup does on open: the queue as a filter, the member as the parent */
const open = (
	store: ReturnType<typeof useQueueMemberCommunicationsDatalistStore>,
	memberId = '42',
) => {
	const queueFilter = {
		name: 'queueId',
		value: '7',
	};
	if (store.hasFilter(queueFilter.name)) store.updateFilter(queueFilter);
	else store.addFilter(queueFilter);
	return store.initialize({
		parentId: memberId,
	});
};

describe('queue member communications datalist store', () => {
	beforeEach(() => {
		setActivePinia(createPinia());
		getCommunications.mockReset().mockResolvedValue({
			items: [
				{
					id: '1',
				},
			],
			next: true,
		});
	});

	it('requests the member of the queue', async () => {
		const store = useQueueMemberCommunicationsDatalistStore();

		await open(store);

		expect(lastRequest()).toMatchObject({
			parentId: '7',
			memberId: '42',
			page: 1,
		});
		expect(store.dataList).toHaveLength(1);
	});

	it('passes the sort and the page through to the api', async () => {
		await getMemberCommunicationsList({
			parentId: '42',
			queueId: '7',
			page: 2,
			size: 10,
			sort: '-destination',
		});

		expect(lastRequest()).toEqual({
			parentId: '7',
			memberId: '42',
			page: 2,
			size: 10,
			sort: '-destination',
		});
	});

	/** `field` goes out as the sort key; engine sorts by exactly these three */
	it('sorts by destination, type and priority', () => {
		const store = useQueueMemberCommunicationsDatalistStore();

		expect(unref(store.headers).map((header) => header.field)).toEqual([
			'destination',
			'type',
			'priority',
		]);
	});

	it('appends the next page', async () => {
		const store = useQueueMemberCommunicationsDatalistStore();
		await open(store);
		getCommunications.mockResolvedValue({
			items: [
				{
					id: '2',
				},
			],
			next: false,
		});

		await store.appendToDataList();

		expect(lastRequest()).toMatchObject({
			page: 2,
		});
		expect(unref(store.dataList).map(({ id }) => id)).toEqual([
			'1',
			'2',
		]);
		expect(store.next).toBe(false);
	});

	/** the store outlives the popup, so another member must not see these rows */
	it('drops the rows on reset', async () => {
		const store = useQueueMemberCommunicationsDatalistStore();
		await open(store);

		store.$reset();

		expect(store.dataList).toEqual([]);
	});

	/** a reopened popup must ask for the new member, still in the same queue */
	it('requests the next member after a reset', async () => {
		const store = useQueueMemberCommunicationsDatalistStore();
		await open(store);
		store.$reset();

		await open(store, '43');

		expect(lastRequest()).toMatchObject({
			parentId: '7',
			memberId: '43',
		});
	});
});
