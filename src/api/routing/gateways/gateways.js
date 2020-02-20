import instance from '../../instance';
import sanitizer from "../../utils/sanitizer";
import eventBus from "../../../utils/eventBus";
import deepCopy from 'deep-copy';
import {
    WebitelAPIItemCreator, WebitelAPIItemDeleter,
    WebitelAPIItemGetter,
    WebitelAPIItemUpdater,
    WebitelAPIListGetter
} from "../../utils/apiControllers";

const BASE_URL = '/sip/gateways';
const fieldsToSend = ['name', 'proxy', 'id', 'host', 'ipacl', 'account', 'account', 'username', 'expires',
    'account', 'registrar', 'register', 'password', 'schema', 'enable'];

const defaultListItem = {  // default object prototype, to merge response with it to get all fields
    _isSelected: false,
    name: '',
    proxy: '',
    enable: false,
    id: 0
};

const listGetter = new WebitelAPIListGetter(BASE_URL, defaultListItem);
const itemGetter = new WebitelAPIItemGetter(BASE_URL);
const itemCreator = new WebitelAPIItemCreator(BASE_URL, fieldsToSend);
const itemUpdater = new WebitelAPIItemUpdater(BASE_URL, fieldsToSend);
const itemDeleter = new WebitelAPIItemDeleter(BASE_URL);

itemGetter.responseHandler = (response) => {
    if (response.item.register) {
        return coerceRegisterResponse(response);
    } else {
        return coerceTrunkingResponse(response);
    }
};

export async function getGatewayList(page = 0, size = 10, search) {
    return await listGetter.getList({page, size, search});
};

export async function getGateway(id) {
    return await itemGetter.getItem(id);
};

export const addGateway = async (item) => {
    let itemCopy = deepCopy(item);
    if (itemCopy.register)
    {
        itemCopy.account = itemCopy.accountName + '@' + (item.domain || item.registrar);
    }
    Object.keys(itemCopy).forEach(key => {
        if (!itemCopy[key]) delete itemCopy[key];
    });
    return await itemCreator.createItem(itemCopy);
};

export const updateGateway = async (id, item) => {
    let itemCopy = deepCopy(item);

    if (!itemCopy.register) {
        itemCopy.ipacl.forEach(acl => {
            if (!acl.port) delete acl.port
        });
    } else {
        itemCopy.account = itemCopy.accountName + '@' + (item.domain || item.registrar);
    }
    return await itemUpdater.updateItem(id, itemCopy);
};

export const deleteGateway = async (id) => {
    return await itemDeleter.deleteItem(id);
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