import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import sanitizer from '../../utils/sanitizer';
import BaseItemPatcher from './BaseItemPatcher';

export default class SDKPatcher extends BaseItemPatcher {
  constructor(SDKMethod, options) {
    super(options);
    this.SDKMethod = SDKMethod;
  }

  async _patchItem(args) {
    try {
      await this.SDKMethod(...args);
      eventBus.$emit('notification', { type: 'info', text: 'Successfully updated' });
    } catch (err) {
      throw err;
    }
  }

  patchItem({ id, changes }) {
    const changesCopy = deepCopy(changes);
    if (this.fieldsToSend) sanitizer(changesCopy, this.fieldsToSend);
    return this._patchItem([id, changes]);
  }

  patchNestedItem({ parentId, id, changes }) {
    const changesCopy = deepCopy(changes);
    if (this.fieldsToSend) sanitizer(changesCopy, this.fieldsToSend);
    return this._patchItem([parentId, id, changes]);
  }
}
