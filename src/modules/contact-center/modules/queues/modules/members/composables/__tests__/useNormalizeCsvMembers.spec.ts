import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';

const getList = vi.fn();
const addBulk = vi.fn();

vi.mock('@webitel/api-services/api', () => ({
	CommunicationsAPI: {
		getList: (...args: unknown[]) => getList(...args),
	},
	QueueMembersAPI: {
		addBulk: (...args: unknown[]) => addBulk(...args),
	},
}));

const { useNormalizeCsvMembers } = await import('../useNormalizeCsvMembers');

/** the csv columns the importer knows how to zip into communications */
const communicationTypes = [
	{
		id: '10',
		code: 'phone',
	},
	{
		id: '20',
		code: 'email',
	},
];

const setup = (
	mappingFields: {
		name: string;
		csv?: string | string[];
	}[] = [],
) =>
	useNormalizeCsvMembers({
		parentId: ref('42'),
		file: ref({
			name: 'members.csv',
		} as File),
		mappingFields: ref(mappingFields),
	});

const row = (over = {}) => ({
	name: 'Joe',
	destination: [
		'380001',
	],
	code: [
		'phone',
	],
	...over,
});

describe('useNormalizeCsvMembers', () => {
	beforeEach(() => {
		getList.mockReset().mockResolvedValue({
			items: communicationTypes,
		});
		addBulk.mockReset().mockResolvedValue(undefined);
	});

	it('zips destinations and codes into communications', async () => {
		const { normalizeData } = setup();

		const [member] = await normalizeData([
			row({
				destination: [
					'380001',
					'joe@x.dev',
				],
				code: [
					'phone',
					'email',
				],
			}),
		]);

		expect(member.communications).toEqual([
			{
				destination: '380001',
				type: {
					id: '10',
				},
			},
			{
				destination: 'joe@x.dev',
				type: {
					id: '20',
				},
			},
		]);
	});

	/**
	 * A destination with no code (or the reverse) cannot form a communication,
	 * so the shorter column wins and the extra value is dropped.
	 */
	it('stops at the shorter of the two columns', async () => {
		const { normalizeData } = setup();

		const [member] = await normalizeData([
			row({
				destination: [
					'380001',
					'380002',
				],
				code: [
					'phone',
				],
			}),
		]);

		expect(member.communications).toHaveLength(1);
		expect(member.communications[0].destination).toBe('380001');
	});

	it('skips a row whose code is not a known communication type', async () => {
		const { normalizeData } = setup();

		const [member] = await normalizeData([
			row({
				destination: [
					'380001',
					'380002',
				],
				code: [
					'carrier-pigeon',
					'phone',
				],
			}),
		]);

		expect(member.communications).toEqual([
			{
				destination: '380002',
				type: {
					id: '10',
				},
			},
		]);
	});

	it('rejects a member left with no communications', async () => {
		const { normalizeData } = setup();

		await expect(
			normalizeData([
				row({
					destination: [
						'',
					],
					code: [
						'phone',
					],
				}),
			]),
		).rejects.toThrow(RangeError);
	});

	it('rejects dtmf that is not digits or w', async () => {
		const { normalizeData } = setup();

		await expect(
			normalizeData([
				row({
					dtmf: [
						'12ab',
					],
				}),
			]),
		).rejects.toThrow(SyntaxError);

		await expect(
			normalizeData([
				row({
					dtmf: [
						'12w',
					],
				}),
			]),
		).resolves.toBeDefined();
	});

	it('turns the id columns into lookups', async () => {
		const { normalizeData } = setup();

		const [member] = await normalizeData([
			row({
				timezoneId: '1',
				bucketId: '2',
				agentId: '3',
			}),
		]);

		expect(member.timezone).toEqual({
			id: '1',
		});
		expect(member.bucket).toEqual({
			id: '2',
		});
		expect(member.agent).toEqual({
			id: '3',
		});
		expect(member.timezoneId).toBeUndefined();
	});

	/** variables arrive as a bare column list, keyed by the mapping's csv tags */
	it('keys variables by their mapped csv tags', async () => {
		const { normalizeData } = setup([
			{
				name: 'variables',
				csv: [
					'source',
					'campaign',
				],
			},
		]);

		const [member] = await normalizeData([
			row({
				variables: [
					'web',
					'spring',
				],
			}),
		]);

		expect(member.variables).toEqual({
			source: 'web',
			campaign: 'spring',
		});
	});

	it('defaults a missing priority to zero', async () => {
		const { normalizeData } = setup();

		const [member] = await normalizeData([
			row(),
		]);

		expect(member.priority).toBe(0);
	});

	it('drops the raw communication columns once zipped', async () => {
		const { normalizeData } = setup();

		const [member] = await normalizeData([
			row({
				commPriority: [
					5,
				],
				description: [
					'home',
				],
				dtmf: [
					'12',
				],
			}),
		]);

		expect(member.communications[0]).toMatchObject({
			priority: 5,
			description: 'home',
			dtmf: '12',
		});
		for (const column of [
			'destination',
			'code',
			'commPriority',
			'dtmf',
		]) {
			expect(member[column], column).toBeUndefined();
		}
	});

	it('posts the normalised rows under the queue and file name', async () => {
		const { saveBulkData } = setup();

		await saveBulkData([
			row(),
		]);

		expect(addBulk).toHaveBeenCalledTimes(1);
		const [payload] = addBulk.mock.calls[0];
		expect(payload.parentId).toBe('42');
		expect(payload.fileName).toBe('members.csv');
		expect(payload.items).toHaveLength(1);
	});
});
