import deepCopy from "deep-copy";
import store from "../../../../store/store";
import sanitizer from "../../sanitizer";
import instance from "../../../instance";
import eventBus from "../../../../utils/eventBus";
import {BaseItemUpdater} from "./BaseItemUpdater";

export class WebitelAPIItemUpdater extends BaseItemUpdater {
    constructor(url, fieldsToSend) {
        super(null, fieldsToSend);
        this.url = url;
    }

    async updateItem(id, item) {
        const updUrl = this.url + '/' + id;
        let itemCopy = deepCopy(item);
        itemCopy.domainId = store.state.userinfo.domainId;
        if(this.preRequestHandler) this.preRequestHandler(itemCopy);
        sanitizer(itemCopy, this.fieldsToSend);
        try {
            const response = await instance.put(updUrl, {item: itemCopy});
            eventBus.$emit('notificationInfo', 'Successfully updated');
        } catch (err) {
            throw err;
        }
    }
}