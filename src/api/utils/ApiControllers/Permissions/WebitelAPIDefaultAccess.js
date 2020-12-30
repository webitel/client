import instance from '../../../instance';

export default class WebitelAPIDefaultAccess {
    constructor(url) {
        this.url = url;
    }

    async searchObjclassDefaultList(oid, size, search) {
        // let uri = new URL(this.url.replace('/objclass', '/acl/objclass') + `/${oid}`);
        const url = `${this.url.replace('/objclass', '/acl/objclass')}/${oid}`;
        const query = []; // [key, value, ...]
        const addQuery = (key, value) => {
            query.push(key);
            query.push(value);
        };
        const queryString = () => {
            let q = '';
            if (query.length === 0) {
                return q;
            }
            q = '?';
            for (let e = 0; e < query.length; e += 2) {
                if (e !== 0) {
                    q += '&';
                }
                q += `${query[e]}=${query[e + 1]}`;
            }
            return q;
        };
        let term = search;
        if (term && term.slice(-1) !== '*') term += '*';
        if (term) addQuery('q', term); // url += `&q=${search}`;
        if (size) addQuery('size', size);

        try {
            const response = await instance.get(url + queryString());
            return response.items;
        } catch (err) {
            throw err;
        }
    }

    async patchDefaultItem(oid, grantorId, rules) {
        const url = `${this.url.replace('/objclass', '/acl/objclass')}/${oid}/grantor/${grantorId}`;
        try {
            await instance.patch(url, rules);
        } catch (err) {
            throw err;
        }
    }

    async toggleObjclassDefaultMode(oid, grantorId, rule) {
        const url = `${this.url.replace('/objclass', '/acl/objclass')}/${oid}/grantor/${grantorId}`;
        try {
            await instance.patch(url, [rule]);
        } catch (err) {
            throw err;
        }
    }
}
