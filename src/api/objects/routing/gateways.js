import instance from '@/api/instance';
import {objSnakeToCamel} from "../../caseConverters";

const BASE_URL = '/sip/gateways';

export async function getGatewayList(size = 10, search) {
    const defaultObject = {  // default object prototype, to merge response with it to get all fields
        isSelected: false,
        name: '',
        proxy: '',
        enable: false,
        id: 0
    };

    let url = BASE_URL + `?size=${size}`;
    if (search) url += `&name=${search}*`;

    try {
        let response = await instance.get(url);
        response.data = objSnakeToCamel(response.data);
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
        // console.log(response);
        if(response.data.item.register) {
            return coerceRegisterResponse(response);
        } else {
            return coerceTrunkingResponse(response);
        }
    } catch (error) {
        throw error;
    }
}

export const addGateway = async (item) => {

    Object.keys(item).forEach(key => {
        if(!item[key]) delete item[key];
    });
    item.account = item.username;
    delete item.username;
    delete item.description;

    try {
        const response = await instance.post(BASE_URL, {item});
    } catch (err) {
        throw err;
    }
}

export const updateGateway = async (id, changes) => {
    const url = BASE_URL + '/' + id;

    if(!changes.register) {
        changes.ipacl.forEach(acl => {
            if(!acl.port) delete acl.port
        });
    }

    delete changes.description;

    try {
        const response = await instance.put(url, {changes});
    } catch (err) {
        throw err;
    }
}

export const deleteGateway = async (id) => {
    const url = BASE_URL + '/' + id;

    try {
        const response = await instance.delete(url);
    } catch (err) {
        throw err;
    }
}

const coerceTrunkingResponse = (response) => {
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

const coerceRegisterResponse = (response) => {
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

    result.account = result.account.replace('sip:', '');
    result.registrar = result.registrar.replace('sip:', '');

    const account = result.account.split('@');
    result.accountName = account[0];
    result.domain = account[1];
    delete result.account;

    if(!result.proxy) result.proxy = result.registrar;

    return result;
};