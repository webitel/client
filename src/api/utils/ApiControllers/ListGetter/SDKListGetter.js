import { BaseListGetter } from './BaseListGetter';

// todo: export -> default export
export class WebitelSDKListGetter extends BaseListGetter {
  async _getList(args) {
    try {
      const response = await this.method(...args);
      return this.responseHandler(response);
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
