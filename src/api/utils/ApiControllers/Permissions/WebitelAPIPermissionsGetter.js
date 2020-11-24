import instance from '../../../instance';


export default class WebitelAPIPermissionsGetter{
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
            let formattedResponse = [];
            if (response.items) {
                // format response before assignment
                formattedResponse = response.items.map((item) => ({
                        grantee: {
                            id: item.grantee.id,
                            name: item.grantee.name,
                        },
                        access: {
                            x: item.granted.includes('x'),
                            r: item.granted.includes('r'),
                            w: item.granted.includes('w'),
                            d: item.granted.includes('d'),
                        },
                    }));
            }
            return formattedResponse;            
        } catch (err) {
            throw err;
        }
    }
}