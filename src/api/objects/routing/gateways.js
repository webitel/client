import instance from '@/api/instance';

const BASE_URL = '/sip/gateways';

export async function getGatewayList() {
    const defaultObject = {  // default object prototype, to merge response with it to get all fields
        name: '',
        proxy: '',
        enable: false,
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

    try {
        let response = await instance.get(url);
        console.log(response);
        if(response.data.item.register) {
            return coerceRegisterResponse(response);
        } else {
            return coerceTrunkingResponse(response);
        }
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

function coerceTrunkingResponse(response) {
    const defaultObject = {
        name: '',
        proxy: '',
        description: '',
        id: 0,
        host: '',
        ipacl: [{
            ip: '',
            proto: '',
            port: ''
        }],
    };

    return Object.assign({}, defaultObject, response.data.item);
}

function coerceRegisterResponse(response) {
    const defaultObject = {  // default object prototype, to merge response with it to get all fields
        name: '',
        registrar: '',
        expires: 600,
        password: '',
        description: '',
        username: '',
        accountName: '',
        proxy: '',
        domain: '',
        id: 0,
    };

    let result = Object.assign({}, defaultObject, response.data.item);

    const account = result.account.split('@');
    result.accountName = account[0];
    result.domain = account[1];
    delete result.account;

    if(!result.proxy) result.proxy = result.registrar;

    return result;
}