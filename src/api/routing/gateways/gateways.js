import instance from '@/api/instance';
import {objSnakeToCamel} from "../../utils/caseConverters";
import sanitizer from "../../utils/sanitizer";
import eventBus from "../../../utils/eventBus";

const BASE_URL = '/sip/gateways';
const fieldsToSend = ['name', 'proxy', 'id', 'host', 'ipacl', 'account', 'account', 'username', 'expires',
    'account', 'registrar', 'register', 'password'];

export async function getGatewayList(page = 0, size = 10, search) {
    const defaultObject = {  // default object prototype, to merge response with it to get all fields
        _isSelected: false,
        name: '',
        proxy: '',
        enable: false,
        id: 0
    };

    // let url = `${BASE_URL}?page=${page}size=${size}`;
    let url = `${BASE_URL}?size=${size}`;
    if (search) url += `&name=${search}*`;

    try {
        let response = await instance.get(url);
        response.data = objSnakeToCamel(response.data);
        if (!response.data.items) response.data.items = [];

        return response.data.items.map(item => {
            return {...defaultObject, ...item};
        });
    } catch (error) {
        throw error;
    }
};

export async function getGateway(id) {
    const url = BASE_URL + '/' + id;

    try {
        let response = await instance.get(url);
        if (response.data.item.register) {
            return coerceRegisterResponse(response);
        } else {
            return coerceTrunkingResponse(response);
        }
    } catch (error) {
        throw error;
    }
};

export const addGateway = async (item) => {
    if (item.register) item.account = item.accountName + '@' + (item.domain || item.registrar);
    sanitizer(item, fieldsToSend);
    Object.keys(item).forEach(key => {
        if (!item[key]) delete item[key];
    });

    try {
        const response = await instance.post(BASE_URL, {item});
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateGateway = async (id, item) => {
    const url = BASE_URL + '/' + id;

    if (!item.register) {
        item.ipacl.forEach(acl => {
            if (!acl.port) delete acl.port
        });
    }

    sanitizer(item, fieldsToSend);

    try {
        const response = await instance.put(url, {changes: item});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const deleteGateway = async (id) => {
    const url = BASE_URL + '/' + id;

    try {
        const response = await instance.delete(url);
    } catch (err) {
        throw err;
    }
};

const coerceTrunkingResponse = (response) => {
    const defaultObject = {
        name: '',
        proxy: '',
        description: '',
        id: 0,
        host: '',
        schema: '',
        _dirty: false,
    };

    const defaultIPacl = {
        ip: '',
        proto: 'any',
        port: null,
    };

    response = {...defaultObject, ...response.data.item};
    response.ipacl.forEach((acl, index) => {
        response.ipacl[index] = {...defaultIPacl, ...acl};
    });

    return response;
};

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
        schema: '',
        id: 0,
        _dirty: false,
    };

    let result = Object.assign({}, defaultObject, response.data.item);

    result.account = result.account.replace('sip:', '');
    result.registrar = result.registrar.replace('sip:', '');

    const account = result.account.split('@');
    result.accountName = account[0];
    result.domain = account[1];
    delete result.account;

    if (!result.proxy) result.proxy = result.registrar;

    return result;
};