import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import {ListServiceApiFactory} from 'webitel-sdk';
import sanitizer from "../../utils/sanitizer";
import eventBus from "../../../utils/eventBus";
import {coerceObjectPermissionsResponse} from "../../permissions/objects/objects";

const listService = new ListServiceApiFactory
(configuration, '', instance);

const BASE_URL = '/call_center/list';
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

export const getBlacklistPermissions = async (id, page = 0, size = 10, search) => {
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

export const patchBlacklistPermissions = async (id, item) => {
    const url = BASE_URL + '/' + id + '/acl';

    try {
        await instance.patch(url, {changes: item});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (error) {
        throw error;
    }
};