import { QueueServiceApiFactory } from 'webitel-sdk';
import deepMerge from 'deepmerge';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import { WebitelSDKItemDeleter } from '../../utils/ApiControllers/Deleter/SDKDeleter';
import { WebitelSDKItemPatcher } from '../../utils/ApiControllers/Patcher/SDKPatcher';
import { WebitelSDKItemUpdater } from '../../utils/ApiControllers/Updater/SDKUpdater';
import { WebitelSDKItemCreator } from '../../utils/ApiControllers/Creator/SDKCreator';
import { WebitelSDKItemGetter } from '../../utils/ApiControllers/Getter/SDKGetter';
import { WebitelSDKListGetter } from '../../utils/ApiControllers/ListGetter/SDKListGetter';

const queueService = new QueueServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'type', 'strategy', 'team', 'priority', 'dncList', 'schema',
  'payload', 'maxOfRetry', 'timeout', 'secBetweenRetries', 'variables', 'calendar', 'description',
  'enabled', 'ringtone', 'doSchema', 'afterSchema', 'processing', 'processingSec', 'processingRenewalSec'];

const defaultListObject = {
  type: 0,
  enabled: false,
  active: 0,
  waiting: 0,
  priority: '0',
  _isSelected: false,
};

const defaultItemObject = {
  type: 0,
  _dirty: false,
};

const preRequestHandler = (item) => {
  // eslint-disable-next-line no-param-reassign
  item.variables = item.variables.reduce((variables, variable) => {
    if (!variable.key) return variables;
    return { ...variables, [variable.key]: variable.value };
  }, {});
  return item;
};

const itemResponseHandler = (response) => {
  try {
    if (response.variables) {
      // eslint-disable-next-line no-param-reassign
      response.variables = Object.keys(response.variables)
        .map((key) => ({ key, value: response.variables[key] }));
    }
    return deepMerge(defaultItemObject, response);
  } catch (err) {
    throw err;
  }
};

const listGetter = new WebitelSDKListGetter(queueService.searchQueue, defaultListObject);
const itemGetter = new WebitelSDKItemGetter(queueService.readQueue,
  defaultItemObject, itemResponseHandler);
const itemCreator = new WebitelSDKItemCreator(queueService.createQueue,
  fieldsToSend, preRequestHandler);
const itemUpdater = new WebitelSDKItemUpdater(queueService.updateQueue,
  fieldsToSend, preRequestHandler);
const itemPatcher = new WebitelSDKItemPatcher(queueService.patchQueue, fieldsToSend);
const itemDeleter = new WebitelSDKItemDeleter(queueService.deleteQueue);

export const getQueuesList = (params) => listGetter.getList(params);
export const getQueue = ({ itemId }) => itemGetter.getItem(itemId);
export const addQueue = ({ itemInstance }) => itemCreator.createItem(itemInstance);
export const updateQueue = ({ itemId, itemInstance }) => (
  itemUpdater.updateItem(itemId, itemInstance)
);
export const patchQueue = ({ id, changes }) => itemPatcher.patchItem(id, changes);
export const deleteQueue = ({ id }) => itemDeleter.deleteItem(id);

export default {
  getList: getQueuesList,
  get: getQueue,
  add: addQueue,
  patch: patchQueue,
  update: updateQueue,
  delete: deleteQueue,
};
