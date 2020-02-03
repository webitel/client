import instance from '../../instance';
import sanitizer from "../../utils/sanitizer";
import eventBus from "../../../utils/eventBus";
import deepCopy from "deep-copy";

const BASE_URL = '/users';
const fieldsToSend = ['name', 'username', 'password', 'extension', 'status', 'dnd', 'roles', 'license', 'devices',
    'profile', 'profile', 'email'];

export async function getUsersList(page = 0, size = 100, search) {
    const defaultObject = {  // default object prototype, to merge response with it to get all fields
        _isSelected: false,
        name: 'Username undefined',
        username: 'Username undefined',
        status: 'Status is undefined',
        state: true,
        dnd: false,
        id: 0
    };

    // let url = BASE_URL + `?page=${page}size=${size}`;
    let url = BASE_URL + `?size=${size}`;
    if (search) url += `&name=${search}*`;

    try {
        let response = await instance.get(url);
        if (!response.users) {
            return response.users.map(item => {
                return {...defaultObject, ...item};
            });
        }
        return [];
    } catch (error) {
        throw error;
    }
}

export async function getUser(id) {
    const url = BASE_URL + '/' + id;
    const defaultObject = {
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
    try {
        const response = await instance.get(url);
        let user = {...defaultObject, ...response.user};
        if (user.license) user.license.forEach(item => {
            item.name = item.product
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
    } catch (error) {
        throw error;
    }
}

export const addUser = async (item) => {
    let itemCopy = deepCopy(item);
    if (itemCopy.roles) itemCopy.roles.forEach(item => delete item.text);
    if (itemCopy.devices) itemCopy.devices.forEach(item => delete item.text);
    if (itemCopy.license) itemCopy.license.forEach(item => {
        // item.product = item.name;
        delete item.text;
        // delete item.name;
    });
    itemCopy.profile = {};
    if (itemCopy.variables) {
        itemCopy.variables.forEach(variable => {
            itemCopy.profile[variable.key] = variable.value;
        });
    }
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await instance.post(BASE_URL, {user: itemCopy});
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.user.id;
    } catch (err) {
        throw err;
    }
};

export const updateUser = async (id, item) => {
    let itemCopy = deepCopy(item);
    const url = BASE_URL + '/' + id;
    itemCopy.roles.forEach(item => delete item.text);
    itemCopy.devices.forEach(item => delete item.text);
    if (itemCopy.license) itemCopy.license.forEach(item => {
        item.product = item.name;
        delete item.text;
        delete item.name;
    });
    itemCopy.profile = {};
    itemCopy.variables.forEach(variable => {
        itemCopy.profile[variable.key] = variable.value;
    });
    sanitizer(itemCopy, fieldsToSend);
    try {
        await instance.put(url, {user: itemCopy});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const patchUser = async (id, user) => {
    const url = BASE_URL + '/' + id;
    try {
        await instance.patch(url, {user});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteUser = async (id) => {
    const url = BASE_URL + '/' + id + '?permanent=true';
    try {
        await instance.delete(url);
    } catch (err) {
        throw err;
    }
};