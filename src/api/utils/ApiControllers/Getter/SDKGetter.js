import store from "../../../../store/store";
import {BaseItemGetter} from "./BaseItemGetter";

export class WebitelSDKItemGetter extends BaseItemGetter {
    constructor() {
        super(...arguments);
    }

    async getItem(id) {
        const domainId = store.state.userinfo.domainId;

        try {
            const response = await this.method(id, domainId);
            return this.responseHandler(response);
        } catch (err) {
            throw err;
        }
    }
}