import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import sanitizer from '../../sanitizer';
import instance from '../../../instance';
import BaseItemPatcher from './BaseItemPatcher';

// remove named export after refactor with default export
export class WebitelAPIItemPatcher extends BaseItemPatcher {
  constructor(url, fieldsToSend) {
    super(null, fieldsToSend);
    this.url = url;
  }

  async patchItem(id, changes, afterUrl = '') {
    let updUrl = `${this.url}/${id}`;
    if (afterUrl) updUrl += `/${afterUrl}`;
    const changesCopy = deepCopy(changes);
    if (this.fieldsToSend) sanitizer(changesCopy, this.fieldsToSend);
    try {
      await instance.patch(updUrl, changesCopy);
      eventBus.$emit('notification', { type: 'info', text: 'Successfully updated' });
    } catch (err) {
      throw err;
    }
  }
}

export default WebitelAPIItemPatcher;
