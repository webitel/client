import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {objCamelToSnake, objSnakeToCamel} from '../../utils/caseConverters';
import {OutboundResourceServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import {coerceObjectPermissionsResponse} from "../../permissions/objects/objects";
import store from "../../../store/store";
import deepCopy from "deep-copy";

const resService = new OutboundResourceServiceApiFactory
(configuration, '', instance);

const BASE_URL = '/call_center/resources';
const domainId =  undefined;
const fieldsToSend = ['domainId', 'limit', 'enabled',
    'rps', 'reserve', 'max_successively_errors',
    'name', 'error_ids', 'display', 'resource_id', 'gateway'];

export const getResourceList = async (page, size = 10, search) => {
    const domainId = store.state.userinfo.domainId || undefined;
    const defaultObject = {
        _isSelected: false,
        name: '',
        gateway: null,
        enabled: false,
        reserve: false,
        id: 0,
    };
    if(search.length && search.slice(-1) !== '*') search += '*';

    try {
        const response = await resService.searchOutboundResource(page, size, search, domainId);
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
    const domainId = store.state.userinfo.domainId || undefined;
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

    try {
        const response = await resService.readOutboundResource(id, domainId);
        response.data.maxErrors = response.data.max_successively_errors;
        response.data.cps = response.data.rps;
        response.data = objSnakeToCamel(response.data);
        response.data.errorIds = response.data.errorIds.map(item => {
            return {name: item,}
        });
        return {...defaultObject, ...response.data};
    } catch (err) {
        throw err;
    }
};

export const addResource = async (item) => {
    const domainId = store.state.userinfo.domainId || undefined;
    let itemCopy = deepCopy(item);
    itemCopy.domainId = domainId;
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
    const domainId = store.state.userinfo.domainId || undefined;
    let itemCopy = deepCopy(item);
    itemCopy.domainId = domainId;
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
    const domainId = store.state.userinfo.domainId || undefined;
    let itemCopy = deepCopy(item);
    itemCopy.domainId = domainId;
    try {
        await resService.patchOutboundResource(id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteResource = async (id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    try {
        await resService.deleteOutboundResource(id, domainId);
    } catch (err) {
        throw err;
    }
};

export const getResPermissions = async (id, page = 0, size = 10, search) => {
    // let url = BASE_URL + `?page=${page}size=${size}`;
    let url = BASE_URL + '/' + id + '/acl' + `?size=${size}`;
    if (search) url += `&name=${search}*`;
    try {
        const response = await instance.get(url);
        return coerceObjectPermissionsResponse(response);
    } catch (error) {
        throw error;
    }
};

export const patchResPermissions = async (id, item) => {
    const url = BASE_URL + '/' + id + '/acl';

    try {
        await instance.patch(url, {changes: item});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (error) {
        throw error;
    }
};