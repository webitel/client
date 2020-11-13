import deepCopy from 'deep-copy';
import store from '../../../../store/store';
import sanitizer from '../../sanitizer';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';import { BaseItemUpdater } from './BaseItemUpdater';

export class WebitelSDKItemUpdater extends BaseItemUpdater {
    constructor() {
        super(...arguments);
    }

    async updateItem(id, item) {
        const itemCopy = deepCopy(item);
        itemCopy.domainId = store.state.userinfo.domainId;
        if (this.preRequestHandler) this.preRequestHandler(itemCopy);
        sanitizer(itemCopy, this.fieldsToSend);
        try {
            await this.method(id, itemCopy);
            eventBus.$emit('notificationInfo', 'Successfully updated');
        } catch (err) {
            throw err;
        }
    }
}
