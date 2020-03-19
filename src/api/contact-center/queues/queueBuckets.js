import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {QueueBucketServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import deepCopy from 'deep-copy';
import store from '../../../store/store';

const queueBucketsService = new QueueBucketServiceApiFactory
(configuration, '', instance);

const fieldsToSend = ['bucket', 'ratio', 'queueId'];

export const getQueueBucketsList = async (queueId, page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId;
    const defaultObject = {
        ratio: 0,
        _isSelected: false,
    };
    if (search && search.slice(-1) !== '*') search += '*';

    try {
        const response = await queueBucketsService.searchQueueBucket(queueId, page, size, search, domainId);
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

export const getQueueBucket = async (queueId, id) => {
    const domainId = store.state.userinfo.domainId;
    const defaultObject = {
        ratio: 0,
        _dirty: false,
    };
    try {
        let response = await queueBucketsService.readQueueBucket(queueId, id, domainId);
        return {...defaultObject, ...response};
    } catch (err) {
        throw err;
    }
};

export const addQueueBucket = async (queueId, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    itemCopy.queueId = queueId;

    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await queueBucketsService.createQueueBucket(queueId, itemCopy);
        eventBus.$emit('notificationInfo', 'Successfully added');
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const updateQueueBucket = async (queueId, id, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    itemCopy.queueId = queueId;
    sanitizer(itemCopy, fieldsToSend);
    try {
        await queueBucketsService.updateQueueBucket(queueId, id, itemCopy);
        eventBus.$emit('notificationInfo', 'Successfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteQueueBucket = async (queueId, id) => {
    const domainId = store.state.userinfo.domainId;
    try {
        await queueBucketsService.deleteQueueBucket(queueId, id, domainId);
    } catch (err) {
        throw err;
    }
};