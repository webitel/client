import {WebitelAPIItemDeleter} from "../../utils/ApiControllers/Deleter/ApiDeleter";
import {WebitelAPIItemPatcher} from "../../utils/ApiControllers/Patcher/ApiPatcher";
import {WebitelAPIItemUpdater} from "../../utils/ApiControllers/Updater/ApiUpdater";
import {WebitelAPIItemCreator} from "../../utils/ApiControllers/Creator/ApiCreator";
import {WebitelAPIItemGetter} from "../../utils/ApiControllers/Getter/ApiGetter";
import {WebitelAPIListGetter} from "../../utils/ApiControllers/ListGetter/ApiListGetter";

const BASE_URL = '/users';
const fieldsToSend = ['name', 'username', 'password', 'extension', 'status', 'dnd', 'roles', 'license', 'devices',
    'profile', 'profile', 'email'];

const defaultListItem = {
    _isSelected: false,
    name: 'Username undefined',
    status: 'Status is undefined',
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
    variables: [
        {key: '', value: ''}
    ],
    _dirty: false,
};

const preRequestHandler = (item) => {
    if (item.roles) item.roles.forEach(item => delete item.text);
    if (item.devices) item.devices.forEach(item => delete item.text);
    if (item.license) item.license = item.license.map(item => {
        return {id: item.id}
    });
    item.profile = {};
    if (item.variables) {
        item.variables.forEach(variable => {
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

itemGetter.responseHandler = (response) => {
    let user = {...defaultItem, ...response};
    if (user.license) user.license.forEach(item => {
        item.name = item.prod
    });
    if (user.profile) {
        user.variables = Object.keys(user.profile).map(key => {
            return {
                key,
                value: user.profile[key],
            }
        });
    } else {
        user.variables = [{key: '', value: ''}];
    }
    return user;
};

export async function getUsersList(page, size, search) {
    return await listGetter.getList({page, size, search});
}

export async function getUser(id) {
    return await itemGetter.getItem(id);
}

export const addUser = async (item) => {
    return await itemCreator.createItem(item);
};

export const updateUser = async (id, item) => {
    return await itemUpdater.updateItem(id, item);
};

export const patchUser = async (id, item) => {
    return await itemPatcher.patchItem(id, item);
};

export const deleteUser = async (id) => {
    return await itemDeleter.deleteItem(id);
};