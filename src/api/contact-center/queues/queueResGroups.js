import { QueueResourcesServiceApiFactory } from 'webitel-sdk';
import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import store from '../../../store/store';

const queueResService = new QueueResourcesServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['domainId', 'resourceGroup', 'queueId'];

export const getQueueResGroupList = async (queueId, page = 0, size = 10, search) => {
    const { domainId } = store.state.userinfo;
    if (search && search.slice(-1) !== '*') search += '*';
    const defaultObject = {
        _isSelected: false,
    };

    try {
        const response = await queueResService.searchQueueResourceGroup(queueId, page, size, search, domainId);
        if (response.items) {
            return {
                list: response.items.map((item) => ({ ...defaultObject, ...item })),
                isNext: response.next || false,
            };
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getQueueResGroup = async (queueId, id) => {
    const { domainId } = store.state.userinfo;
    const defaultObject = {
        _dirty: false,
    };
    try {
        const response = await queueResService.readQueueResourceGroup(queueId, id, domainId);
        return { ...defaultObject, ...response };
    } catch (err) {
        throw err;
    }
};

export const addQueueResGroup = async (queueId, item) => {
    const itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    itemCopy.queuId = queueId;
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await queueResService.createQueueResourceGroup(queueId, itemCopy);
        eventBus.$emit('notification', { type: 'info', text: 'Successfully added' });
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const updateQueueResGroup = async (queueId, id, item) => {
    const itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    itemCopy.queuId = queueId;
    sanitizer(itemCopy, fieldsToSend);
    try {
        await queueResService.updateQueueResourceGroup(queueId, id, itemCopy);
        eventBus.$emit('notification', { type: 'info', text: 'Successfully updated' });
    } catch (err) {
        throw err;
    }
};

export const deleteQueueResGroup = async (queueId, id) => {
    const { domainId } = store.state.userinfo;
    try {
        await queueResService.deleteQueueResourceGroup(queueId, id, domainId);
    } catch (err) {
        throw err;
    }
};
