import deepCopy from 'deep-copy';
import WebitelAPIPermissionsGetter from '../../utils/ApiControllers/Permissions/WebitelAPIPermissionsGetter';
import WebitelAPIPermissionsPatcher from '../../utils/ApiControllers/Permissions/WebitelAPIPermissionsPatcher';
import { WebitelAPIItemDeleter } from '../../utils/ApiControllers/Deleter/ApiDeleter';
import { WebitelAPIItemPatcher } from '../../utils/ApiControllers/Patcher/ApiPatcher';
import { WebitelAPIItemUpdater } from '../../utils/ApiControllers/Updater/ApiUpdater';
import { WebitelAPIItemCreator } from '../../utils/ApiControllers/Creator/ApiCreator';
import { WebitelAPIItemGetter } from '../../utils/ApiControllers/Getter/ApiGetter';
import { WebitelAPIListGetter } from '../../utils/ApiControllers/ListGetter/ApiListGetter';
import instance from '../../instance';

const BASE_URL = '/users';
const fieldsToSend = ['name', 'username', 'password', 'extension', 'status', 'note', 'roles', 'license', 'devices', 'device',
    'profile', 'profile', 'email'];

const defaultListItem = {
    _isSelected: false,
    name: '',
    status: '',
    state: true,
    dnd: false,
};

const defaultItem = {
    name: '',
    username: '',
    password: '',
    extension: '',
    roles: [],
    license: [],
    devices: [],
    device: {},
    variables: [
        { key: '', value: '' },
    ],
    _dirty: false,
};

const defaultTokensItem = {
    token: '',
    usage: '',
};

const preRequestHandler = (item) => {
    if (item.device && !item.device.id) delete item.device;
    if (item.roles) item.roles.forEach((item) => delete item.text);
    if (item.devices) item.devices.forEach((item) => delete item.text);
    if (item.license) { item.license = item.license.map((item) => ({ id: item.id })); }
    item.profile = {};
    if (item.variables) {
        item.variables.forEach((variable) => {
            item.profile[variable.key] = variable.value;
        });
    }
    return item;
};

const listGetter = new WebitelAPIListGetter(BASE_URL, defaultListItem);
const itemGetter = new WebitelAPIItemGetter(BASE_URL, defaultItem);
const itemCreator = new WebitelAPIItemCreator(BASE_URL, fieldsToSend, preRequestHandler);
const itemUpdater = new WebitelAPIItemUpdater(BASE_URL, fieldsToSend, preRequestHandler);
const itemPatcher = new WebitelAPIItemPatcher(BASE_URL, fieldsToSend);
const itemDeleter = new WebitelAPIItemDeleter(BASE_URL);
const permissionsGetter = new WebitelAPIPermissionsGetter(BASE_URL);
const permissionsPatcher = new WebitelAPIPermissionsPatcher(BASE_URL);

itemGetter.responseHandler = (response) => {
    const user = { ...defaultItem, ...response };
    if (user.license) {
 user.license.forEach((item) => {
        item.name = item.prod;
    });
}
    if (user.profile) {
        user.variables = Object.keys(user.profile).map((key) => ({
                key,
                value: user.profile[key],
            }));
    } else {
        user.variables = [{ key: '', value: '' }];
    }
    return user;
};

export async function getUsersList(page, size, search) {
    return await listGetter.getList({ page, size, search });
}

export async function getUser(id) {
    return await itemGetter.getItem(id);
}

export const addUser = async (item) => await itemCreator.createItem(item);

export const updateUser = async (id, item) => await itemUpdater.updateItem(id, item);

export const patchUser = async (id, item) => await itemPatcher.patchItem(id, item);

export const deleteUser = async (id) => await itemDeleter.deleteItem(id);

export async function getTokens(id, page = 1, size = 10, search) {
    const getTokensUrl = `${BASE_URL}/${id}/tokens`;
    if (search && search.slice(-1) !== '*') search += '*';
    let url = `${getTokensUrl}?size=${size}&page=${page}`;
    if (search) url += `&name=${search}`;

    try {
        const response = await instance.get(url);
        return {
            list: response.items || [],
            next: response.next || false,
        };
    } catch (err) {
        throw err;
    }
}

export async function addToken(userId, item) {
    const url = `${BASE_URL}/${userId}/tokens`;
    const itemCopy = deepCopy(item);
    delete itemCopy.token;
    try {
        const response = await instance.post(url, itemCopy);
        return response;
    } catch (err) {
        throw err;
    }
}

export async function deleteToken(userId, id) {
    const url = `${BASE_URL}/${userId}/tokens/${id}`;
    try {
        const response = await instance.delete(url);
        return response;
    } catch (err) {
        throw err;
    }
}

export const getUserPermissions = async (id, page = 1, size = 10, search) => await permissionsGetter.getList(id, size, search);

export const patchUserPermissions = async (id, item) => await permissionsPatcher.patchItem(id, item);
