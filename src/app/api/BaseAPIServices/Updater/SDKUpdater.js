import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import sanitizer from '../../utils/sanitizer';
import BaseItemUpdater from './BaseItemUpdater';

export default class SDKUpdater extends BaseItemUpdater {
  constructor(SDKMethod, options) {
    super(options);
    this.SDKMethod = SDKMethod;
  }

  async _updateItem(args) {
    try {
      await this.SDKMethod(...args);
      eventBus.$emit('notification', { type: 'info', text: 'Successfully updated' });
    } catch (err) {
      throw err;
    }
  }

  updateItem({ itemId, itemInstance }) {
    let itemCopy = deepCopy(itemInstance);
    if (this.preRequestHandler) itemCopy = this.preRequestHandler(itemCopy);
    if (this.fieldsToSend) sanitizer(itemCopy, this.fieldsToSend);
    return this._updateItem([itemId, itemCopy]);
  }

  updateNestedItem({ parentId, itemId, itemInstance }) {
    let itemCopy = deepCopy(itemInstance);
    if (this.preRequestHandler) itemCopy = this.preRequestHandler(itemCopy, parentId);
    if (this.fieldsToSend) sanitizer(itemCopy, this.fieldsToSend);
    return this._updateItem([parentId, itemId, itemCopy]);
  }
}
