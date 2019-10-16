import instance from '@/api/instance';

const BASE_URL = '/sip/gateways';

export async function getGatewayList() {
    const defaultObject = {  // default object prototype, to merge response with it to get all fields
        name: '',
        proxy: '',
        enable: false,
        status: 'unknown',
        id: 0
    };

    try {
        let response = await instance.get(BASE_URL+'?size=20');
        if (!response.data.items) response.data.items = [];

        return response.data.items.map(item => {
            return Object.assign({}, defaultObject, item);
        });
    } catch (error) {
        throw error;
    }
}

export async function getGateway(id) {
    const url = BASE_URL + '/' + id;

    const defaultObject = {  // default object prototype, to merge response with it to get all fields
        name: '',
        proxy: '',
        enable: false,
        status: 'unknown',
        id: 0
    };

    try {
        let response = await instance.get(url);
        console.log(response);

        return Object.assign({}, defaultObject, response.data.item);
    } catch (error) {
        throw error;
    }
}

export async function addGateway(item) {
    // const item = {item};
    Object.keys(item).forEach(key => {
        if(!item[key]) delete item[key];
    });
    item.account = item.username;
    delete item.username;

    try {
        const response = await instance.post(BASE_URL, {item});
    } catch (err) {
        throw err;
    }
}

export async function updateGateway(id, gatewayToSend) {
    const url = BASE_URL + '/' + id;
    delete gatewayToSend.status;
    gatewayToSend.ipacl.forEach(acl => {
        if(!acl.port) delete acl.port
    });

    try {
        const response = await instance.put(url, {changes: gatewayToSend});
    } catch (err) {
        // console.log(err);
        throw err;
    }
}

export async function deleteGateway(id) {
    const url = BASE_URL + '/' + id;

    try {
        const response = await instance.delete(url);
    } catch (err) {
        throw err;
    }
}