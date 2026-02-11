import axiosMock from '@webitel/ui-sdk/src/tests/mocks/axiosMock.js';

describe('AgentSkillsAPI', () => {
	const request = vi.fn(() =>
		Promise.resolve({
			data: {},
		}),
	);
	const axios = axiosMock({
		default: {
			request,
		},
	});
	vi.doMock('@webitel/ui-sdk/src/api/axios/generateInstance.js', () => ({
		default: () => axios().default,
	}));

	beforeEach(() => {
		request.mockClear();
	});

	it('correctly computes "getList" method api call', async () => {
		const inputParams = {
			fields: [
				'id',
				'name',
				'vitest',
			],
		};
		const url =
			'/call_center/skills?page=1&size=10&fields=id&fields=name&fields=vitest';
		const mock = request.mockImplementationOnce(() =>
			Promise.resolve({
				data: {},
			}),
		);

		const AgentSkillsAPI = (await import('../agentSkills.js')).default;
		await AgentSkillsAPI.getList(inputParams);
		// https://stackoverflow.com/a/41939921
		expect(mock.mock.calls[0][0].url).toBe(url);
	});

	it('correctly computes "getList" method output', async () => {
		const output = {
			items: [
				{
					id: 1,
					shouldCaseConvert: '',
				},
			],
			next: true,
		};

		const response = {
			data: {
				items: [
					{
						id: 1,
						should_case_convert: '',
					},
				],
				next: true,
			},
		};
		request.mockImplementationOnce(() => Promise.resolve(response));
		const AgentSkillsAPI = (await import('../agentSkills.js')).default;
		expect(await AgentSkillsAPI.getList({})).toEqual(output);
	});

	it('correctly computes "get" method api call', async () => {
		const inputParams = {
			itemId: 1,
		};
		const url = '/call_center/skills/1';
		const mock = request.mockImplementationOnce(() =>
			Promise.resolve({
				data: {},
			}),
		);
		const AgentSkillsAPI = (await import('../agentSkills.js')).default;
		await AgentSkillsAPI.get(inputParams);
		expect(mock.mock.calls[0][0].url).toBe(url);
	});

	it('correctly computes "get" method output', async () => {
		const output = {
			id: 1,
		};

		const response = {
			data: {
				id: 1,
			},
		};
		request.mockImplementationOnce(() => Promise.resolve(response));
		const AgentSkillsAPI = (await import('../agentSkills.js')).default;
		expect(
			await AgentSkillsAPI.get({
				itemId: 1,
			}),
		).toEqual(output);
	});

	it('correctly computes "add" method api call', async () => {
		const input = {
			itemInstance: {
				name: 'test',
			},
		};

		const body = {
			name: 'test',
		};

		const mock = request.mockImplementationOnce(() =>
			Promise.resolve({
				data: {},
			}),
		);
		const AgentSkillsAPI = (await import('../agentSkills.js')).default;
		await AgentSkillsAPI.add(input);
		expect(mock.mock.calls[0][0].data).toBe(JSON.stringify(body));
	});

	it('correctly computes "add" method output', async () => {
		const output = {
			id: 1,
			checkCase: '',
		};

		const response = {
			data: {
				id: 1,
				check_case: '',
			},
		};
		request.mockImplementationOnce(() => Promise.resolve(response));
		const AgentSkillsAPI = (await import('../agentSkills.js')).default;
		expect(
			await AgentSkillsAPI.add({
				itemInstance: {},
			}),
		).toEqual(output);
	});

	it('correctly computes "update" method api call', async () => {
		const input = {
			itemInstance: {
				name: 'test',
			},
			itemId: 1,
		};

		const body = {
			name: 'test',
		};

		const mock = request.mockImplementationOnce(() =>
			Promise.resolve({
				data: {},
			}),
		);
		const AgentSkillsAPI = (await import('../agentSkills.js')).default;
		await AgentSkillsAPI.update(input);
		expect(mock.mock.calls[0][0].data).toBe(JSON.stringify(body));
	});

	it('correctly computes "update" method output', async () => {
		const output = {
			id: 1,
			checkCase: '',
		};

		const response = {
			data: {
				id: 1,
				check_case: '',
			},
		};
		request.mockImplementationOnce(() => Promise.resolve(response));
		const AgentSkillsAPI = (await import('../agentSkills.js')).default;
		expect(
			await AgentSkillsAPI.update({
				itemInstance: {},
				itemId: 1,
			}),
		).toEqual(output);
	});

	it('correctly computes "delete" method api call', async () => {
		const input = {
			id: 1,
		};

		const url = '/call_center/skills/1';
		const mock = request.mockImplementationOnce(() =>
			Promise.resolve({
				data: {},
			}),
		);
		const AgentSkillsAPI = (await import('../agentSkills.js')).default;
		await AgentSkillsAPI.delete(input);
		expect(mock.mock.calls[0][0].url).toBe(url);
	});
});
