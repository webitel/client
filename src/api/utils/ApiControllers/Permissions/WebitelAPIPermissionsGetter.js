import instance from '../../../instance';


export default class WebitelAPIPermissionsGetter {
    constructor(url) {
        this.url = url;
    }

    async getList(id, page, size, search) {
        let url = `${this.url}/${id}/acl`;
        if (size) url += `?size=${size}`;
        if (page) url += `&page=${page}`;
        if (search && search.slice(-1) !== '*') search += '*';
        if (search) url += `&name=${search}`;

        try {
            const response = await instance.get(url);            
            const getName = (value) => {
                switch (value) {
                    case 1:
                        return 'Forbidden';
                    case 2:
                        return 'Allow';
                    case 3:
                        return 'Allow with delegation';
                    default:
                        return '';
                }
            };
            let formattedResponse = [];
            if (response.items) {
                // format response before assignment
                formattedResponse = response.items.map((item) => ({
                        grantee: {
                            id: item.grantee.id,
                            name: item.grantee.name,
                        },
                        access: {
                            c: {
                                id: ((item.granted.match(/x/g) || []).length + 1),
                                name: getName((item.granted.match(/x/g) || []).length + 1),
                                rule: 'c'.repeat((item.granted.match(/x/g) || []).length),
                            },
                            r: {
                                id: ((item.granted.match(/r/g) || []).length + 1),
                                name: getName((item.granted.match(/r/g) || []).length + 1),
                                rule: 'r'.repeat((item.granted.match(/r/g) || []).length),
                            },
                            w: {
                                id: ((item.granted.match(/w/g) || []).length + 1),
                                name: getName((item.granted.match(/w/g) || []).length + 1),
                                rule: 'w'.repeat((item.granted.match(/w/g) || []).length),
                            },
                            d: {
                                id: ((item.granted.match(/d/g) || []).length + 1),
                                name: getName((item.granted.match(/d/g) || []).length + 1),
                                rule: 'd'.repeat((item.granted.match(/d/g) || []).length),
                            },
                        },                        
                    }));
            }
            
            return { list: formattedResponse, next: response.next };         
        } catch (err) {
            throw err;
        }
    }
}
