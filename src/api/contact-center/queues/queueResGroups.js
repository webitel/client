import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {QueueResourcesServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import deepCopy from 'deep-copy';
import store from '../../../store/store';

const queueResService = new QueueResourcesServiceApiFactory
(configuration, '', instance);

const fieldsToSend = ['domainId', 'resourceGroup', 'queueId'];

export const getQueueResGroupList = async (queueId, page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId || undefined;
    if (search && search.slice(-1) !== '*') search += '*';
    const defaultObject = {
        _isSelected: false,
    };

    try {
        const response = await queueResService.searchQueueResourceGroup(queueId, page, size, domainId);
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

export const getQueueResGroup = async (queueId, id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    const defaultObject = {
        _dirty: false,
    };
    try {
        let response = await queueResService.readQueueResourceGroup(queueId, id, domainId);
        return {...defaultObject, ...response};
    } catch (err) {
        throw err;
    }
};

export const addQueueResGroup = async (queueId, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    itemCopy.queuId = queueId;
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await queueResService.createQueueResourceGroup(queueId, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const updateQueueResGroup = async (queueId, id, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    itemCopy.queuId = queueId;
    sanitizer(itemCopy, fieldsToSend);
    try {
        await queueResService.updateQueueResourceGroup(queueId, id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteQueueResGroup = async (queueId, id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    try {
        await queueResService.deleteQueueResourceGroup(queueId, id, domainId);
    } catch (err) {
        throw err;
    }
};