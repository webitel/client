import {
    WebitelAPIItemCreator, WebitelAPIItemDeleter,
    WebitelAPIItemGetter,
    WebitelAPIItemUpdater,
    WebitelAPIListGetter
} from "../../utils/apiControllers";

const BASE_URL = '/roles';
const fieldsToSend = ['name', 'description'];

const listGetter = new WebitelAPIListGetter(BASE_URL);
const itemGetter = new WebitelAPIItemGetter(BASE_URL);
const itemCreator = new WebitelAPIItemCreator(BASE_URL, fieldsToSend);
const itemUpdater = new WebitelAPIItemUpdater(BASE_URL, fieldsToSend);
const itemDeleter = new WebitelAPIItemDeleter(BASE_URL);

itemGetter.responseHandler = (response) => {
    let defaultItem = {
        name: 'name undefined',
        id: 0,
        _dirty: false,
    };
    try {
        return {...defaultItem, ...response.role};
    } catch (error) {
        throw error;
    }
};

itemCreator.responseHandler =(response) => {
    try {
        return response.created.id;
    } catch (error) {
        throw error;
    }
};

export const getRoleList = async (page = 0, size = 10, search) => {
    return await listGetter.getList({page, size, search});
};

export const getRole = async (id) => {
    return await itemGetter.getItem(id);
};

export const addRole = async (item) => {
    return await itemCreator.createItem(item);
};

export const updateRole = async (id, item) => {
    return await itemUpdater.updateItem(id, item);
};

export const deleteRole = async (id) => {
    return await itemDeleter.deleteItem(id);
};

