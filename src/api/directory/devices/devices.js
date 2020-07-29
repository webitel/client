import deepCopy from 'deep-copy';
import instance from '../../instance';
import WebitelAPIPermissionsGetter from '../../utils/ApiControllers/Permissions/WebitelAPIPermissionsGetter';
import WebitelAPIPermissionsPatcher from '../../utils/ApiControllers/Permissions/WebitelAPIPermissionsPatcher';
import { WebitelAPIItemDeleter } from '../../utils/ApiControllers/Deleter/ApiDeleter';
import { WebitelAPIItemUpdater } from '../../utils/ApiControllers/Updater/ApiUpdater';
import { WebitelAPIItemCreator } from '../../utils/ApiControllers/Creator/ApiCreator';
import { WebitelAPIItemGetter } from '../../utils/ApiControllers/Getter/ApiGetter';
import { WebitelAPIListGetter } from '../../utils/ApiControllers/ListGetter/ApiListGetter';


const BASE_URL = '/devices';
const fieldsToSend = ['name', 'account', 'password', 'user',
     'mac', 'ip', 'brand', 'model', 'hotdesks', 'hotdesk',
];

const defaultListItem = { // default object prototype, to merge response with it to get all fields
    _isSelected: false,
    name: '',
    account: '',
    user: { name: '' },
    state: 0,
    id: 0,
};

const defaultItem = { // default object prototype, to merge response with it to get all fields
    name: '',
    account: '',
    user: { name: '' },
    state: 0,
    id: 0,
    hotdesks: [],
    hotdesk: false,
    password: '',
    phone: {},
    brand: '',
    model: '',
    _dirty: false,
};

const preRequestHandler = (item) => {
    if (item.hotdesks) {
        item.hotdesks = item.hotdesks.map((item) => item.name || item.text);
    }
    if (!item.password) delete item.password;
    return item;
};

const listGetter = new WebitelAPIListGetter(BASE_URL, defaultListItem);
const itemGetter = new WebitelAPIItemGetter(BASE_URL, defaultItem);
const itemCreator = new WebitelAPIItemCreator(BASE_URL, fieldsToSend, preRequestHandler);
const itemUpdater = new WebitelAPIItemUpdater(BASE_URL, fieldsToSend, preRequestHandler);
const itemDeleter = new WebitelAPIItemDeleter(BASE_URL);
const permissionsGetter = new WebitelAPIPermissionsGetter(BASE_URL);
const permissionsPatcher = new WebitelAPIPermissionsPatcher(BASE_URL);

itemGetter.responseHandler = (response) => {
    try {
        if (response.hotdesks) {
            response.hotdesks = response.hotdesks.map((item) => ({ name: item }));
        }
        return { ...defaultItem, ...response };
    } catch (err) {
        throw err;
    }
};

export async function getDeviceList(page, size, search) {
    return listGetter.getList({ page, size, search });
}

export async function getDevice(id) {
    return itemGetter.getItem(id);
}

export const addDevice = async (item) => {
    const itemCopy = deepCopy(item);
    return itemCreator.createItem(itemCopy);
};

export const updateDevice = async (id, item) => {
    const itemCopy = deepCopy(item);
    return itemUpdater.updateItem(id, itemCopy);
};

export const deleteDevice = async (id) => await itemDeleter.deleteItem(id);

export const getDeviceHistory = async (id, date, page = 0) => {
    const url = `${BASE_URL}/${id}/users/audit?time_from=${date}`;
    const defaultObject = {
        loggedIn: '0',
        loggedOut: '0',
        user: {},
    };

    try {
        const response = await instance.get(url);
        if (response.items) {
            return response.items.map((item) => ({ ...defaultObject, ...item }));
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getDevicePermissions = async (id, page = 0, size = 10, search) => await permissionsGetter.getList(id, size, search);

export const patchDevicePermissions = async (id, item) => await permissionsPatcher.patchItem(id, item);