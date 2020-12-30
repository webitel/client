import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import store from '../../../../store/store';
import sanitizer from '../../sanitizer';
import { BaseItemPatcher } from './BaseItemPatcher';

export class WebitelSDKItemPatcher extends BaseItemPatcher {
    constructor() {
        super(...arguments);
    }

    async patchItem(id, item) {
        const itemCopy = deepCopy(item);
        itemCopy.domainId = store.state.userinfo.domainId;
        sanitizer(itemCopy, this.fieldsToSend);
        try {
            await this.method(id, itemCopy);
            eventBus.$emit('notificationInfo', 'Successfully updated');
        } catch (err) {
            throw err;
        }
    }
}
