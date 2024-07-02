import axios from 'axios';
import AgentSkillsAPI from '../agentSkills';

// axios mock should be copy-pasted :(
// https://stackoverflow.com/questions/65554910/jest-referenceerror-cannot-access-before-initialization
vi.mock('axios', () => {
  return {
    default: {
      post: vi.fn(),
      get: vi.fn(),
      delete: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      request: vi.fn(),
      create: vi.fn().mockReturnThis(),
      interceptors: {
        request: {
          use: vi.fn(),
          eject: vi.fn(),
        },
        response: {
          use: vi.fn(),
          eject: vi.fn(),
        },
      },
    },
  };
});

describe('AgentSkillsAPI', () => {
  beforeEach(() => {
    axios.request.mockClear();
  });

  it('correctly computes "getList" method api call', async () => {
    const inputParams = {
      fields: ['id', 'name', 'vitest'],
    };
    const url = '/call_center/skills?page=1&size=10&fields=id&fields=name&fields=vitest';
    const mock = axios.request.mockImplementationOnce(() =>
      Promise.resolve({
        data: {},
      }),
    );
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
    axios.request.mockImplementationOnce(() => Promise.resolve(response));
    expect(await AgentSkillsAPI.getList({})).toEqual(output);
  });

  it('correctly computes "get" method api call', async () => {
    const inputParams = {
      itemId: 1,
    };
    const url = '/call_center/skills/1';
    const mock = axios.request.mockImplementationOnce(() =>
      Promise.resolve({
        data: {},
      }),
    );
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
    axios.request.mockImplementationOnce(() => Promise.resolve(response));
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

    const mock = axios.request.mockImplementationOnce(() =>
      Promise.resolve({
        data: {},
      }),
    );
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
    axios.request.mockImplementationOnce(() => Promise.resolve(response));
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

    const mock = axios.request.mockImplementationOnce(() =>
      Promise.resolve({
        data: {},
      }),
    );
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
    axios.request.mockImplementationOnce(() => Promise.resolve(response));
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
    const mock = axios.request.mockImplementationOnce(() =>
      Promise.resolve({
        data: {},
      }),
    );
    await AgentSkillsAPI.delete(input);
    expect(mock.mock.calls[0][0].url).toBe(url);
  });
});
