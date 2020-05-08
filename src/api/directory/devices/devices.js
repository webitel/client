import instance from '../../instance';
import deepCopy from "deep-copy";
import {WebitelAPIItemDeleter} from "../../utils/ApiControllers/Deleter/ApiDeleter";
import {WebitelAPIItemUpdater} from "../../utils/ApiControllers/Updater/ApiUpdater";
import {WebitelAPIItemCreator} from "../../utils/ApiControllers/Creator/ApiCreator";
import {WebitelAPIItemGetter} from "../../utils/ApiControllers/Getter/ApiGetter";
import {WebitelAPIListGetter} from "../../utils/ApiControllers/ListGetter/ApiListGetter";


const BASE_URL = '/devices';
const fieldsToSend = ['name', 'account', 'password', 'user',
     'mac', 'ip', 'brand', 'model', 'hotdesks', 'hotdesk'
];

const defaultListItem = {  // default object prototype, to merge response with it to get all fields
    _isSelected: false,
    name: '',
    account: '',
    user: {name: ''},
    state: 0,
    id: 0
};

const defaultItem = {  // default object prototype, to merge response with it to get all fields
    name: '',
    account: '',
    user: {name: ''},
    state: 0,
    id: 0,
    hotdesks: [],
    hotdesk: false,
    password: '',
    phone: {},
    brand: '',
    model: '',
    _dirty: false,
};

const preRequestHandler = (item) => {
    if(item.hotdesks) {
        item.hotdesks = item.hotdesks.map(item => item.name || item.text);
    }
    if(!item.password) delete item.password;
    return item;
};

const listGetter = new WebitelAPIListGetter(BASE_URL, defaultListItem);
const itemGetter = new WebitelAPIItemGetter(BASE_URL, defaultItem);
const itemCreator = new WebitelAPIItemCreator(BASE_URL, fieldsToSend, preRequestHandler);
const itemUpdater = new WebitelAPIItemUpdater(BASE_URL, fieldsToSend, preRequestHandler);
const itemDeleter = new WebitelAPIItemDeleter(BASE_URL);

itemGetter.responseHandler = (response) => {
    try {
        if(response.hotdesks) {
            response.hotdesks = response.hotdesks.map(item => {
                return {name: item}
            });
        }
        return {...defaultItem, ...response};
    } catch (err) {
        throw err;
    }
};

export async function getDeviceList(page, size, search) {
    return await listGetter.getList({page, size, search});
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
        loggedIn: '0',
        loggedOut: '0',
        user: {}
    };

    try {
        let response = await instance.get(url);
        if (response.items) {
            return response.items.map(item => {
                return {...defaultObject, ...item};
            });
        }
        return [];
    } catch (err) {
        throw err;
    }
};