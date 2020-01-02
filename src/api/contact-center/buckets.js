import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import sanitizer from '../utils/sanitizer';
import {BucketServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../utils/eventBus";

const bucketService = new BucketServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = undefined;
const fieldsToSend = ['domain_id', 'name', 'description'];

export const getBucketsList = async (size = 10) => {
    const defaultObject = {
        _isSelected: false,
    };

    try {
        const response = await bucketService.searchBucket(0, size);
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