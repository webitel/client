import instance from '../../instance';
import BaseItemDeleter from './BaseItemDeleter';

export default class APIItemDeleter extends BaseItemDeleter {
  constructor(baseUrl, { nestedUrl } = {}) {
    super();
    this.baseUrl = baseUrl;
    if (nestedUrl) this.nestedUrl = nestedUrl;
  }

  async _deleteItem({ id }, baseUrl = this.baseUrl) {
    const delUrl = `${baseUrl}/${id}?permanent=true`;
    try {
      await instance.delete(delUrl);
      // eventBus.$emit('notificationInfo', 'Successfully delted');
    } catch (err) {
      throw err;
    }
  }

  deleteItem({ id }) {
    return this._deleteItem({ id });
  }

  deleteNestedItem({ parentId, id }) {
    const baseUrl = `${this.baseUrl}/${parentId}/${this.nestedUrl}`;
    return this._deleteItem({ id }, baseUrl);
  }
}
