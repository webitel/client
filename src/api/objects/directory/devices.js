import instance from '@/api/instance';
import {objSnakeToCamel} from "../../caseConverters";

const BASE_URL = '/devices';

export async function getDeviceList(size = 100, search) {
    const defaultObject = {  // default object prototype, to merge response with it to get all fields
        isSelected: false,
        name: 'name undefined',
        account: 'auth id undefined',
        user: {name: 'user undefined'},
        state: 0,
        id: 0
    };

    let url = BASE_URL + `?size=${size}`;
    if (search) url += `&name=${search}*`;

    try {
        let response = await instance.get(url);
        if (!response.data.devices) response.data.devices = [];

        return response.data.devices.map(item => {
            return Object.assign({}, defaultObject, item);
        });
    } catch (error) {
        throw error;
    }
}

export async function getDevice(id) {
    const url = BASE_URL + '/' + id;

    try {
        let response = await instance.get(url);
        console.log(response);
    } catch (error) {
        throw error;
    }
}

export const addDevice = async (item) => {
    item = {};


    // Object.keys(item).forEach(key => {
    //     if(!item[key]) delete item[key];
    // });
    // item.account = item.username;
    // delete item.username;
    // delete item.description;

    try {
        const response = await instance.post(BASE_URL, item);
    } catch (err) {
        throw err;
    }
};

export const updateDevice = async (id, changes) => {
    const url = BASE_URL + '/' + id;

    changes = {};

    try {
        const response = await instance.put(url, changes);
    } catch (err) {
        throw err;
    }
};

export const patchDevice = async (id, user) => {
    const url = BASE_URL + '/' + id;

    try {
        await instance.patch(url, {user});
    } catch (err) {
        throw err;
    }
};

export const deleteDevice = async (id) => {
    const url = BASE_URL + '/' + id;

    try {
        await instance.delete(url);
    } catch (err) {
        throw err;
    }
};

export const getDeviceHistory = async (id, date) => {
    const url = BASE_URL + '/' + id + '/users/audit?time_from=' + date;
    const defaultObject = {
        loggedIn: 'unknown',
        loggedOut: 'currently active',
        user: {name: 'unknown user'}
    };


    try {
        let response = await instance.get(url);
        response.data = objSnakeToCamel(response.data);
        if (!response.data.auditLogs) {
            response.data.auditLogs = [];
        }

        return response.data.auditLogs.map(item => {
            return Object.assign({}, defaultObject, item);
        });
    } catch (err) {
        throw err;
    }
};