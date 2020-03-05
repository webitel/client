import instance from '../../instance';
import configuration from '../../openAPIConfig';
import {ListServiceApiFactory} from 'webitel-sdk';
import sanitizer from "../../utils/sanitizer";
import eventBus from "../../../utils/eventBus";
import store from "../../../store/store";
import deepCopy from 'deep-copy';

const listService = new ListServiceApiFactory
(configuration, '', instance);

const fieldsToSend = ['domainId', 'listId', 'description', 'number'];

export const getBlacklistCommunicationList = async (listId, page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId;
    if (search && search.slice(-1) !== '*') search += '*';
    const defaultObject = {
        name: '',
        _isSelected: false,
    };
    try {
        const response = await listService.searchListCommunication(listId, page, size, search, domainId);
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

export const getBlacklistCommunication = async (listId, id) => {
    const domainId = store.state.userinfo.domainId;
    const defaultObject = {
        _dirty: false,
    };
    try {
        const response = await listService.readListCommunication(listId, id, domainId);
        return {...defaultObject, ...response};
    } catch (err) {
        throw err;
    }
};

export const addBlacklistCommunication = async (listId, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    itemCopy.listId = listId;
    sanitizer(item, fieldsToSend);
    try {
        const response = await listService.createListCommunication(listId, itemCopy);
        eventBus.$emit('notificationInfo', 'Successfully added');
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const updateBlacklistCommunication = async (listId, id, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    itemCopy.listId = listId;
    sanitizer(itemCopy, fieldsToSend);
    try {
        await listService.updateListCommunication(listId, id, itemCopy);
        eventBus.$emit('notificationInfo', 'Successfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteBlacklistCommunication = async (listId, id) => {
    const domainId = store.state.userinfo.domainId;
    try {
        await listService.deleteListCommunication(listId, id, domainId);
    } catch (err) {
        throw err;
    }
};