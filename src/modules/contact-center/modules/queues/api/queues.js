import deepMerge from 'deepmerge';
import { QueueServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkPatcherApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

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
  team: {},
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

const listGetter = new SdkListGetterApiConsumer(queueService.searchQueue, { defaultListObject });
const itemGetter = new SdkGetterApiConsumer(queueService.readQueue,
  { defaultSingleObject, itemResponseHandler });
const itemCreator = new SdkCreatorApiConsumer(queueService.createQueue,
  { fieldsToSend, preRequestHandler });
const itemUpdater = new SdkUpdaterApiConsumer(queueService.updateQueue,
  { fieldsToSend, preRequestHandler });
const itemPatcher = new SdkPatcherApiConsumer(queueService.patchQueue, { fieldsToSend });
const itemDeleter = new SdkDeleterApiConsumer(queueService.deleteQueue);

const getQueuesList = (params) => listGetter.getList(params);
const getQueue = (params) => itemGetter.getItem(params);
const addQueue = (params) => itemCreator.createItem(params);
const updateQueue = (params) => itemUpdater.updateItem(params);
const patchQueue = (params) => itemPatcher.patchItem(params);
const deleteQueue = (params) => itemDeleter.deleteItem(params);
const getQueuesLookup = (params) => listGetter.getLookup(params);

const QueuesAPI = {
  getList: getQueuesList,
  get: getQueue,
  add: addQueue,
  patch: patchQueue,
  update: updateQueue,
  delete: deleteQueue,
  getLookup: getQueuesLookup,
};

export default QueuesAPI;
