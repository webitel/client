import BaseListGetter from './BaseListGetter';

// todo: export -> default export
export class WebitelSDKListGetter extends BaseListGetter {
  async _getList(args) {
    try {
      let response = await this.method(...args);
      response = this.responseHandler(response);
      if (this.userResponseHandler) response = this.userResponseHandler(response);
      return response;
    } catch (err) {
      throw err;
    }
  }

  setGetListMethod(method) {
    this.getList = method(this._getList.bind(this));
    return this;
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

export default WebitelSDKListGetter;
