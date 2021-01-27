import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import sanitizer from '../../sanitizer';
import { BaseItemCreator } from './BaseItemCreator';

export class WebitelSDKItemCreator extends BaseItemCreator {
        async createItem(item) {
        const itemCopy = deepCopy(item);
        if (this.preRequestHandler) this.preRequestHandler(itemCopy);
        sanitizer(itemCopy, this.fieldsToSend);
        try {
            const response = await this.method(itemCopy);
            eventBus.$emit('notification', { type: 'info', text: 'Successfully added' });
            return this.responseHandler(response);
        } catch (err) {
            throw err;
        }
    }
}
