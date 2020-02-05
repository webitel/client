import instance from '../../instance';
import configuration from '../../openAPIConfig';
import {ListServiceApiFactory} from 'webitel-sdk';
import sanitizer from "../../utils/sanitizer";
import eventBus from "../../../utils/eventBus";
import {coerceObjectPermissionsResponse} from "../../permissions/objects/objects";
import deepCopy from 'deep-copy';
import store from '../../../store/store';

const listService = new ListServiceApiFactory
(configuration, '', instance);

const BASE_URL = '/call_center/list';
const fieldsToSend = ['domainId', 'name', 'description'];

export const getBlacklistList = async (page, size, search) => {
    const domainId = store.state.userinfo.domainId || undefined;
    if(search && search.slice(-1) !== '*') search += '*';
    const defaultObject = {
        name: '',
        _isSelected: false,
    };

    try {
        const response = await listService.searchList(page, size, search, domainId);
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

export const getBlacklist = async (id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    const defaultObject = {
        _dirty: false,
    };

    try {
        const response = await listService.readList(id, domainId);
        return {...defaultObject, ...response};
    } catch (err) {
        throw err;
    }
};

export const addBlacklist = async (item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await listService.createList(itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const updateBlacklist = async (id, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    sanitizer(itemCopy, fieldsToSend);
    try {
        await listService.updateList(id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteBlacklist = async (id) => {
    const domainId = store.state.userinfo.domainId || undefined;
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