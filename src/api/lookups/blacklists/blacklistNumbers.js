import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import {ListServiceApiFactory} from 'webitel-sdk';
import sanitizer from "../../utils/sanitizer";
import eventBus from "../../../utils/eventBus";

const listService = new ListServiceApiFactory
(configuration, '', instance);

const fieldsToSend = ['description', 'number'];

export const getBlacklistCommunicationList = async (parentId, page = 0, size = 10) => {
    try {
        const response = await listService.searchListCommunication(parentId, page, size);
        if (!response.data.items) response.data.items = [];
        response.data.items.forEach(item => item._isSelected = false);
        return response.data.items;
    } catch (err) {
        throw err;
    }
};

export const getBlacklistCommunication = async (id, numberId) => {
    try {
        const response = await listService.readListCommunication(id, numberId);
        const defaultObject = {
            _dirty: false,
        };
        return {...defaultObject, ...response.data};
    } catch (err) {
        throw err;
    }
};

export const addBlacklistCommunication = async (id, item) => {
    sanitizer(item, fieldsToSend);
    try {
        const response = await listService.createListCommunication(id, item);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
    } catch (err) {
        throw err;
    }
};

export const updateBlacklistCommunication = async (id, numberId, changes) => {
    sanitizer(changes, fieldsToSend);
    try {
        await listService.updateListCommunication(id, numberId, changes);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteBlacklistCommunication = async (id, numberId) => {
    try {
        await listService.deleteListCommunication(id, numberId);
    } catch (err) {
        throw err;
    }
};