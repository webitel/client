import deepCopy from 'deep-copy';
import { WebitelAPIItemPatcher } from '../../utils/ApiControllers/Patcher/ApiPatcher';
import { WebitelAPIItemDeleter } from '../../utils/ApiControllers/Deleter/ApiDeleter';
import { WebitelAPIItemUpdater } from '../../utils/ApiControllers/Updater/ApiUpdater';
import { WebitelAPIItemCreator } from '../../utils/ApiControllers/Creator/ApiCreator';
import { WebitelAPIItemGetter } from '../../utils/ApiControllers/Getter/ApiGetter';
import { WebitelAPIListGetter } from '../../utils/ApiControllers/ListGetter/ApiListGetter';
import sanitizer from '../../utils/sanitizer';
import instance from '../../instance';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';


const BASE_URL = '/sip/gateways';
const fieldsToSend = ['name', 'proxy', 'id', 'host', 'ipacl', 'account', 'account', 'username', 'expires',
    'account', 'registrar', 'register', 'password', 'schema', 'enable'];

const defaultListItem = { // default object prototype, to merge response with it to get all fields
    _isSelected: false,
    name: '',
    proxy: '',
    enable: false,
    id: 0,
};

const preRequestHandler = (item) => {
    if (item.register) {
        item.account = `${item.accountName}@${item.domain || item.registrar}`;
    }
    Object.keys(item).forEach((key) => {
        if (!item[key]) delete item[key];
    });
    return item;
};

const listGetter = new WebitelAPIListGetter(BASE_URL, defaultListItem);
const itemGetter = new WebitelAPIItemGetter(BASE_URL);
const itemCreator = new WebitelAPIItemCreator(BASE_URL, fieldsToSend, preRequestHandler);
const itemUpdater = new WebitelAPIItemUpdater(BASE_URL, fieldsToSend, preRequestHandler);
const itemPatcher = new WebitelAPIItemUpdater(BASE_URL, fieldsToSend);
const itemDeleter = new WebitelAPIItemDeleter(BASE_URL);

itemGetter.responseHandler = (response) => {
    if (response.register) {
        return coerceRegisterResponse(response);
    }
        return coerceTrunkingResponse(response);
};

export async function getGatewayList(page = 0, size = 10, search) {
    return await listGetter.getList({ page, size, search });
}

export async function getGateway(id) {
    return await itemGetter.getItem(id);
}

export const addGateway = async (item) => await itemCreator.createItem(item);

export const updateGateway = async (id, item) => await itemUpdater.updateItem(id, item);

export async function patchGateway(id, item) {
    const patchUrl = `${BASE_URL}/${id}`;
    try {
        const response = await instance.patch(patchUrl, item);
        eventBus.$emit('notificationInfo', 'Successfully updated');
    } catch (err) {
        throw err;
    }
}

export const deleteGateway = async (id) => await itemDeleter.deleteItem(id);

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

    response = { ...defaultObject, ...response };
    response.ipacl.forEach((acl, index) => {
        response.ipacl[index] = { ...defaultIPacl, ...acl };
    });

    return response;
};

const coerceRegisterResponse = (response) => {
    const defaultObject = { // default object prototype, to merge response with it to get all fields
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

    const result = { ...defaultObject, ...response };

    result.account = result.account.replace('sip:', '');
    result.registrar = result.registrar.replace('sip:', '');

    const account = result.account.split('@');
    result.accountName = account[0];
    result.domain = account[1];
    delete result.account;

    if (!result.proxy) result.proxy = result.registrar;

    return result;
};
