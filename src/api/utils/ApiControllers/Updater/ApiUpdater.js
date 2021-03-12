import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import sanitizer from '../../sanitizer';
import instance from '../../../instance';
import BaseItemUpdater from './BaseItemUpdater';

export class WebitelAPIItemUpdater extends BaseItemUpdater {
  constructor(baseUrl, { fieldsToSend, preRequestHandler, nestedUrl } = {}) {
    super(null, fieldsToSend);
    this.baseUrl = baseUrl;
    if (preRequestHandler) this.preRequestHandler = preRequestHandler;
    if (nestedUrl) this.nestedUrl = nestedUrl;
  }

  async _updateItem({ id, item }, baseUrl = this.baseUrl) {
    const updUrl = `${baseUrl}/${id}`;
    try {
      const response = await instance.put(updUrl, item);
      eventBus.$emit('notification', { type: 'info', text: 'Successfully updated' });
      return response;
    } catch (err) {
      throw err;
    }
  }

  updateItem(itemId, itemInstance) {
    const itemCopy = deepCopy(itemInstance);
    if (this.preRequestHandler) this.preRequestHandler(itemCopy);
    sanitizer(itemCopy, this.fieldsToSend);
    return this._updateItem({ id: itemId, item: itemCopy });
  }

  updateNestedItem({ parentId, itemId, itemInstance }) {
    const itemCopy = deepCopy(itemInstance);
    if (this.preRequestHandler) this.preRequestHandler(itemCopy);
    sanitizer(itemCopy, this.fieldsToSend);
    const baseUrl = `${this.baseUrl}/${parentId}/${this.nestedUrl}`;
    return this._updateItem({ id: itemId, item: itemCopy }, baseUrl);
  }
}
