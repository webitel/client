import { QueueServiceApiFactory } from 'webitel-sdk';
import deepCopy from 'deep-copy';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import store from '../../../store/store';
import WebitelAPIPermissionsGetter from '../../utils/ApiControllers/Permissions/WebitelAPIPermissionsGetter';
import WebitelAPIPermissionsPatcher from '../../utils/ApiControllers/Permissions/WebitelAPIPermissionsPatcher';
import { WebitelSDKItemDeleter } from '../../utils/ApiControllers/Deleter/SDKDeleter';
import { WebitelSDKItemPatcher } from '../../utils/ApiControllers/Patcher/SDKPatcher';
import { WebitelSDKItemUpdater } from '../../utils/ApiControllers/Updater/SDKUpdater';
import { WebitelSDKItemCreator } from '../../utils/ApiControllers/Creator/SDKCreator';
import { WebitelSDKItemGetter } from '../../utils/ApiControllers/Getter/SDKGetter';
import { WebitelSDKListGetter } from '../../utils/ApiControllers/ListGetter/SDKListGetter';


const queueService = new QueueServiceApiFactory(configuration, '', instance);

const BASE_URL = '/call_center/queues';
const fieldsToSend = ['domainId', 'name', 'type', 'strategy', 'team', 'priority', 'dncList', 'schema',
    'payload', 'maxOfRetry', 'timeout', 'secBetweenRetries', 'variables', 'calendar', 'description', 'enabled', 'ringtone'];

export const strategiesList = {    
    'fifo': 'FIFO',
    'lifo': 'LIFO',
};

const defaultListObject = {
    type: 0,
    enabled: false,
    active: 0,
    waiting: 0,
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
    ringtone: {},
    strategy: {},
    description: 'DESCRIPTION',
    variables: [{ key: '', value: '' }],
    _dirty: false,
};

const preRequestHandler = (item) => {
    const itemCopy = deepCopy(item);
    item.domainId = store.state.userinfo.domainId;
    if (item.strategy) item.strategy = item.strategy.value;
    if (item.priority) item.priority = +item.priority.value;
    item.variables = {};
    itemCopy.variables.forEach((variable) => {
        item.variables[variable.key] = variable.value;
    });
    return item;
};

const listGetter = new WebitelSDKListGetter(queueService.searchQueue, defaultListObject);
const itemGetter = new WebitelSDKItemGetter(queueService.readQueue, defaultItemObject);
const itemCreator = new WebitelSDKItemCreator(queueService.createQueue, fieldsToSend, preRequestHandler);
const itemUpdater = new WebitelSDKItemUpdater(queueService.updateQueue, fieldsToSend, preRequestHandler);
const itemPatcher = new WebitelSDKItemPatcher(queueService.patchQueue, fieldsToSend);
const itemDeleter = new WebitelSDKItemDeleter(queueService.deleteQueue);
const permissionsGetter = new WebitelAPIPermissionsGetter(BASE_URL);
const permissionsPatcher = new WebitelAPIPermissionsPatcher(BASE_URL);

itemGetter.responseHandler = (response) => {
    try {
        if (response.variables) {
            response.variables = Object.keys(response.variables).map((key) => ({ key, value: response.variables[key] }));
        }
        if (response.priority) {
            response.priority = {
                name: response.priority += '',
                value: response.priority += '',
            };
        }
        response.strategy = {
            name: strategiesList[response.strategy],
            value: response.strategy,
        };
        return { ...defaultItemObject, ...response };
    } catch (err) {
        throw err;
    }
};

export const getQueuesList = async (page = 0, size = 10, search) => await listGetter.getList({ page, size, search });

export const getQueue = async (id) => await itemGetter.getItem(id);

export const addQueue = async (item) => await itemCreator.createItem(item);

export const updateQueue = async (id, item) => await itemUpdater.updateItem(id, item);

export const patchQueue = async (id, item) => await itemPatcher.patchItem(id, item);

export const deleteQueue = async (id) => await itemDeleter.deleteItem(id);

export const getQueuePermissions = async (id, page = 0, size = 10, search) => await permissionsGetter.getList(id, size, search);

export const patchQueuePermissions = async (id, item) => await permissionsPatcher.patchItem(id, item);
