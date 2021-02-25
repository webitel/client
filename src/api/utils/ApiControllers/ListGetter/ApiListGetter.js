import instance from '../../../instance';
import BaseListGetter from './BaseListGetter';

// remove export after refactor
export class WebitelAPIListGetter extends BaseListGetter {
  constructor(url, defaultItem) {
    super(null, defaultItem);
    this.url = url;
  }

  async getList({
                  page = 1,
                  size = 10,
                  search,
                  searchQuery = 'name',
                }) {
    if (search && search.slice(-1) !== '*') search += '*';
    let url = `${this.url}?size=${size}&page=${page}`;
    if (search) url += `&${searchQuery}=${search}`;

    try {
      const response = await instance.get(url);
      return this.responseHandler(response);
    } catch (err) {
      throw err;
    }
  }
}

export default WebitelAPIListGetter;
