import instance from '@/api/instance';
import store from '@/store/store';
import configuration from '@/api/openAPIConfig';
import sanitizer from '@/api/sanitizer';
import {OutboundResourceServiceApiFactory} from 'webitel-sdk';

const resService = new OutboundResourceServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = store.getters.getDomainId || undefined;
const fieldsToSend = ['domain_id', 'limit', 'enabled',
                'rps', 'reserve', 'max_successively_errors',
                'name', 'error_ids'];

export const getResourceList = async (size = 10) => {
    const defaultObject = {
        isSelected: false,
        name: '',
        gateway: {
            name: 'gateway default name',
            id: 0
        },
        enabled: false,
        reserve: false,
        id: 0,
    };

    try {
        const response = await resService.searchOutboundResource(size, undefined, domainId);
        if (Array.isArray(response.data.items)) {
            return response.data.items.map(item => {
                return Object.assign({}, defaultObject, item);
            });
        }
        return [];


    } catch (err) {
        throw err;
    }
}

export const getResource = async (id) => {
    try {
        const response = await resService.readOutboundResource(id, domainId);

        const defaultObject = {
            name: '',
            gateway: {id: 1},
            cps: 0,
            limit: 0,
            description: '',
            numberList: ['1', '2'],
            maxErrors: null,
            errorIds: [],
            id: 0
        };

        response.data.cps = response.data.rps;
        response.data.maxErrors = response.data.max_successively_errors;
        response.data.error_ids = response.data.error_ids || [];
        response.data.errorIds = response.data.error_ids.map(errCode => {
            return {text: errCode}
        });

        return Object.assign({}, defaultObject, response.data);
    } catch (err) {
        throw err;
    }
};

export async function addResource(item) {
    item.domain_id = domainId;
    item.error_ids = Object.values(...item.errorIds);
    item.rps = item.cps;
    item.max_successively_errors = item.maxErrors;

    sanitizer(item, fieldsToSend);
    try {
        await resService.createOutboundResource(item);
    } catch (err) {
        throw err;
    }
}

export async function updateResource(id, item) {
    item.error_ids = Object.values(...item.errorIds);
    item.rps = item.cps;
    item.max_successively_errors = item.maxErrors;

    sanitizer(item, fieldsToSend);
    try {
        await resService.updateOutboundResource(id, item);
    } catch (err) {
        throw err;
    }
}

export async function deleteResource(id) {
    try {
        await resService.deleteOutboundResource(id, domainId);
    } catch (err) {
        throw err;
    }
}