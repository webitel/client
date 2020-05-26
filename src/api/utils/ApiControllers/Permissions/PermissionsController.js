import instance from '../../../instance';
import { coerceObjectPermissionsResponse } from '../../../permissions/objects/objects';

export class WebitelAPIPermissionsGetter {
    constructor(url) {
        this.url = url;
    }

    async getList(id, size, search) {
        let url = `${this.url}/${id}/acl`;
        if (size) url += `?size=${size}`;
        if (search && search.slice(-1) !== '*') search += '*';
        if (search) url += `&name=${search}`;

        try {
            const response = await instance.get(url);
            return coerceObjectPermissionsResponse(response);
        } catch (err) {
            throw err;
        }
    }
}

export class WebitelAPIPermissionsPatcher {
    constructor(url) {
        this.url = url;
    }

    async patchItem(id, item) {
        const url = `${this.url}/${id}/acl`;

        try {
            await instance.patch(url, { changes: item });
        } catch (err) {
            throw err;
        }
    }
}
