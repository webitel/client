import deepCopy from "deep-copy";
import store from "../../../../store/store";
import sanitizer from "../../sanitizer";
import eventBus from "../../../../utils/eventBus";
import {BaseItemCreator} from "./BaseItemCreator";

export class WebitelSDKItemCreator extends BaseItemCreator {
    constructor() {
        super(...arguments);
    }

    async createItem(item) {
        let itemCopy = deepCopy(item);
        itemCopy.domainId = store.state.userinfo.domainId;
        if(this.preRequestHandler) this.preRequestHandler(itemCopy);
        sanitizer(itemCopy, this.fieldsToSend);
        try {
            const response = await this.method(itemCopy);
            eventBus.$emit('notificationInfo', 'Successfully added');
            return this.responseHandler(response);
        } catch (err) {
            throw err;
        }
    }
}