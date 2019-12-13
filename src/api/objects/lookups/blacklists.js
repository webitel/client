import instance from '@/api/instance';
import store from '@/store/store';
import configuration from '@/api/openAPIConfig';
import {ListServiceApiFactory} from 'webitel-sdk';
import sanitizer from "../../sanitizer";
import logger from "vuex/dist/logger";

const listService = new ListServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = store.getters.getDomainId || undefined;
const fieldsToSend = ['name', 'description', 'number'];

export const getBlacklistList = async (size = 10) => {
    try {
        const response = await listService.searchList(domainId, size);
        if (!response.data.items) response.data.items = [];
        response.data.items.forEach(item => item.isSelected = false);
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
    item.domain_id = domainId;
    try {
        const response = await listService.createList(item);
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateBlacklist = async (changes) => {
    try {
        await listService.updateList(changes.id, changes);
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

export const getBlacklistCommunicationList = async (listId, size = 10) => {
    try {
        const response = await listService.searchListCommunication(listId, 0, size);
        if (!response.data.items) response.data.items = [];
        response.data.items.forEach(item => item.isSelected = false);
        return response.data.items;
    } catch (err) {
        throw err;
    }
};

export const getBlacklistCommunication = async (listId, id) => {
    try {
        const response = await listService.readListCommunication(listId, id, domainId);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const addBlacklistCommunication = async (listId, item) => {
    sanitizer(item, fieldsToSend);
    item.domain_id = domainId;
    delete item.description;
    try {
        const response = await listService.createListCommunication(listId, item);
    } catch (err) {
        console.log(err)
        throw err;
    }
};

export const updateBlacklistCommunication = async (listId, changes) => {
    console.log(listId, changes);
    try {
        await listService.updateListCommunication(listId, changes.id, changes);
    } catch (err) {
        console.log(err)
        throw err;
    }
};

export const deleteBlacklistCommunication = async (listId, id) => {
    try {
        await listService.deleteList(listId, id, domainId);
    } catch (err) {
        throw err;
    }
};