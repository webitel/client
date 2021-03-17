import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import sanitizer from '../../utils/sanitizer';
import BaseItemCreator from './BaseItemCreator';

export default class SDKCreator extends BaseItemCreator {
  constructor(SDKMethod, options) {
    super(options);
    this.SDKMethod = SDKMethod;
  }

  async _createItem(args) {
    try {
      const response = await this.SDKMethod(...args);
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
    return this._createItem([itemCopy]);
  }

  createNestedItem({ parentId, itemInstance }) {
    let itemCopy = deepCopy(itemInstance);
    if (this.preRequestHandler) itemCopy = this.preRequestHandler(itemCopy, parentId);
    if (this.fieldsToSend) sanitizer(itemCopy, this.fieldsToSend);
    return this._createItem([parentId, itemCopy]);
  }
}
