import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import {ListServiceApiFactory} from 'webitel-sdk';
import sanitizer from "../../sanitizer";

const listService = new ListServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = undefined;
const fieldsToSend = ['name', 'description', 'number'];

export const getBlacklistList = async (size) => {
    try {
        const response = await listService.searchList(domainId, size);
        if (!response.data.items) response.data.items = [];
        response.data.items.forEach(item => item._isSelected = false);
        return response.data.items;
    } catch (err) {
        throw err;
    }
};

export const getBlacklist = async (id) => {
    try {
        const response = await listService.readList(id, domainId);

        const defaultObject = {
            // name: '',
            // code: '',
            // description: '',
        };

        return Object.assign({}, defaultObject, response.data);
    } catch (err) {
        throw err;
    }
};

export const addBlacklist = async (item) => {
    sanitizer(item, fieldsToSend);
    item.domain_id = domainId;
    try {
        const response = await listService.createList(item);
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateBlacklist = async (id, changes) => {
    sanitizer(changes, fieldsToSend);
    try {
        await listService.updateList(id, changes);
    } catch (err) {
        throw err;
    }
};

export const deleteBlacklist = async (id) => {
    try {
        await listService.deleteList(id, domainId);
    } catch (err) {
        throw err;
    }
};

export const getBlacklistCommunicationList = async (id, size) => {
    try {
        const response = await listService.searchListCommunication(id, 0, size);
        if (!response.data.items) response.data.items = [];
        response.data.items.forEach(item => item._isSelected = false);
        return response.data.items;
    } catch (err) {
        throw err;
    }
};

export const getBlacklistCommunication = async (id, numberId) => {
    try {
        const response = await listService.readListCommunication(id, numberId, domainId);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const addBlacklistCommunication = async (id, item) => {
    sanitizer(item, fieldsToSend);
    item.domain_id = domainId;
    delete item.description;
    try {
        const response = await listService.createListCommunication(id, item);
    } catch (err) {
        throw err;
    }
};

export const updateBlacklistCommunication = async (id, numberId, changes) => {
    sanitizer(changes, fieldsToSend);
    try {
        await listService.updateListCommunication(id, numberId, changes);
    } catch (err) {
        throw err;
    }
};

export const deleteBlacklistCommunication = async (id, numberId) => {
    try {
        await listService.deleteListCommunication(id, numberId, domainId);
    } catch (err) {
        throw err;
    }
};