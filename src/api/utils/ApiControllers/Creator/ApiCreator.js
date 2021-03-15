import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import sanitizer from '../../sanitizer';
import instance from '../../../instance';
import BaseItemCreator from './BaseItemCreator';

export default class APIItemCreator extends BaseItemCreator {
  constructor(baseUrl, { fieldsToSend, preRequestHandler, nestedUrl } = {}) {
    super(null, fieldsToSend);
    this.baseUrl = baseUrl;
    if (preRequestHandler) this.preRequestHandler = preRequestHandler;
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

  createItem(itemInstance) {
    const itemCopy = deepCopy(itemInstance);
    if (this.preRequestHandler) this.preRequestHandler(itemCopy);
    sanitizer(itemCopy, this.fieldsToSend);
    return this._createItem(itemCopy);
  }

  createNestedItem({ parentId, itemInstance }) {
    const itemCopy = deepCopy(itemInstance);
    if (this.preRequestHandler) this.preRequestHandler(itemCopy);
    sanitizer(itemCopy, this.fieldsToSend);
    const baseUrl = `${this.baseUrl}/${parentId}/${this.nestedUrl}`;
    return this._createItem(itemCopy, baseUrl);
  }
}
