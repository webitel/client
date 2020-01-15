import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {QueueServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import {objCamelToSnake, objSnakeToCamel} from "../../utils/caseConverters";

const queueService = new QueueServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = undefined;
const fieldsToSend = ['domain_id', 'name', 'type', 'strategy', 'team', 'priority', 'dncList',
    'payload', 'maxOfRetry', 'timeout', 'secBetweenRetries', 'variables', 'calendar'];

export const getQueuesList = async (page = 0, size = 10) => {
    const defaultObject = {
        type: 0,
        enabled: false,
        activeCalls: 'undefined',
        waiting: 'undefined',
        priority: '0',
        _isSelected: false,
    };

    try {
        const response = await queueService.searchQueue(page, size);
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

export const getQueue = async (id) => {
    try {
        let response = await queueService.readQueue(id, domainId);
        const defaultObject = {
            name: '',
            id: 0,
            payload: {},
            calendar: {},
            priority: '0',
            dncList: {}, // blacklist
            schema: {},
            team: {},
            strategy: 'STRATEGY NAME',
            description: 'DESCRIPTION',
            variables: [],
            _dirty: false,
        };
        response = response.data;
        if (response.variables) {
            response.variables = Object.keys(response.variables).map(key => {
                return {key, value: response.variables[key],}
            });
        } else {
            response.variables = [{key: '', value: ''}];
        }
        if(response.priority) response.priority += '';
        return {...defaultObject, ...objSnakeToCamel(response)};
    } catch (err) {
        throw err;
    }
};

export const addQueue = async (item) => {
    let itemCopy = {...item, variables: {}};
    sanitizer(itemCopy, fieldsToSend);
    itemCopy = objCamelToSnake(itemCopy);
    item.variables.forEach(variable => {
        itemCopy.variables[variable.key] = variable.value;
    });
    try {
        const response = await queueService.createQueue(itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const patchQueue = async (id, item) => {
    try {
        await queueService.patchQueue(id, item);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const updateQueue = async (id, item) => {
    let itemCopy = {...item, variables: {}};
    sanitizer(itemCopy, fieldsToSend);
    itemCopy = objCamelToSnake(itemCopy);
    item.variables.forEach(variable => {
        itemCopy.variables[variable.key] = variable.value;
    });
    try {
        await queueService.updateQueue(id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteQueue = async (id) => {
    try {
        await queueService.deleteQueue(id, domainId);
    } catch (err) {
        throw err;
    }
};