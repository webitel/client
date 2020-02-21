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

const preRequestHandler = (item) => {
    if (item.register)
    {
        item.account = item.accountName + '@' + (item.domain || item.registrar);
    }
    Object.keys(item).forEach(key => {
        if (!item[key]) delete item[key];
    });
    return item;
};

const listGetter = new WebitelAPIListGetter(BASE_URL, defaultListItem);
const itemGetter = new WebitelAPIItemGetter(BASE_URL);
const itemCreator = new WebitelAPIItemCreator(BASE_URL, fieldsToSend, preRequestHandler);
const itemUpdater = new WebitelAPIItemUpdater(BASE_URL, fieldsToSend, preRequestHandler);
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
    return await itemCreator.createItem(item);
};

export const updateGateway = async (id, item) => {
    return await itemUpdater.updateItem(id, item);
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