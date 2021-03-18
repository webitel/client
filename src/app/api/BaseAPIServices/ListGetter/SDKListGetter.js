import BaseListGetter from './BaseListGetter';

export default class SDKListGetter extends BaseListGetter {
  constructor(SDKMethod, { defaultListObject, listResponseHandler } = {}) {
    super({ defaultListObject, listResponseHandler });
    this.SDKMethod = SDKMethod;
  }

  async _getList(args) {
    try {
      let response = await this.SDKMethod(...args);
      response = this.responseHandler(response);
      if (this.userResponseHandler) response = this.userResponseHandler(response);
      return response;
    } catch (err) {
      throw err;
    }
  }

  getList({ page = 1, size = 10, search }) {
    return this._getList([page, size, search]);
  }

  getNestedList({
                  parentId,
                  page = 1,
                  size = 10,
                  search,
                }) {
    return this._getList([parentId, page, size, search]);
  }
}