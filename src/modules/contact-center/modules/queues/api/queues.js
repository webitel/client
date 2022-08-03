import isEmpty from '@webitel/ui-sdk/src/scripts/isEmpty';
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
import processing from '../store/_internals/queueSchema/defaults/processing';

const queueService = new QueueServiceApiFactory(configuration, '', instance);

const fieldsToSend = [
  'name',
  'type',
  'strategy',
  'team',
  'priority',
  'dncList',
  'schema',
  'payload',
  'taskProcessing',
  'maxOfRetry',
  'timeout',
  'secBetweenRetries',
  'variables',
  'calendar',
  'description',
  'enabled',
  'ringtone',
  'doSchema',
  'afterSchema',
  'stickyAgent',
];

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
  formSchema: {},
  taskProcessing: {},
};

const preRequestHandler = (item) => {
  // eslint-disable-next-line no-param-reassign
  item.variables = item.variables.reduce((variables, variable) => {
    if (!variable.key) return variables;
    return { ...variables, [variable.key]: variable.value };
  }, {});
  console.info(item);
  return item;
};

const itemResponseHandler = (response) => {
  try {
    if (response.variables) {
      // eslint-disable-next-line no-param-reassign
      response.variables = Object.keys(response.variables)
                                 .map((key) => ({
                                   key,
                                   value: response.variables[key],
                                 }));
    }
    if (isEmpty(response.taskProcessing)) {
      // eslint-disable-next-line no-param-reassign
      response.taskProcessing = processing({
        enabled: !!response.processing,
        formSchema: response.formSchema,
        sec: response.processingSec || 0,
        renewalSec: response.processingRenewalSec || 0,
      });
    }
    return deepMerge(defaultSingleObject, response);
  } catch (err) {
    throw err;
  }
};

const listGetter = new SdkListGetterApiConsumer(queueService.searchQueue, { defaultListObject });
const itemGetter = new SdkGetterApiConsumer(
  queueService.readQueue,
  {
    defaultSingleObject,
    itemResponseHandler,
  },
);
const itemCreator = new SdkCreatorApiConsumer(
  queueService.createQueue,
  {
    fieldsToSend,
    preRequestHandler,
  },
);
const itemUpdater = new SdkUpdaterApiConsumer(
  queueService.updateQueue,
  {
    fieldsToSend,
    preRequestHandler,
  },
);
const itemPatcher = new SdkPatcherApiConsumer(queueService.patchQueue, { fieldsToSend });
const itemDeleter = new SdkDeleterApiConsumer(queueService.deleteQueue);

const _getQueuesLookup = (getList) => function ({
  page,
  size,
  search,
  sort,
  fields = ['id', 'name', 'type'],
                                                  id,
  type,
                                               }) {
  const params = [page, size, search, sort, fields, id, type];
  return getList(params);
};

const lookupListGetter = new SdkListGetterApiConsumer(queueService.searchQueue)
  .setGetListMethod(_getQueuesLookup);

const getQueuesList = (params) => listGetter.getList(params);
const getQueue = (params) => itemGetter.getItem(params);
const addQueue = (params) => itemCreator.createItem(params);
const updateQueue = (params) => itemUpdater.updateItem(params);
const patchQueue = (params) => itemPatcher.patchItem(params);
const deleteQueue = (params) => itemDeleter.deleteItem(params);
const getQueuesLookup = (params) => lookupListGetter.getList(params);

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
