import instance from '@/api/instance';
import store from '@/store/store';
import configuration from '@/api/openAPIConfig';
import {CommunicationTypeServiceApiFactory} from 'webitel-sdk';

const communicationService = new CommunicationTypeServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = store.getters.getDomainId || undefined;

export const getCommunicationsList = async (size = 10) => {
    try {
        const response = await communicationService.searchCommunicationType(domainId, size);
        if (!response.data.items) response.data.items = [];
        response.data.items.forEach(item => item.isSelected = false);
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
        };

        return Object.assign({}, defaultObject, response.data);
    } catch (err) {
        throw err;
    }
};

export const addCommunication = async (item) => {
    item.domain_id = domainId;
    try {
        await communicationService.createCommunicationType(item);
    } catch (err) {
        throw err;
    }
};

export const updateCommunication = async (changes) => {
    try {
        await communicationService.updateCommunicationType(changes.id, changes);
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