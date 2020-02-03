import instance from '@/api/instance';
import store from '@/store/store';
import configuration from '@/api/openAPIConfig';
import {CommunicationTypeServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import sanitizer from "../../utils/sanitizer";

const communicationService = new CommunicationTypeServiceApiFactory
(configuration, '', instance);

const domainId = undefined;
const fieldsToSend = ['code', 'name', 'description'];

export const getCommunicationsList = async (page = 0, size = 10) => {
    try {
        const response = await communicationService.searchCommunicationType(page, size);
        if (!response.data.items) response.data.items = [];
        response.data.items.forEach(item => item._isSelected = false);
        return response.data.items;
    } catch (err) {
        throw err;
    }
};

export const getCommunication = async (id) => {
    try {
        const response = await communicationService.readCommunicationType(id, domainId);

        const defaultObject = {
            name: '',
            code: '',
            description: '',
            _dirty: false,
        };

        return {...defaultObject, ...response.data};
    } catch (err) {
        throw err;
    }
};

export const addCommunication = async (item) => {
    item.domain_id = domainId;
    try {
        const response = await communicationService.createCommunicationType(item);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateCommunication = async (id, item) => {
    sanitizer(item, fieldsToSend);
    try {
        await communicationService.updateCommunicationType(id, item);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteCommunication = async (id) => {
    try {
        await communicationService.deleteCommunicationType(id, domainId);
    } catch (err) {
        throw err;
    }
};