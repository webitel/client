import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {QueueResourcesServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import {objCamelToSnake, objSnakeToCamel} from "../../utils/caseConverters";

const queueResService = new QueueResourcesServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = undefined;
const fieldsToSend = ['resourceGroup', 'queue_id'];

export const getQueueResGroupList = async (queueId, page = 0, size = 10) => {
    const defaultObject = {
        _isSelected: false,
    };

    try {
        const response = await queueResService.searchQueueResourceGroup(queueId, page, size);
        if (Array.isArray(response.data.items)) {
            return response.data.items.map(item => {
                return {...defaultObject, ...objSnakeToCamel(item)};
            });
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getQueueResGroup = async (queueId, id) => {
    try {
        let response = await queueResService.readQueueResourceGroup(queueId, id);
        const defaultObject = {
            _dirty: false,
        };

        return {...defaultObject, ...objSnakeToCamel(response.data)};
    } catch (err) {
        throw err;
    }
};

export const addQueueResGroup = async (queueId, item) => {
    let itemCopy = {...item, queue_id: queueId};
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await queueResService.createQueueResourceGroup(queueId, objCamelToSnake(itemCopy));
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateQueueResGroup = async (queueId, id, item) => {
    let itemCopy = {...item, queue_id: queueId};
    sanitizer(itemCopy, fieldsToSend);
    try {
        await queueResService.updateQueueResourceGroup(queueId, id, objCamelToSnake(itemCopy));
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteQueueResGroup = async (queueId, id) => {
    try {
        await queueResService.deleteQueueResourceGroup(queueId, id);
    } catch (err) {
        throw err;
    }
};