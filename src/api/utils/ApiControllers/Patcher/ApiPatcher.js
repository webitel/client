import deepCopy from "deep-copy";
import sanitizer from "../../sanitizer";
import instance from "../../../instance";
import eventBus from "../../../../utils/eventBus";
import {BaseItemPatcher} from "./BaseItemPatcher";

export class WebitelAPIItemPatcher extends BaseItemPatcher {
    constructor(url, fieldsToSend) {
        super(null, fieldsToSend);
        this.url = url;
    }

    async patchItem(id, item) {
        const updUrl = this.url + '/' + id;
        let itemCopy = deepCopy(item);
        sanitizer(itemCopy, this.fieldsToSend);
        try {
            const response = await instance.patch(updUrl,  itemCopy);
            eventBus.$emit('notificationInfo', 'Successfully updated');
        } catch (err) {
            throw err;
        }
    }
}