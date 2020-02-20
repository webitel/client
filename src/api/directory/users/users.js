import instance from '../../instance';
import sanitizer from "../../utils/sanitizer";
import eventBus from "../../../utils/eventBus";
import deepCopy from "deep-copy";
import {
    WebitelAPIItemCreator, WebitelAPIItemDeleter,
    WebitelAPIItemGetter,
    WebitelAPIItemUpdater,
    WebitelAPIListGetter
} from "../../utils/apiControllers";
import {ur} from "vuejs-datepicker/dist/locale";

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

const listGetter = new WebitelAPIListGetter(BASE_URL, defaultListItem);
const itemGetter = new WebitelAPIItemGetter(BASE_URL, defaultItem);
const itemCreator = new WebitelAPIItemCreator(BASE_URL, fieldsToSend);
const itemUpdater = new WebitelAPIItemUpdater(BASE_URL, fieldsToSend);
const itemDeleter = new WebitelAPIItemDeleter(BASE_URL);

itemGetter.responseHandler = (response) => {
    let user = {...defaultItem, ...response.user};
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
    let itemCopy = deepCopy(item);
    if (itemCopy.roles) itemCopy.roles.forEach(item => delete item.text);
    if (itemCopy.devices) itemCopy.devices.forEach(item => delete item.text);
    if (itemCopy.license) itemCopy.license = itemCopy.license.map(item => {
        return {id: item.id}
    });
    itemCopy.profile = {};
    if (itemCopy.variables) {
        itemCopy.variables.forEach(variable => {
            itemCopy.profile[variable.key] = variable.value;
        });
    }
    return await itemCreator.createItem(itemCopy);
};

export const updateUser = async (id, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.roles.forEach(item => delete item.text);
    itemCopy.devices.forEach(item => delete item.text);
    itemCopy.license = itemCopy.license.map(item => {
        return {id: item.id}
    });
    itemCopy.profile = {};
    itemCopy.variables.forEach(variable => {
        itemCopy.profile[variable.key] = variable.value;
    });
    return await itemUpdater.updateItem(id, itemCopy);
};

export const patchUser = async (id, user) => {
    const url = BASE_URL + '/' + id;
    try {
        await instance.patch(url, {user});
        eventBus.$emit('notificationInfo', 'Successfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteUser = async (id) => {
    return await itemDeleter.deleteItem(id);
};