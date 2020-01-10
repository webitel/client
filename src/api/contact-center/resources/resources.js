import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {objCamelToSnake, objSnakeToCamel} from '../../utils/caseConverters';
import {OutboundResourceServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";

const resService = new OutboundResourceServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId =  undefined;
const fieldsToSend = ['domain_id', 'limit', 'enabled',
    'rps', 'reserve', 'max_successively_errors',
    'name', 'error_ids', 'display', 'resource_id', 'gateway'];

export const getResourceList = async (page, size = 10) => {
    const defaultObject = {
        _isSelected: false,
        name: '',
        gateway: null,
        enabled: false,
        reserve: false,
        id: 0,
    };

    try {
        const response = await resService.searchOutboundResource(page, size, domainId);
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
            maxErrors: null,
            errorIds: [],
            id: 0,
            _dirty: false,
        };

        response.data.maxErrors = response.data.max_successively_errors;
        response.data.cps = response.data.rps;
        response.data = objSnakeToCamel(response.data);
        response.data.errorIds = response.data.errorIds.map(item => {
            return {
                name: item,
            }
        });
        return {...defaultObject, ...response.data};
    } catch (err) {
        throw err;
    }
};

export const addResource = async (item) => {
    let itemCopy = {...item};
    itemCopy.errorIds = itemCopy.errorIds.map(item => item.name || item.text);
    itemCopy.max_successively_errors = item.maxErrors;
    itemCopy.rps = item.cps;
    itemCopy = objCamelToSnake(itemCopy);
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await resService.createOutboundResource(itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateResource = async (id, item) => {
    let itemCopy = {...item};
    itemCopy.errorIds = itemCopy.errorIds.map(item => item.name || item.text);
    itemCopy.max_successively_errors = item.maxErrors;
    itemCopy.rps = item.cps;
    itemCopy = objCamelToSnake(itemCopy);
    sanitizer(itemCopy, fieldsToSend);
    try {
        await resService.updateOutboundResource(id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const patchResource = async (id, item) => {
    try {
        await resService.patchOutboundResource(id, item);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
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