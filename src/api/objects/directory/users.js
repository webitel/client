import instance from '@/api/instance';
import sanitizer from "../../sanitizer";

const BASE_URL = '/users';
const fieldsToSend = ['name', 'username', 'password', 'extension', 'status', 'dnd', 'roles', 'license', 'devices',
    'profile'];

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
    if(search) url += `&name=${search}*`;

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
    };
    try {
        const response = await instance.get(url);
        let user = {...defaultObject, ...response.data.user};
        if (user.variables && user.variables.length) {
            user.variables = user.variables.map(item => {
                 return {
                    key: Object.keys(item)[0],
                    value: Object.values(item)[0],
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
    sanitizer(item, fieldsToSend);
    item.roles.forEach(item => delete item.text);
    item.devices.forEach(item => delete item.text);

    try {
        await instance.post(BASE_URL, {user: item});
    } catch (err) {
        throw err;
    }
};

export const updateUser = async (id, item) => {
    const url = BASE_URL + '/' + id;
    sanitizer(item, fieldsToSend);
    item.roles.forEach(item => delete item.text);
    item.devices.forEach(item => delete item.text);
    try {
        await instance.put(url, {user: item});
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