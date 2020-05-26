import store from '../../../../store/store';
import { BaseListGetter } from './BaseListGetter';

export class WebitelSDKListGetter extends BaseListGetter {
    constructor() {
        super(...arguments);
    }

    async getList({ page, size, search }) {
        const { domainId } = store.state.userinfo;
        if (search && search.slice(-1) !== '*') search += '*';
        size = size || 10;

        try {
            const response = await this.method(page, size, search, domainId);
            return this.responseHandler(response);
        } catch (err) {
            throw err;
        }
    }
}
