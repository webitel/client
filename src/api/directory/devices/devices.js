import instance from '../../instance';
import sanitizer from "../../utils/sanitizer";
import eventBus from "../../../utils/eventBus";
import deepCopy from "deep-copy";

const BASE_URL = '/devices';
const fieldsToSend = ['name', 'account', 'password', 'user',
    // 'mac', 'ip', 'vendor', 'model'
];

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
        if (response.devices) {
            return response.devices.map(item => {
                return {...defaultObject, ...item};
            });
        }
        return [];
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
        // response.data.device.mac = response.data.device.mac.toUpperCase();
        return {...defaultObject, ...response.device};
    } catch (error) {
        throw error;
    }
}

export const addDevice = async (item) => {
    let itemCopy = deepCopy(item);
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await instance.post(BASE_URL, {item: itemCopy});
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.device.id;
    } catch (err) {
        throw err;
    }
};

export const updateDevice = async (id, item) => {
    const url = BASE_URL + '/' + id;
    let itemCopy = deepCopy(item);
    sanitizer(itemCopy, fieldsToSend);

    try {
        await instance.put(url, {item: itemCopy});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
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
        if (response.auditLogs) {
            return response.auditLogs.map(item => {
                return {...defaultObject, ...item};
            });
        }
        return [];
    } catch (err) {
        throw err;
    }
};