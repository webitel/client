import deepCopy from "deep-copy";
import store from "../../../../store/store";
import sanitizer from "../../sanitizer";
import instance from "../../../instance";
import eventBus from "../../../../utils/eventBus";
import {BaseItemCreator} from "./BaseItemCreator";

export class WebitelAPIItemCreator extends BaseItemCreator {
    constructor(url, fieldsToSend) {
        super(null, fieldsToSend);
        this.url = url;
    }

    async createItem(item) {
        let itemCopy = deepCopy(item);
        itemCopy.domainId = store.state.userinfo.domainId;
        if(this.preRequestHandler) this.preRequestHandler(itemCopy);
        sanitizer(itemCopy, this.fieldsToSend);
        try {
            const response = await instance.post(this.url,  itemCopy);
            eventBus.$emit('notificationInfo', 'Successfully added');
            return this.responseHandler(response);
        } catch (err) {
            throw err;
        }
    }
}