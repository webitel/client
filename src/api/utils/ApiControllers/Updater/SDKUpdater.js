import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import sanitizer from '../../sanitizer';
import BaseItemUpdater from './BaseItemUpdater';

export default class SDKItemUpdater extends BaseItemUpdater {
  async _updateItem(args) {
    try {
      await this.method(...args);
      eventBus.$emit('notification', { type: 'info', text: 'Successfully updated' });
    } catch (err) {
      throw err;
    }
  }

  updateItem(id, item) {
    let itemCopy = deepCopy(item);
    if (this.preRequestHandler) itemCopy = this.preRequestHandler(itemCopy);
    sanitizer(itemCopy, this.fieldsToSend);
    return this._updateItem([id, itemCopy]);
  }

  updateNestedItem({ parentId, itemId, itemInstance }) {
    let itemCopy = deepCopy(itemInstance);
    if (this.preRequestHandler) itemCopy = this.preRequestHandler(itemCopy, parentId);
    sanitizer(itemCopy, this.fieldsToSend);
    return this._updateItem([parentId, itemId, itemCopy]);
  }
}
