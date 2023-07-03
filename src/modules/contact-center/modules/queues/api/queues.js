import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake, generateUrl, handleUnauthorized,
  merge, mergeEach, notify, sanitize, snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers';
import isEmpty from '@webitel/ui-sdk/src/scripts/isEmpty';
import { de } from 'cronstrue/dist/i18n/locales/de';
import deepMerge from 'deepmerge';
import deepCopy from 'deep-copy';
import { QueueServiceApiFactory } from 'webitel-sdk';
// import {
//   SdkListGetterApiConsumer,
//   SdkGetterApiConsumer,
//   SdkCreatorApiConsumer,
//   SdkUpdaterApiConsumer,
//   SdkPatcherApiConsumer,
//   SdkDeleterApiConsumer,
// } from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import processing from '../store/_internals/queueSchema/defaults/processing';

// const queueService = new QueueServiceApiFactory(configuration, '', instance);
const baseUrl = '/queues';
// const defaultListObject = {
//   type: 0,
//   enabled: false,
//   active: 0,
//   waiting: 0,
//   priority: '0',
// };

// const defaultSingleObject = {
//   type: 0,
//   formSchema: {},
//   taskProcessing: {},
// };

// const preRequestHandler = (item) => {
//   // eslint-disable-next-line no-param-reassign
//   item.variables = item.variables.reduce((variables, variable) => {
//     if (!variable.key) return variables;
//     return { ...variables, [variable.key]: variable.value };
//   }, {});
//   console.info(item);
//   return item;
// };

// const itemResponseHandler = (response) => {
//   try {
//     if (response.variables) {
//       // eslint-disable-next-line no-param-reassign
//       response.variables = Object.keys(response.variables)
//                                  .map((key) => ({
//                                    key,
//                                    value: response.variables[key],
//                                  }));
//     }
//     if (isEmpty(response.taskProcessing)) {
//       // eslint-disable-next-line no-param-reassign
//       response.taskProcessing = processing({
//         enabled: !!response.processing,
//         formSchema: response.formSchema,
//         sec: response.processingSec || 0,
//         renewalSec: response.processingRenewalSec || 0,
//       });
//     }
//     return deepMerge(defaultSingleObject, response);
//   } catch (err) {
//     throw err;
//   }
// };

// const listGetter = new SdkListGetterApiConsumer(queueService.searchQueue, { defaultListObject });
// const itemGetter = new SdkGetterApiConsumer(queueService.readQueue,
//   { defaultSingleObject, itemResponseHandler, });
// const itemCreator = new SdkCreatorApiConsumer(queueService.createQueue,
//   { fieldsToSend, preRequestHandler, });
// const itemUpdater = new SdkUpdaterApiConsumer(queueService.updateQueue,
//   {
//     fieldsToSend,
//     preRequestHandler,
//   },
// );
// const itemPatcher = new SdkPatcherApiConsumer(queueService.patchQueue, { fieldsToSend });
// const itemDeleter = new SdkDeleterApiConsumer(queueService.deleteQueue);

// const _getQueuesLookup = (getList) => function ({
//   page,
//   size,
//   search,
//   sort,
//   fields = ['id', 'name', 'type'],
//                                                   id,
//   type,
//                                                }) {
//   const params = [page, size, search, sort, fields, id, type];
//   return getList(params);
// };
//
// const lookupListGetter = new SdkListGetterApiConsumer(queueService.searchQueue)
//   .setGetListMethod(_getQueuesLookup);

const getQueuesList = async (params) => {
  const fieldsToSend = ['page', 'size', 'q', 'fields', 'id'];

  const defaultObject = {
    type: 0,
    enabled: false,
    active: 0,
    waiting: 0,
    priority: '0',
  };

  const url = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
    (params) => ({ ...params, q: params.search }),
    sanitize(fieldsToSend),
    camelToSnake(),
    generateUrl(baseUrl),
  ]);
  try {
    const response = await instance.get(url);
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
  const defaultObject = {
    type: 0,
    formSchema: {},
    taskProcessing: {},
  };

  const itemResponseHandler = (item) => {
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
      return deepMerge(defaultObject, copyItem);
    } catch (err) {
      throw err;
    }
  };

  const url = `${baseUrl}/${id}`;

  try {
    const response = await instance.get(url);
    return applyTransform(response.data, [
      snakeToCamel(),
      merge(defaultObject),
      itemResponseHandler,
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

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
const addQueue = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await instance.post(baseUrl, item);
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

  const url = `${baseUrl}/${id}`;
  try {
    const response = await instance.put(url, item);
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
const patchQueue = async ({ changes, id }) => {
  const body = applyTransform(changes, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  const url = `${baseUrl}/${id}`;
  try {
    const response = await instance.patch(url, body);
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
  const url = `${baseUrl}/${id}`;
  try {
    const response = await instance.delete(url);
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
  fields: params.fields || ['id', 'name'],
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
