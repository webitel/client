import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import sanitizer from '../../sanitizer';
import instance from '../../../instance';
import BaseItemPatcher from './BaseItemPatcher';

export class WebitelAPIItemPatcher extends BaseItemPatcher {
    constructor(url, fieldsToSend) {
        super(null, fieldsToSend);
        this.url = url;
    }

    async patchItem(id, item, afterUrl = '') {
        let updUrl = `${this.url}/${id}`;
        if (afterUrl) updUrl += `/${afterUrl}`;
        const itemCopy = deepCopy(item);
        sanitizer(itemCopy, this.fieldsToSend);
        try {
            await instance.patch(updUrl, itemCopy);
            eventBus.$emit('notification', { type: 'info', text: 'Successfully updated' });
        } catch (err) {
            throw err;
        }
    }
}
