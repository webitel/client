import { BaseItemDeleter } from './BaseItemDeleter';

// todo: export -> default export
export class WebitelSDKItemDeleter extends BaseItemDeleter {
  async _deleteItem(args) {
    try {
      await this.method(...args);
    } catch (err) {
      throw err;
    }
  }

  deleteItem(id) {
    return this._deleteItem([id]);
  }

  deleteNestedItem({ parentId, id }) {
    return this._deleteItem([parentId, id]);
  }
}

export default WebitelSDKItemDeleter;
