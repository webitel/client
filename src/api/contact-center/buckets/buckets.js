import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {BucketServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import {coerceObjectPermissionsResponse} from "../../permissions/objects/objects";
import deepCopy from 'deep-copy';
import store from '../../../store/store';

const bucketService = new BucketServiceApiFactory
(configuration, '', instance);

const BASE_URL = '/call_center/buckets';
const fieldsToSend = ['domainId', 'name', 'description'];

export const getBucketsList = async (page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId || undefined;
    const defaultObject = {
        _isSelected: false,
    };
    if(search && search.slice(-1) !== '*') search += '*';

    try {
        const response = await bucketService.searchBucket(page, size, search, domainId);
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

export const getBucket = async (id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    const defaultObject = {
        name: '',
        _dirty: false,
    };

    try {
        const response = await bucketService.readBucket(id, domainId);
        return {...defaultObject, ...response};
    } catch (err) {
        throw err;
    }
};

export const addBucket = async (item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await bucketService.createBucket(itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const updateBucket = async (id, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    sanitizer(itemCopy, fieldsToSend);
    try {
        await bucketService.updateBucket(id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteBucket = async (id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    try {
        await bucketService.deleteBucket(id, domainId);
    } catch (err) {
        throw err;
    }
};

export const getBucketPermissions = async (id, page = 0, size = 10, search) => {
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

export const patchBucketPermissions = async (id, item) => {
    const url = BASE_URL + '/' + id + '/acl';

    try {
        await instance.patch(url, {changes: item});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (error) {
        throw error;
    }
};