import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {QueueBucketServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import {objCamelToSnake, objSnakeToCamel} from "../../utils/caseConverters";

const queueBucketsService = new QueueBucketServiceApiFactory
(configuration, '', instance);

const domainId = undefined;
const fieldsToSend = ['bucket', 'ratio', 'queue_id'];

export const getQueueBucketsList = async (queueId, page = 0, size = 10) => {
    const defaultObject = {
        _isSelected: false,
    };

    try {
        const response = await queueBucketsService.searchQueueBucket(queueId, page, size);
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

export const getQueueBucket = async (queueId, id) => {
    try {
        let response = await queueBucketsService.readQueueBucket(queueId, id);
        const defaultObject = {
            _dirty: false,
        };

        return {...defaultObject, ...objSnakeToCamel(response.data)};
    } catch (err) {
        throw err;
    }
};

export const addQueueBucket = async (queueId, item) => {
    let itemCopy = {...item, queue_id: queueId};
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await queueBucketsService.createQueueBucket(queueId, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateQueueBucket = async (queueId, id, item) => {
    let itemCopy = {...item, queue_id: queueId};
    sanitizer(itemCopy, fieldsToSend);
    try {
        await queueBucketsService.updateQueueBucket(queueId, id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteQueueBucket = async (queueId, id) => {
    try {
        await queueBucketsService.deleteQueueBucket(queueId, id);
    } catch (err) {
        throw err;
    }
};