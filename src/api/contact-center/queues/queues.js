import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {QueueServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import {coerceObjectPermissionsResponse} from "../../permissions/objects/objects";
import deepCopy from 'deep-copy';
import store from '../../../store/store';
import {
    WebitelSDKItemCreator, WebitelSDKItemDeleter,
    WebitelSDKItemGetter,
    WebitelSDKItemUpdater,
    WebitelSDKListGetter
} from "../../utils/apiControllers";

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

const defaultListObject = {
    type: 0,
    enabled: false,
    activeCalls: 'undefined',
    waiting: 'undefined',
    priority: '0',
    _isSelected: false,
};

const defaultItemObject = {
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

const listGetter = new WebitelSDKListGetter(queueService.searchQueue, defaultListObject);
const itemGetter = new WebitelSDKItemGetter(queueService.readQueue, defaultItemObject);
const itemCreator = new WebitelSDKItemCreator(queueService.createQueue, fieldsToSend);
const itemUpdater = new WebitelSDKItemUpdater(queueService.updateQueue, fieldsToSend);
const itemDeleter = new WebitelSDKItemDeleter(queueService.deleteQueue);

itemGetter.responseHandler = (response) => {
    try {
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
        return {...defaultItemObject, ...response};
    } catch (err) {
        throw err;
    }
};

export const getQueuesList = async (page = 0, size = 10, search) => {
    return await listGetter.getList({page, size, search});
};

export const getQueue = async (id) => {
    return await itemGetter.getItem(id);
};

export const addQueue = async (item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    if(itemCopy.strategy) itemCopy.strategy = itemCopy.strategy.value;
    itemCopy.variables = {};
    item.variables.forEach(variable => {
        itemCopy.variables[variable.key] = variable.value;
    });
    return await itemCreator.createItem(itemCopy);
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
    itemCopy.variables = {};
    item.variables.forEach(variable => {
        itemCopy.variables[variable.key] = variable.value;
    });
    return await itemUpdater.updateItem(id, itemCopy);
};

export const deleteQueue = async (id) => {
    return await itemDeleter.deleteItem(id);
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