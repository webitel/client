import BaseItemGetter from './BaseItemGetter';

export default class SDKGetter extends BaseItemGetter {
  constructor(SDKMethod, { defaultSingleObject, itemResponseHandler } = {}) {
    super({ defaultSingleObject, itemResponseHandler });
    this.SDKMethod = SDKMethod;
  }

  async _getItem(args) {
    try {
      let response = await this.SDKMethod(...args);
      response = this.responseHandler(response);
      if (this.userResponseHandler) response = this.userResponseHandler(response);
      return response;
    } catch (err) {
      throw err;
    }
  }

  getItem({ itemId }) {
    return this._getItem([itemId]);
  }

  getNestedItem({ parentId, itemId }) {
    return this._getItem([parentId, itemId]);
  }
}
