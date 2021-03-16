import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import sanitizer from '../../sanitizer';
import instance from '../../../instance';
import BaseItemPatcher from './BaseItemPatcher';

export default class APIPatcher extends BaseItemPatcher {
  constructor(baseUrl, { fieldsToSend, nestedUrl } = {}) {
    super({ fieldsToSend });
    this.baseUrl = baseUrl;
    if (nestedUrl) this.nestedUrl = nestedUrl;
  }

  async _patchItem(changes, baseUrl = this.baseUrl) {
    try {
      await instance.patch(baseUrl, changes);
      eventBus.$emit('notification', { type: 'info', text: 'Successfully updated' });
    } catch (err) {
      throw err;
    }
  }

  patchItem({ id, changes }, afterUrl) {
    let updUrl = `${this.baseUrl}/${id}`;
    if (afterUrl) updUrl += `/${afterUrl}`;
    const changesCopy = deepCopy(changes);
    if (this.fieldsToSend) sanitizer(changesCopy, this.fieldsToSend);
    return this._patchItem(changesCopy, updUrl);
  }

  patchNestedItem({
                    parentId,
                    id,
                    changes,
                    afterUrl,
                  }) {
    let updUrl = `${this.baseUrl}/${parentId}/${this.nestedUrl}/${id}`;
    if (afterUrl) updUrl += `/${afterUrl}`;
    const changesCopy = deepCopy(changes);
    if (this.fieldsToSend) sanitizer(changesCopy, this.fieldsToSend);
    return this._patchItem(changesCopy, updUrl);
  }
}
