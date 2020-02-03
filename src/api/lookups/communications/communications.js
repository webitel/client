import instance from '../../instance';
import configuration from '../../openAPIConfig';
import {CommunicationTypeServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import sanitizer from "../../utils/sanitizer";
import deepCopy from 'deep-copy';
import store from '../../../store/store';
import {objCamelToSnake} from "../../utils/caseConverters";

const communicationService = new CommunicationTypeServiceApiFactory
(configuration, '', instance);

const fieldsToSend = ['domainId', 'code', 'name', 'description'];

export const getCommunicationsList = async (page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId || undefined;
    if (search.length && search.slice(-1) !== '*') search += '*';
    try {
        const response = await communicationService.searchCommunicationType(page, size, search, domainId);
        if (!response.data.items) response.data.items = [];
        response.data.items.forEach(item => item._isSelected = false);
        return response.data.items;
    } catch (err) {
        throw err;
    }
};

export const getCommunication = async (id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    const defaultObject = {
        name: '',
        code: '',
        description: '',
        _dirty: false,
    };

    try {
        const response = await communicationService.readCommunicationType(id, domainId);
        return {...defaultObject, ...response.data};
    } catch (err) {
        throw err;
    }
};

export const addCommunication = async (item) => {
    const domainId = store.state.userinfo.domainId || undefined;
    let itemCopy = deepCopy(item);
    itemCopy.domainId = domainId;
    sanitizer(itemCopy, fieldsToSend);
    itemCopy = objCamelToSnake(itemCopy);
    try {
        const response = await communicationService.createCommunicationType(itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateCommunication = async (id, item) => {
    const domainId = store.state.userinfo.domainId || undefined;
    let itemCopy = deepCopy(item);
    itemCopy.domainId = domainId;
    sanitizer(itemCopy, fieldsToSend);
    itemCopy = objCamelToSnake(itemCopy);
    try {
        await communicationService.updateCommunicationType(id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteCommunication = async (id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    try {
        await communicationService.deleteCommunicationType(id, domainId);
    } catch (err) {
        throw err;
    }
};