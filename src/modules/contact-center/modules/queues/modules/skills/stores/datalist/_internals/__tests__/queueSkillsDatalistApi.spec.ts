import { beforeEach, describe, expect, it, vi } from 'vitest';

const getList = vi.fn();

vi.mock('@webitel/api-services/api', () => ({
	QueueSkillsAPI: {
		getList: (...args: unknown[]) => getList(...args),
		get: vi.fn(),
		add: vi.fn(),
		patch: vi.fn(),
		update: vi.fn(),
		delete: vi.fn(),
	},
}));

const { QueueSkillsDatalistAPI } = await import('../queueSkillsDatalistApi');

const fieldsOfLastCall = () => getList.mock.calls.at(-1)?.[0].fields;

describe('QueueSkillsDatalistAPI.getList', () => {
	beforeEach(() => {
		getList.mockReset();
		getList.mockResolvedValue({
			items: [],
			next: false,
		});
	});

	it('asks for `min_capacity` alongside the capacity column field', async () => {
		await QueueSkillsDatalistAPI.getList({
			fields: [
				'id',
				'skill',
				'max_capacity',
			],
		});

		expect(fieldsOfLastCall()).toEqual([
			'id',
			'skill',
			'max_capacity',
			'min_capacity',
		]);
	});

	it('leaves the fields alone when the capacity column is hidden', async () => {
		await QueueSkillsDatalistAPI.getList({
			fields: [
				'id',
				'skill',
			],
		});

		expect(fieldsOfLastCall()).toEqual([
			'id',
			'skill',
		]);
	});

	it('does not ask for `min_capacity` twice', async () => {
		await QueueSkillsDatalistAPI.getList({
			fields: [
				'max_capacity',
				'min_capacity',
			],
		});

		expect(fieldsOfLastCall()).toEqual([
			'max_capacity',
			'min_capacity',
		]);
	});

	it('passes the rest of the params through', async () => {
		await QueueSkillsDatalistAPI.getList({
			parentId: '42',
			page: 2,
		});

		expect(getList.mock.calls.at(-1)?.[0]).toMatchObject({
			parentId: '42',
			page: 2,
		});
	});

	/** the wire omits a capacity of 0, and "min - max" must not render blank */
	it('defaults a dropped capacity to 0', async () => {
		getList.mockResolvedValue({
			items: [
				{
					id: 1,
					maxCapacity: 20,
				},
				{
					id: 2,
					minCapacity: 5,
				},
			],
			next: false,
		});

		const { items, next } = await QueueSkillsDatalistAPI.getList({
			fields: [
				'max_capacity',
			],
		});

		expect(items).toEqual([
			{
				id: 1,
				minCapacity: 0,
				maxCapacity: 20,
			},
			{
				id: 2,
				minCapacity: 5,
				maxCapacity: 0,
			},
		]);
		expect(next).toBe(false);
	});

	it('keeps a real capacity value', async () => {
		getList.mockResolvedValue({
			items: [
				{
					id: 1,
					minCapacity: 3,
					maxCapacity: 20,
				},
			],
			next: false,
		});

		const { items } = await QueueSkillsDatalistAPI.getList({
			fields: [
				'max_capacity',
			],
		});

		expect(items[0]).toEqual({
			id: 1,
			minCapacity: 3,
			maxCapacity: 20,
		});
	});
});
