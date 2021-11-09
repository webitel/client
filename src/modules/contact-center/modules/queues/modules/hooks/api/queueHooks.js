import { QueueHookServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkPatcherApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const queueHookService = new QueueHookServiceApiFactory(configuration, '', instance);

const defaultListObject = {
  enabled: false,
};

const defaultSingleObject = {
  event: '',
  properties: [],
  schema: {},
  enabled: false,
};

const fieldsToSend = ['event', 'properties', 'schema', 'enabled'];

const preRequestHandler = (item, parentId) => ({ ...item, queueId: parentId });

const listGetter = new SdkListGetterApiConsumer(queueHookService.searchQueueHook, { defaultListObject });
const itemGetter = new SdkGetterApiConsumer(queueHookService.readQueueHook, { defaultSingleObject });
const itemCreator = new SdkCreatorApiConsumer(queueHookService.createQueueHook,
  { fieldsToSend, preRequestHandler });
const itemPatcher = new SdkPatcherApiConsumer(queueHookService.patchQueueHook);
const itemUpdater = new SdkUpdaterApiConsumer(queueHookService.updateQueueHook,
  { fieldsToSend, preRequestHandler });
const itemDeleter = new SdkDeleterApiConsumer(queueHookService.deleteQueueHook);

export const getQueueHooksList = (params) => listGetter.getNestedList(params);
export const getQueueHook = (params) => itemGetter.getNestedItem(params);
export const addQueueHook = (params) => itemCreator.createNestedItem(params);
export const patchQueueHook = (params) => itemPatcher.patchNestedItem(params);
export const updateQueueHook = (params) => itemUpdater.updateNestedItem(params);
export const deleteQueueHook = (params) => itemDeleter.deleteNestedItem(params);

const QueueHooksAPI = {
  getList: getQueueHooksList,
  get: getQueueHook,
  add: addQueueHook,
  patch: patchQueueHook,
  update: updateQueueHook,
  delete: deleteQueueHook,
};

export default QueueHooksAPI;
