import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake,
  merge,
  mergeEach,
  notify,
  sanitize,
  snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers';
import isEmpty from '@webitel/ui-sdk/src/scripts/isEmpty';
import deepCopy from 'deep-copy';
import { QueueServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import processing from '../store/_internals/queueSchema/defaults/processing';

const queueService = new QueueServiceApiFactory(configuration, '', instance);

const doNotConvertKeys = ['variables'];

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
  const copy = deepCopy(item);
  copy.variables = copy.variables.reduce((variables, variable) => {
    if (!variable.key) return variables;
    return { ...variables, [variable.key]: variable.value };
  }, {});
  return copy;
};

const getQueuesList = async (params) => {
  const defaultObject = {
    type: 0,
    enabled: false,
    active: 0,
    waiting: 0,
    priority: '0',
  };
  console.log(params);
  const {
    page,
    size,
    search,
    sort,
    fields,
    id,
    type,
    // team,
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
      [type],
      // team,
    );
    console.log(response);
    console.log(type);
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(doNotConvertKeys),
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
      notify,
    ]);
  }
};

const getQueue = async ({ itemId: id }) => {
  const defaultObject = {
    type: 0,
    formSchema: {},
    taskProcessing: {},
  };
  const responseHandler = (item) => {
    const copy = deepCopy(item);
    try {
      if (copy.variables) {
        copy.variables = Object.keys(copy.variables)
        .map((key) => ({
          key,
          value: copy.variables[key],
        }));
      }
      if (isEmpty(copy.taskProcessing)) {
        copy.taskProcessing = processing({
          enabled: !!copy.processing,
          formSchema: copy.formSchema,
          sec: copy.processingSec || 0,
          renewalSec: copy.processingRenewalSec || 0,
        });
      }
      return copy;
    } catch (err) {
      throw err;
    }
  };
  try {
    const response = await queueService.readQueue(id);
    return applyTransform(response.data, [
      snakeToCamel(doNotConvertKeys),
      merge(defaultObject),
      responseHandler,
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const addQueue = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(doNotConvertKeys),
  ]);
  try {
    const response = await queueService.createQueue(item);
    return applyTransform(response.data, [
      snakeToCamel(doNotConvertKeys),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const updateQueue = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(doNotConvertKeys),
  ]);
  try {
    const response = await queueService.updateQueue(id, item);
    return applyTransform(response.data, [
      snakeToCamel(doNotConvertKeys),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const patchQueue = async ({ id, changes }) => {
  const item = applyTransform(changes, [
    sanitize(fieldsToSend),
    camelToSnake(doNotConvertKeys),
  ]);
  try {
    const response = await queueService.patchQueue(id, item);
    return applyTransform(response.data, [
      snakeToCamel(doNotConvertKeys),
    ]);
  } catch (err) {
    throw applyTransform(err, [
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
