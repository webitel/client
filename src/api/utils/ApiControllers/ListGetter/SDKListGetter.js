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

  getList({ page, size, search }) {
    return this._getList([page, size, search]);
  }

  getNestedList({ parentId, page, size, search }) {
    return this._getList([parentId, page, size, search]);
  }
}

export default WebitelSDKListGetter;
