import deepMerge from 'deepmerge';
import { QueueServiceApiFactory } from 'webitel-sdk';
import { SdkListGetterApiConsumer } from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import SDKDeleter from '../../../../../app/api/BaseAPIServices/Deleter/SDKDeleter';
import SDKPatcher from '../../../../../app/api/BaseAPIServices/Patcher/SDKPatcher';
import SDKUpdater from '../../../../../app/api/BaseAPIServices/Updater/SDKUpdater';
import SDKCreator from '../../../../../app/api/BaseAPIServices/Creator/SDKCreator';
import SDKGetter from '../../../../../app/api/BaseAPIServices/Getter/SDKGetter';
import SDKListGetter from '../../../../../app/api/BaseAPIServices/ListGetter/SDKListGetter';

const queueService = new QueueServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'type', 'strategy', 'team', 'priority', 'dncList', 'schema',
  'payload', 'maxOfRetry', 'timeout', 'secBetweenRetries', 'variables', 'calendar', 'description',
  'enabled', 'ringtone', 'doSchema', 'afterSchema', 'processing', 'processingSec', 'processingRenewalSec',
  'stickyAgent'];

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
const itemCreator = new SDKCreator(queueService.createQueue,
  { fieldsToSend, preRequestHandler });
const itemUpdater = new SDKUpdater(queueService.updateQueue,
  { fieldsToSend, preRequestHandler });
const itemPatcher = new SDKPatcher(queueService.patchQueue, { fieldsToSend });
const itemDeleter = new SDKDeleter(queueService.deleteQueue);

export const getQueuesList = (params) => listGetter.getList(params);
export const getQueue = (params) => itemGetter.getItem(params);
export const addQueue = (params) => itemCreator.createItem(params);
export const updateQueue = (params) => itemUpdater.updateItem(params);
export const patchQueue = (params) => itemPatcher.patchItem(params);
export const deleteQueue = (params) => itemDeleter.deleteItem(params);


// FIXME REFACTOR ALL COMPONENTS WITH WEBITEL-SDK CONSUMERS
const _listGetter = new SdkListGetterApiConsumer(queueService.searchQueue);
const getQueuesLookup = (params) => _listGetter.getLookup(params);

export default {
  getList: getQueuesList,
  get: getQueue,
  add: addQueue,
  patch: patchQueue,
  update: updateQueue,
  delete: deleteQueue,
  getLookup: getQueuesLookup,
};
