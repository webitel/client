import instance from "../../../instance";
import {BaseItemDeleter} from "./BaseItemDeleter";

export class WebitelAPIItemDeleter extends BaseItemDeleter {
    constructor(url) {
        super(null);
        this.url = url;
    }

    async deleteItem(id) {
        const delUrl = this.url + '/' + id + "?permanent=true";
        try {
            await instance.delete(delUrl);
            //eventBus.$emit('notificationInfo', 'Successfully delted');
        } catch (err) {
            throw err;
        }
    }
}