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


const BASE_URL = '/devices';
const fieldsToSend = ['name', 'account', 'password', 'user',
    // 'mac', 'ip', 'vendor', 'model'
];

const defaultListItem = {  // default object prototype, to merge response with it to get all fields
    _isSelected: false,
    name: 'name undefined',
    account: 'auth id undefined',
    user: {name: 'user undefined'},
    state: 0,
    id: 0
};

const defaultItem = {  // default object prototype, to merge response with it to get all fields
    name: 'name undefined',
    account: 'auth id undefined',
    user: {name: 'user undefined'},
    state: 0,
    id: 0,
    _dirty: false,
};

const listGetter = new WebitelAPIListGetter(BASE_URL, defaultListItem);
const itemGetter = new WebitelAPIItemGetter(BASE_URL, defaultItem);
const itemCreator = new WebitelAPIItemCreator(BASE_URL, fieldsToSend);
const itemUpdater = new WebitelAPIItemUpdater(BASE_URL, fieldsToSend);
const itemDeleter = new WebitelAPIItemDeleter(BASE_URL);

export async function getDeviceList(page, size, search) {
    return await listGetter.getList({page, size, search});

    let url = BASE_URL + `?size=${size}`;
    if (response.devices) {
        return response.devices.map(item => {
            return {...defaultObject, ...item};
        });
    }

}

export async function getDevice(id) {
    return await itemGetter.getItem(id);
}

export const addDevice = async (item) => {
    let itemCopy = deepCopy(item);
    return await itemCreator.createItem(itemCopy);
};

export const updateDevice = async (id, item) => {
    let itemCopy = deepCopy(item);
    return await itemUpdater.updateItem(id, itemCopy);
};

export const deleteDevice = async (id) => {
    return await itemDeleter.deleteItem(id);
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