import instance from '../../../instance';
import BaseListGetter from './BaseListGetter';

export class WebitelAPIListGetter extends BaseListGetter {
  constructor(url, defaultItem) {
    super(null, defaultItem);
    this.url = url;
  }

  async getList({ page, size, search }) {
    if (search && search.slice(-1) !== '*') search += '*';
    size = size || 10;
    let url = `${this.url}?size=${size}&page=${page}`;
    if (search) url += `&name=${search}`;

    try {
      const response = await instance.get(url);
      return this.responseHandler(response);
    } catch (err) {
      throw err;
    }
  }
}
