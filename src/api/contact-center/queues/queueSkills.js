import { QueueSkillServiceApiFactory } from 'webitel-sdk';
import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';

const queueResService = new QueueSkillServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['domainId', 'maxCapacity',
    'minCapacity', 'queueId', 'lvl', 'buckets', 'skill'];

export const getQueueSkillsList = async (queueId, page = 0, size = 10, search) => {
    const defaultObject = {
        agent: {},
        minCapacity: 0,
        maxCapacity: 0,
        buckets: [],
        lvl: 0,
        _isSelected: false,
    };

    try {
        const response = await queueResService
          .searchQueueSkill(queueId, page, size, search);
        if (response.items) {
            return {
                list: response.items.map((item) => ({ ...defaultObject, ...item })),
                isNext: response.next || false,
            };
        }
        return { list: [] };
    } catch (err) {
        throw err;
    }
};

export const getQueueSkill = async (queueId, id) => {
    const defaultObject = {
        agent: {},
        minCapacity: 0,
        maxCapacity: 0,
        buckets: [],
        lvl: 0,
        _dirty: false,
    };

    try {
        const response = await queueResService.readQueueSkill(queueId, id);
        return { ...defaultObject, ...response };
    } catch (err) {
        throw err;
    }
};

export const addQueueSkill = async (queueId, item) => {
    const itemCopy = deepCopy(item);
    itemCopy.queueId = queueId;
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await queueResService.createQueueSkill(queueId, itemCopy);
        eventBus.$emit('notification', { type: 'info', text: 'Successfully added' });
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const updateQueueSkill = async (queueId, id, item) => {
    const itemCopy = deepCopy(item);
    itemCopy.queueId = queueId;
    sanitizer(itemCopy, fieldsToSend);
    try {
        await queueResService.updateQueueSkill(queueId, id, itemCopy);
        eventBus.$emit('notification', { type: 'info', text: 'Successfully updated' });
    } catch (err) {
        throw err;
    }
};

export const deleteQueueSkill = async (queueId, id) => {
    try {
        await queueResService.deleteQueueSkill(queueId, id);
    } catch (err) {
        throw err;
    }
};
