import instance from '@/api/instance';
import store from '@/store/store';
import configuration from '@/api/openAPIConfig';
import sanitizer from '../utils/sanitizer';
import {objCamelToSnake, objSnakeToCamel} from '../utils/caseConverters';

import {OutboundResourceServiceApiFactory} from 'webitel-sdk';
import {getGatewayList} from "../routing/gateways";

const resService = new OutboundResourceServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = store.getters.getDomainId || undefined;
const fieldsToSend = ['domain_id', 'limit', 'enabled',
    'rps', 'reserve', 'max_successively_errors',
    'name', 'error_ids', 'display', 'resource_id', 'gateway'];

export const getResourceList = async (size = 10) => {
    const defaultObject = {
        isSelected: false,
        name: '',
        gateway: null,
        enabled: false,
        reserve: false,
        id: 0,
    };

    try {
        const response = await resService.searchOutboundResource(0, size, domainId);
        if (Array.isArray(response.data.items)) {
            return response.data.items.map(item => {
                return Object.assign({}, defaultObject, item);
            });
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getResource = async (id) => {
    try {
        const response = await resService.readOutboundResource(id, domainId);
        const defaultObject = {
            name: '',
            gateway: null,
            cps: 0,
            limit: 0,
            description: '',
            numberList: ['1', '2'],
            maxErrors: null,
            errorIds: [],
            id: 0
        };

        response.data.maxErrors = response.data.max_successively_errors;
        response.data.cps = response.data.rps;
        response.data = objSnakeToCamel(response.data);
        response.data.errorIds = (response.data.errorIds || []).map(errCode => {
            return {text: errCode}
        });

        return Object.assign({}, defaultObject, response.data);
    } catch (err) {
        throw err;
    }
};

export const addResource = async (item) => {
    item.errorIds = Object.values(...item.errorIds);
    item.max_successively_errors = item.maxErrors;
    item.rps = item.cps;
    item = objCamelToSnake(item);
    sanitizer(item, fieldsToSend);
    try {
        const response = await resService.createOutboundResource(item);
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateResource = async (id, item) => {
    item.errorIds = Object.values(...item.errorIds);
    item.rps = item.cps;
    item = objCamelToSnake(item);

    sanitizer(item, fieldsToSend);
    try {
        await resService.updateOutboundResource(id, item);
    } catch (err) {
        throw err;
    }
};

export const patchResource = async (id, changes) => {
    try {
        await resService.patchOutboundResource(id, changes);
    } catch (err) {
        throw err;
    }
};

export const deleteResource = async (id) => {
    try {
        await resService.deleteOutboundResource(id, domainId);
    } catch (err) {
        throw err;
    }
};

export const getResDisplayList = async (resId, page = 0, size = 10) => {
    try {
        const response = await resService.searchOutboundResourceDisplay(resId, page, size, domainId);
        return response.data.items ? response.data.items : [];
    } catch (err) {
        throw err;
    }
};

export const addResDisplay = async (resId, item) => {
    item.domain_id = domainId;
    item.resource_id = resId;
    try {
        await resService.createOutboundResourceDisplay(resId, item);
    } catch (err) {
        throw err;
    }
};

export const updateResDisplay = async (resId, id, item) => {
    item.domain_id = domainId;
    item.resorce_id = resId;
    sanitizer(fieldsToSend, item);
    try {
        await resService.updateOutboundResourceDisplay(resId, id, item);
    } catch (err) {
        throw err;
    }
};

export const deleteResDisplay = async (resId, id) => {
    try {
        await resService.deleteOutboundResourceDisplay(resId, id, domainId);
    } catch (err) {
        throw err;
    }
};

export const getGatewayNameIdPair = async () => {
    try {
        const response = await getGatewayList();
        return response.map(item => {
            return {
                name: item.name,
                id: item.id,
            }
        });
    } catch (err) {
        throw err;
    }
};