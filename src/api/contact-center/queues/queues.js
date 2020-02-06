import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {QueueServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import {coerceObjectPermissionsResponse} from "../../permissions/objects/objects";
import deepCopy from 'deep-copy';
import store from '../../../store/store';

const queueService = new QueueServiceApiFactory
(configuration, '', instance);

const BASE_URL = '/call_center/queues';
const fieldsToSend = ['domainId', 'name', 'type', 'strategy', 'team', 'priority', 'dncList', 'schema',
    'payload', 'maxOfRetry', 'timeout', 'secBetweenRetries', 'variables', 'calendar', 'description'];

export const strategiesList = {
    'random': 'Random',
    'strict-circuit': 'Strict circuit',
    'next-try-circuit': 'Next try circuit',
    'by-buckets': 'By buckets',
    'by-skills': 'By skills',
};

export const getQueuesList = async (page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId || undefined;
    const defaultObject = {
        type: 0,
        enabled: false,
        activeCalls: 'undefined',
        waiting: 'undefined',
        priority: '0',
        _isSelected: false,
    };
    if (search && search.slice(-1) !== '*') search += '*';

    try {
        const response = await queueService.searchQueue(page, size, search, domainId);
        if (response.items) {
            return response.items.map(item => {
                return {...defaultObject, ...item};
            });
        }
        return []
    } catch (err) {
        throw err;
    }
};

export const getQueue = async (id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    const defaultObject = {
        name: '',
        id: 0,
        payload: {},
        calendar: {},
        priority: '0',
        dncList: {}, // blacklist
        schema: {},
        team: {},
        strategy: {},
        description: 'DESCRIPTION',
        variables: [{key: '', value: ''}],
        _dirty: false,
    };

    try {
        let response = await queueService.readQueue(id, domainId);
        if (response.variables) {
            response.variables = Object.keys(response.variables).map(key => {
                return {key, value: response.variables[key]}
            });
        }
        if (response.priority) response.priority += '';
        response.strategy = {
            name: strategiesList[response.strategy],
            value: response.strategy,
        };
        return {...defaultObject, ...response};
    } catch (err) {
        throw err;
    }
};

export const addQueue = async (item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    if(itemCopy.strategy) itemCopy.strategy = itemCopy.strategy.value;
    sanitizer(itemCopy, fieldsToSend);
    itemCopy.variables = {};
    item.variables.forEach(variable => {
        itemCopy.variables[variable.key] = variable.value;
    });
    try {
        const response = await queueService.createQueue(itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const patchQueue = async (id, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    try {
        await queueService.patchQueue(id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const updateQueue = async (id, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    itemCopy.strategy = itemCopy.strategy.value;
    sanitizer(itemCopy, fieldsToSend);
    itemCopy.variables = {};
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
    const domainId = store.state.userinfo.domainId || undefined;
    try {
        await queueService.deleteQueue(id, domainId);
    } catch (err) {
        throw err;
    }
};

export const getQueuePermissions = async (id, page = 0, size = 10, search) => {
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

export const patchQueuePermissions = async (id, item) => {
    const url = BASE_URL + '/' + id + '/acl';

    try {
        await instance.patch(url, {changes: item});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (error) {
        throw error;
    }
};