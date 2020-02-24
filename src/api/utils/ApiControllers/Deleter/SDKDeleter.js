import store from "../../../../store/store";
import {BaseItemDeleter} from "./BaseItemDeleter";

export class WebitelSDKItemDeleter extends BaseItemDeleter {
    constructor() {
        super(...arguments);
    }

    async deleteItem(id) {
        const domainId = store.state.userinfo.domainId;
        try {
            await this.method(id, domainId);
        } catch (err) {
            throw err;
        }
    }
}