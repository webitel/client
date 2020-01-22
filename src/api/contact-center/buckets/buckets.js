import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {BucketServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import {coerceObjectPermissionsResponse} from "../../permissions/objects/objects";

const bucketService = new BucketServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const BASE_URL = '/call_center/buckets';
const domainId = undefined;
const fieldsToSend = ['domain_id', 'name', 'description'];

export const getBucketsList = async (page = 0, size = 10) => {
    const defaultObject = {
        _isSelected: false,
    };

    try {
        const response = await bucketService.searchBucket(page, size);
        if (Array.isArray(response.data.items)) {
            return response.data.items.map(item => {
                return {...defaultObject, ...item};
            });
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getBucket = async (id) => {
    try {
        const response = await bucketService.readBucket(id, domainId);
        const defaultObject = {
            name: '',
            id: 0,
            _dirty: false,
        };

        return {...defaultObject, ...response.data};
    } catch (err) {
        throw err;
    }
};

export const addBucket = async (item) => {
    sanitizer(item, fieldsToSend);
    try {
        const response = await bucketService.createBucket(item);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateBucket = async (id, item) => {
    sanitizer(item, fieldsToSend);
    try {
        await bucketService.updateBucket(id, item);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteBucket = async (id) => {
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