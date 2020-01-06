import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import {ListServiceApiFactory} from 'webitel-sdk';
import sanitizer from "../../utils/sanitizer";
import eventBus from "../../../utils/eventBus";

const listService = new ListServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = undefined;
const fieldsToSend = ['name', 'description'];

export const getBlacklistList = async (page, size, search) => {
    try {
        const response = await listService.searchList(page, size);
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
            _dirty: false,
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
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateBlacklist = async (id, item) => {
    sanitizer(item, fieldsToSend);
    try {
        await listService.updateList(id, item);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
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