import { QueueServiceApiFactory } from 'webitel-sdk';
import deepMerge from 'deepmerge';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKItemDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';
import SDKItemPatcher from '../../utils/ApiControllers/Patcher/SDKPatcher';
import SDKItemUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKItemCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';

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
};

const defaultSingleObject = {
  type: 0,
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
    return deepMerge(defaultSingleObject, response);
  } catch (err) {
    throw err;
  }
};

const listGetter = new SDKListGetter(queueService.searchQueue, { defaultListObject });
const itemGetter = new SDKGetter(queueService.readQueue,
  { defaultSingleObject, itemResponseHandler });
const itemCreator = new SDKItemCreator(queueService.createQueue,
  fieldsToSend, preRequestHandler);
const itemUpdater = new SDKItemUpdater(queueService.updateQueue,
  fieldsToSend, preRequestHandler);
const itemPatcher = new SDKItemPatcher(queueService.patchQueue, fieldsToSend);
const itemDeleter = new SDKItemDeleter(queueService.deleteQueue);

export const getQueuesList = (params) => listGetter.getList(params);
export const getQueue = (params) => itemGetter.getItem(params);
export const addQueue = (params) => itemCreator.createItem(params);
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
