import axios from 'axios';
import UsersAPI from '../users';

vi.mock('axios', () => {
  return {
    default: {
      post: vi.fn(),
      get: vi.fn(),
      delete: vi.fn(),
      put: vi.fn(),
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

describe('UsersAPI', () => {
  it('correctly computes "getList" method api call', async () => {
    const inputParams = {
      fields: ['id', 'name', 'vitest'],
    };
    const url = '/users?fields=id&fields=name&fields=vitest&page=1&size=10';
    const mock = axios.get.mockImplementationOnce(() => Promise.resolve({
      data: {},
    }));
    await UsersAPI.getList(inputParams);
    expect(mock).toHaveBeenCalledWith(url);
  });
  it('correctly computes "getList" method output', async () => {
    const output = {
      items: [
        {
          dnd: false,
          id: 1,
          name: '',
          state: true,
          status: '',
        },
      ],
      next: true,
    };

    const response = {
      data: {
        items: [
          { id: 1 },
        ],
        next: true,
      },
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(response));
    expect(await UsersAPI.getList({})).toEqual(output);
  });
});
