import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import store from '../../../../store/store';
import sanitizer from '../../sanitizer';
import instance from '../../../instance';
import BaseItemUpdater from './BaseItemUpdater';

export class WebitelAPIItemUpdater extends BaseItemUpdater {
  constructor(url, fieldsToSend, preRequestHandler) {
    super(null, fieldsToSend);
    this.url = url;
    this.preRequestHandler = preRequestHandler;
  }

  async updateItem(id, item) {
    const updUrl = `${this.url}/${id}`;
    const itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    if (this.preRequestHandler) this.preRequestHandler(itemCopy);
    sanitizer(itemCopy, this.fieldsToSend);
    try {
      const response = await instance.put(updUrl, itemCopy);
      eventBus.$emit('notification', { type: 'info', text: 'Successfully updated' });
    } catch (err) {
      throw err;
    }
  }
}
