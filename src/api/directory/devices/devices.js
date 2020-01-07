import instance from '@/api/instance';
import {objSnakeToCamel} from "../../utils/caseConverters";
import sanitizer from "../../utils/sanitizer";
import eventBus from "../../../utils/eventBus";

const BASE_URL = '/devices';
const fieldsToSend = ['name', 'account', 'password', 'mac', 'ip', 'vendor', 'model'];

export async function getDeviceList(page = 0, size = 100, search) {
    const defaultObject = {  // default object prototype, to merge response with it to get all fields
        _isSelected: false,
        name: 'name undefined',
        account: 'auth id undefined',
        user: {name: 'user undefined'},
        state: 0,
        id: 0
    };

    // let url = BASE_URL + `?page=${page}size=${size}`;
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

    const defaultObject = {  // default object prototype, to merge response with it to get all fields
        name: 'name undefined',
        account: 'auth id undefined',
        user: {name: 'user undefined'},
        state: 0,
        id: 0,
        _dirty: false,
    };
    try {
        let response = await instance.get(url);
        response.data.device.mac = response.data.device.mac.toUpperCase();
        return Object.assign({}, defaultObject, response.data.device);
    } catch (error) {
        throw error;
    }
}

export const addDevice = async (device) => {
    sanitizer(device, fieldsToSend);
    try {
        const response = await instance.post(BASE_URL, {device});
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.device.id;
    } catch (err) {
        throw err;
    }
};

export const updateDevice = async (id, device) => {
    const url = BASE_URL + '/' + id;
    sanitizer(device, fieldsToSend);

    try {
        const response = await instance.put(url, {device});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
        return response.data.device.id;
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
    const url = BASE_URL + '/' + id + '?permanent=true';

    try {
        await instance.delete(url);
    } catch (err) {
        throw err;
    }
};

export const getDeviceHistory = async (id, date, page = 0) => {
    const url = `${BASE_URL}/${id}/users/audit?time_from=${date}`;
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