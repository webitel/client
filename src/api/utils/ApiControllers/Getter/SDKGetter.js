import BaseItemGetter from './BaseItemGetter';

// todo: export -> default export
export class WebitelSDKItemGetter extends BaseItemGetter {
  async _getItem(args) {
    try {
      const response = await this.method(...args);
      return this.responseHandler(response);
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

export default WebitelSDKItemGetter;
