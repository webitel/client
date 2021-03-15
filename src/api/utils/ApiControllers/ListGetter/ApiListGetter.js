import instance from '../../../instance';
import BaseListGetter from './BaseListGetter';

export default class APIListGetter extends BaseListGetter {
  constructor(baseUrl, { defaultListObject, listResponseHandler, nestedUrl } = {}) {
    super({ defaultListObject, listResponseHandler });
    this.baseUrl = baseUrl;
    if (nestedUrl) this.nestedUrl = nestedUrl;
  }

  async _getList({
    page = 1,
    size = 10,
    search,
    searchQuery = 'name',
  }, baseUrl = this.baseUrl) {
    // eslint-disable-next-line no-param-reassign
    if (search && search.slice(-1) !== '*') search += '*';
    let url = `${baseUrl}?size=${size}&page=${page}`;
    if (search) url += `&${searchQuery}=${search}`;

    try {
      let response = await instance.get(url);
      response = this.responseHandler(response);
      if (this.userResponseHandler) response = this.userResponseHandler(response);
      return response;
    } catch (err) {
      throw err;
    }
  }

  getList(params) {
    return this._getList(params);
  }

  getNestedList(params) {
    const baseUrl = `${this.baseUrl}/${params.parentId}/${this.nestedUrl}`;
    return this._getList(params, baseUrl);
  }
}
