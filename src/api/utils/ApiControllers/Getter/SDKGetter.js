import BaseItemGetter from './BaseItemGetter';

export default class SDKItemGetter extends BaseItemGetter {
  async _getItem(args) {
    try {
      let response = await this.method(...args);
      response = this.responseHandler(response);
      if (this.userResponseHandler) response = this.userResponseHandler(response);
      return response;
    } catch (err) {
      throw err;
    }
  }

  getItem(id) {
    return this._getItem([id]);
  }

  getNestedItem({ parentId, itemId }) {
    return this._getItem([parentId, itemId]);
  }
}
