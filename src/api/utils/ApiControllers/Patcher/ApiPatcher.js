import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import sanitizer from '../../sanitizer';
import instance from '../../../instance';
import { BaseItemPatcher } from './BaseItemPatcher';

export class WebitelAPIItemPatcher extends BaseItemPatcher {
    constructor(url, fieldsToSend) {
        super(null, fieldsToSend);
        this.url = url;
    }

    async patchItem(id, item) {
        const updUrl = `${this.url}/${id}/presence`;
        const itemCopy = deepCopy(item);
        sanitizer(itemCopy, this.fieldsToSend);
        try {
            const response = await instance.patch(updUrl, itemCopy);
            eventBus.$emit('notification', { type: 'info', text: 'Successfully updated' });
        } catch (err) {
            throw err;
        }
    }
}
