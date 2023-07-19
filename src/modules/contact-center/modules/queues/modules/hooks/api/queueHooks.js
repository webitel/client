import { QueueHookServiceApiFactory } from 'webitel-sdk';
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
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const queueHookService = new QueueHookServiceApiFactory(configuration, '', instance);

// const defaultListObject = {
//   enabled: false,
// };
//
// const defaultSingleObject = {
//   event: '',
//   properties: [],
//   schema: {},
//   enabled: false,
// };

const fieldsToSend = ['event', 'properties', 'schema', 'enabled'];

const preRequestHandler = (parentId) => (item) => ({ ...item, queueId: parentId });

// const listGetter = new SdkListGetterApiConsumer(queueHookService.searchQueueHook, { defaultListObject });
const getQueueHooksList = async (params) => {
  const fieldsToSend = ['page', 'size', 'search', 'sort', 'fields', 'id', 'parentId'];

  const defaultObject = {
    enabled: false,
  };

  const {
    page,
    size,
    search,
    sort,
    fields,
    id,
    parentId,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
    sanitize(fieldsToSend),
  ]);

  try {
    const response = await queueHookService.searchQueueHook(
      parentId,
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

// const itemGetter = new SdkGetterApiConsumer(queueHookService.readQueueHook, { defaultSingleObject });
// const getQueueHook = (params) => itemGetter.getNestedItem(params);
const getQueueHook = async ({ parentId, itemId: id }) => {
  const defaultObject = {
    event: '',
    properties: [],
    schema: {},
    enabled: false,
  };

  try {
    const response = await queueHookService.readQueueHook(parentId, id);
    return applyTransform(response.data, [
      snakeToCamel(),
      merge(defaultObject),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

// const itemCreator = new SdkCreatorApiConsumer(queueHookService.createQueueHook,
//   { fieldsToSend, preRequestHandler });
const addQueueHook = async ({ parentId, itemInstance }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler(parentId),
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await queueHookService.createQueueHook(parentId, item);
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

// const itemPatcher = new SdkPatcherApiConsumer(queueHookService.patchQueueHook);
const patchQueueHook = async ({ changes, id, parentId }) => {
  const fieldsToSend = ['page', 'size', 'search', 'sort', 'fields', 'id', 'parentId'];
  const body = applyTransform(changes, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);

  try {
    const response = await queueHookService.patchQueueHook(parentId, id, body);
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

// const itemUpdater = new SdkUpdaterApiConsumer(queueHookService.updateQueueHook,
//   { fieldsToSend, preRequestHandler });
const updateQueueHook = async ({ itemInstance, itemId: id, parentId }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler(parentId),
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await queueHookService.updateQueueHook(parentId, id, item);
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

// const itemDeleter = new SdkDeleterApiConsumer(queueHookService.deleteQueueHook);
const deleteQueueHook = async ({ parentId, id }) => {
  try {
    const response = await queueHookService.deleteQueueHook(parentId, id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const QueueHooksAPI = {
  getList: getQueueHooksList,
  get: getQueueHook,
  add: addQueueHook,
  patch: patchQueueHook,
  update: updateQueueHook,
  delete: deleteQueueHook,
};

export default QueueHooksAPI;
