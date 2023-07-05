import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake,
  handleUnauthorized,
  merge, mergeEach, notify, sanitize, snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers';
import { QueueServiceApiFactory } from 'webitel-sdk';
import isEmpty from '@webitel/ui-sdk/src/scripts/isEmpty';
import deepCopy from 'deep-copy';
import deepMerge from 'deepmerge';
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
  'grantee',
];

const preRequestHandler = (item) => {
  const copyItem = deepCopy(item);
  copyItem.variables = copyItem.variables.reduce((variables, variable) => {
    if (!variable.key) return variables;
    return { ...variables, [variable.key]: variable.value };
  }, {});
  console.info(copyItem);
  return copyItem;
};

const getQueuesList = async (params) => {
  const defaultObject = {
    type: 0,
    enabled: false,
    active: 0,
    waiting: 0,
    priority: '0',
  };
  const {
    page,
    size,
    search,
    sort,
    fields,
    id,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await queueService.searchQueue(
      page,
      size,
      search,
      sort,
      fields,
      id,
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, [
        mergeEach(defaultObject),
      ]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const getQueue = async ({ itemId: id }) => {
  const itemResponseHandler = (item) => {
    const defaultSingleObject = {
      type: 0,
      formSchema: {},
      taskProcessing: {},
    };
    const copyItem = deepCopy(item);
    try {
      if (copyItem.variables) {
        // eslint-disable-next-line no-param-reassign
        copyItem.variables = Object.keys(copyItem.variables)
                                   .map((key) => ({
                                     key,
                                     value: copyItem.variables[key],
                                   }));
      }
      if (isEmpty(copyItem.taskProcessing)) {
        // eslint-disable-next-line no-param-reassign
        copyItem.taskProcessing = processing({
                                               enabled: !!copyItem.processing,
                                               formSchema: copyItem.formSchema,
                                               sec: copyItem.processingSec || 0,
                                               renewalSec: copyItem.processingRenewalSec || 0,
                                             });
      }
      return deepMerge(defaultSingleObject, copyItem);
    } catch (err) {
      throw err;
    }
  };
  try {
    const response = await queueService.readQueue(id);
    return applyTransform(response.data, [
      snakeToCamel(),
      itemResponseHandler,
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const addQueue = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await queueService.createQueue(item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const updateQueue = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await queueService.updateQueue(id, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const patchQueue = async ({ id, changes }) => {
  const item = applyTransform(changes, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await queueService.patchQueue(id, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const deleteQueue = async ({ id }) => {
  try {
    const response = await queueService.deleteQueue(id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const getQueuesLookup = (params) => getQueuesList({
  ...params,
  fields: params.fields || ['id', 'name', 'type'],
});

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
