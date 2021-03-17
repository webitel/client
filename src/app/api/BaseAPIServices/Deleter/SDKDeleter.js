import BaseItemDeleter from './BaseItemDeleter';

export default class SDKDeleter extends BaseItemDeleter {
  constructor(SDKMethod) {
    super();
    this.SDKMethod = SDKMethod;
  }

  async _deleteItem(args) {
    try {
      await this.SDKMethod(...args);
    } catch (err) {
      throw err;
    }
  }

  deleteItem({ id }) {
    return this._deleteItem([id]);
  }

  deleteNestedItem({ parentId, id }) {
    return this._deleteItem([parentId, id]);
  }
}
