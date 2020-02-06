import instance from '../../instance';
import sanitizer from "../../utils/sanitizer";
import eventBus from "../../../utils/eventBus";
import deepCopy from 'deep-copy';

const BASE_URL = '/sip/gateways';
const fieldsToSend = ['name', 'proxy', 'id', 'host', 'ipacl', 'account', 'account', 'username', 'expires',
    'account', 'registrar', 'register', 'password', 'schema', 'enable'];

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
        if (response.items) {
            return response.items.map(item => {
                return {...defaultObject, ...item};
            });
        }
        return [];
    } catch (error) {
        throw error;
    }
};

export async function getGateway(id) {
    const url = BASE_URL + '/' + id;

    try {
        let response = await instance.get(url);
        if (response.item.register) {
            return coerceRegisterResponse(response);
        } else {
            return coerceTrunkingResponse(response);
        }
    } catch (error) {
        throw error;
    }
};

export const addGateway = async (item) => {
    let itemCopy = deepCopy(item);
    if (itemCopy.register) itemCopy.account = itemCopy.accountName + '@' + (item.domain || item.registrar);
    sanitizer(itemCopy, fieldsToSend);
    Object.keys(itemCopy).forEach(key => {
        if (!itemCopy[key]) delete itemCopy[key];
    });

    try {
        const response = await instance.post(BASE_URL, {item: itemCopy});
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const updateGateway = async (id, item) => {
    const url = BASE_URL + '/' + id;
    let itemCopy = deepCopy(item);

    if (!itemCopy.register) {
        itemCopy.ipacl.forEach(acl => {
            if (!acl.port) delete acl.port
        });
    }

    sanitizer(itemCopy, fieldsToSend);

    try {
        const response = await instance.put(url, {changes: itemCopy});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const deleteGateway = async (id) => {
    const url = BASE_URL + '/' + id;

    try {
        await instance.delete(url);
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
        schema: {},
        _dirty: false,
        enable: true,
    };

    const defaultIPacl = {
        ip: '',
        proto: 'any',
        port: null,
    };

    response = {...defaultObject, ...response.item};
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
        schema: {},
        id: 0,
        _dirty: false,
        enable: true,
    };

    let result = {...defaultObject, ...response.item};

    result.account = result.account.replace('sip:', '');
    result.registrar = result.registrar.replace('sip:', '');

    const account = result.account.split('@');
    result.accountName = account[0];
    result.domain = account[1];
    delete result.account;

    if (!result.proxy) result.proxy = result.registrar;

    return result;
};