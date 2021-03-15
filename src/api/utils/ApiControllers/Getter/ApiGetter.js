import instance from '../../../instance';
import BaseItemGetter from './BaseItemGetter';

export default class APIItemGetter extends BaseItemGetter {
  constructor(baseUrl, { defaultSingleObject, itemResponseHandler, nestedUrl } = {}) {
    super({ defaultSingleObject, itemResponseHandler });
    this.baseUrl = baseUrl;
    if (nestedUrl) this.nestedUrl = nestedUrl;
  }

  async _getItem(id, baseUrl = this.baseUrl) {
    const getUrl = `${baseUrl}/${id}`;
    try {
      let response = await instance.get(getUrl);
      response = this.responseHandler(response);
      if (this.userResponseHandler) response = this.userResponseHandler(response);
      return response;
    } catch (err) {
      throw err;
    }
  }

  getItem({ itemId }) {
    return this._getItem(itemId);
  }

  getNestedItem({ parentId, itemId }) {
    const baseUrl = `${this.baseUrl}/${parentId}/${this.nestedUrl}`;
    return this._getItem(itemId, baseUrl);
  }
}
