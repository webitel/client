import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import sanitizer from '../../utils/sanitizer';
import instance from '../../instance';
import BaseItemCreator from './BaseItemCreator';

export default class APICreator extends BaseItemCreator {
  constructor(baseUrl, { nestedUrl, ...options } = {}) {
    super(options);
    this.baseUrl = baseUrl;
    if (nestedUrl) this.nestedUrl = nestedUrl;
  }

  async _createItem(item, baseUrl = this.baseUrl) {
    try {
      const response = await instance.post(baseUrl, item);
      eventBus.$emit('notification', { type: 'info', text: 'Successfully added' });
      return this.responseHandler(response);
    } catch (err) {
      throw err;
    }
  }

  createItem({ itemInstance }) {
    const itemCopy = deepCopy(itemInstance);
    if (this.preRequestHandler) this.preRequestHandler(itemCopy);
    if (this.fieldsToSend) sanitizer(itemCopy, this.fieldsToSend);
    return this._createItem(itemCopy);
  }

  createNestedItem({ parentId, itemInstance }) {
    const itemCopy = deepCopy(itemInstance);
    if (this.preRequestHandler) this.preRequestHandler(itemCopy);
    if (this.fieldsToSend) sanitizer(itemCopy, this.fieldsToSend);
    const baseUrl = `${this.baseUrl}/${parentId}/${this.nestedUrl}`;
    return this._createItem(itemCopy, baseUrl);
  }
}
