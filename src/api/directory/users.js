import instance from '@/api/instance';
import sanitizer from "../utils/sanitizer";
import eventBus from "../../utils/eventBus";

const BASE_URL = '/users';
const fieldsToSend = ['name', 'username', 'password', 'extension', 'status', 'dnd', 'roles', 'license', 'devices',
    'profile', 'profile'];

export async function getUsersList(size = 100, search) {
    const defaultObject = {  // default object prototype, to merge response with it to get all fields
        _isSelected: false,
        name: 'Username undefined',
        username: 'Username undefined',
        status: 'Status is undefined',
        state: true,
        dnd: false,
        id: 0
    };

    let url = BASE_URL + `?size=${size}`;
    if (search) url += `&name=${search}*`;

    try {
        let response = await instance.get(url);
        if (!response.data.users) response.data.users = [];

        return response.data.users.map(item => {
            return Object.assign({}, defaultObject, item);
        });
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
        roleAdmin: [],
        license: null,
        devices: [],
        variables: [
            {key: '', value: ''}
        ],
        _dirty: false,
    };
    try {
        const response = await instance.get(url);
        let user = {...defaultObject, ...response.data.user};
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
    item.roles.forEach(item => delete item.text);
    item.devices.forEach(item => delete item.text);
    item.profile = {};
    item.variables.forEach(variable => {
        item.profile[variable.key] = variable.value;
    });
    sanitizer(item, fieldsToSend);
    try {
        const response = await instance.post(BASE_URL, {user: item});
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.user.id;
    } catch (err) {
        throw err;
    }
};

export const updateUser = async (id, {...item}) => {
    const url = BASE_URL + '/' + id;
    item.roles.forEach(item => delete item.text);
    item.devices.forEach(item => delete item.text);
    item.profile = {};
    item.variables.forEach(variable => {
        item.profile[variable.key] = variable.value;
    });
    sanitizer(item, fieldsToSend);
    try {
        await instance.put(url, {user: item});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const patchUser = async (id, user) => {
    const url = BASE_URL + '/' + id;
    try {
        await instance.patch(url, {user});
    } catch (err) {
        throw err;
    }
};

export const deleteUser = async (id) => {
    const url = BASE_URL + '/' + id;
    try {
        await instance.delete(url);
    } catch (err) {
        throw err;
    }
};