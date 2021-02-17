import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import sanitizer from '../../sanitizer';
import BaseItemCreator from './BaseItemCreator';

// todo: export -> default export
export class WebitelSDKItemCreator extends BaseItemCreator {
  async _createItem(args) {
    try {
      const response = await this.method(...args);
      eventBus.$emit('notification', { type: 'info', text: 'Successfully added' });
      return this.responseHandler(response);
    } catch (err) {
      throw err;
    }
  }

  createItem(item) {
    const itemCopy = deepCopy(item);
    if (this.preRequestHandler) this.preRequestHandler(itemCopy);
    sanitizer(itemCopy, this.fieldsToSend);
    return this._createItem([item]);
  }

  createNestedItem({ parentId, itemInstance }) {
    let itemCopy = deepCopy(itemInstance);
    if (this.preRequestHandler) itemCopy = this.preRequestHandler(itemCopy, parentId);
    sanitizer(itemCopy, this.fieldsToSend);
    return this._createItem([parentId, itemCopy]);
  }
}

export default WebitelSDKItemCreator;
