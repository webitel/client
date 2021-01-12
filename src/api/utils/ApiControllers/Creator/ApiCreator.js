import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import store from '../../../../store/store';
import sanitizer from '../../sanitizer';
import instance from '../../../instance';
import { BaseItemCreator } from './BaseItemCreator';

export class WebitelAPIItemCreator extends BaseItemCreator {
    constructor(url, fieldsToSend, preRequestHandler) {
        super(null, fieldsToSend);
        this.url = url;
        this.preRequestHandler = preRequestHandler;
    }

    async createItem(item) {
        const itemCopy = deepCopy(item);
        itemCopy.domainId = store.state.userinfo.domainId;
        if (this.preRequestHandler) this.preRequestHandler(itemCopy);
        sanitizer(itemCopy, this.fieldsToSend);
        try {
            const response = await instance.post(this.url, itemCopy);
            eventBus.$emit('notification', { type: 'info', text: 'Successfully added' });
            return this.responseHandler(response);
        } catch (err) {
            throw err;
        }
    }
}
