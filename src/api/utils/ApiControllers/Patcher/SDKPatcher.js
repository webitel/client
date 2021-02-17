import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import sanitizer from '../../sanitizer';
import { BaseItemPatcher } from './BaseItemPatcher';

// todo: export -> default export
export class WebitelSDKItemPatcher extends BaseItemPatcher {
  async _patchItem(args) {
    try {
      await this.method(...args);
      eventBus.$emit('notification', { type: 'info', text: 'Successfully updated' });
    } catch (err) {
      throw err;
    }
  }

  patchItem(id, changes) {
    const changesCopy = deepCopy(changes);
    sanitizer(changesCopy, this.fieldsToSend);
    return this._patchItem([id, changes]);
  }

  patchNestedItem({ parentId, id, changes }) {
    const changesCopy = deepCopy(changes);
    sanitizer(changesCopy, this.fieldsToSend);
    return this._patchItem([parentId, id, changes]);
  }
}

export default WebitelSDKItemPatcher;
