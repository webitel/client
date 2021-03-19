import { QueueHookServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';
import SDKListGetter from '../../../../../../../app/api/BaseAPIServices/ListGetter/SDKListGetter';
import SDKGetter from '../../../../../../../app/api/BaseAPIServices/Getter/SDKGetter';
import SDKCreator from '../../../../../../../app/api/BaseAPIServices/Creator/SDKCreator';
import SDKPatcher from '../../../../../../../app/api/BaseAPIServices/Patcher/SDKPatcher';
import SDKUpdater from '../../../../../../../app/api/BaseAPIServices/Updater/SDKUpdater';
import SDKDeleter from '../../../../../../../app/api/BaseAPIServices/Deleter/SDKDeleter';

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

const listGetter = new SDKListGetter(queueHookService.searchQueueHook, { defaultListObject });
const itemGetter = new SDKGetter(queueHookService.readQueueHook, { defaultSingleObject });
const itemCreator = new SDKCreator(queueHookService.createQueueHook,
  { fieldsToSend, preRequestHandler });
const itemPatcher = new SDKPatcher(queueHookService.patchQueueHook);
const itemUpdater = new SDKUpdater(queueHookService.updateQueueHook,
  { fieldsToSend, preRequestHandler });
const itemDeleter = new SDKDeleter(queueHookService.deleteQueueHook);

export const getQueueHooksList = (params) => listGetter.getNestedList(params);
export const getQueueHook = (params) => itemGetter.getNestedItem(params);
export const addQueueHook = (params) => itemCreator.createNestedItem(params);
export const patchQueueHook = (params) => itemPatcher.patchNestedItem(params);
export const updateQueueHook = (params) => itemUpdater.updateNestedItem(params);
export const deleteQueueHook = (params) => itemDeleter.deleteNestedItem(params);

export default {
  getList: getQueueHooksList,
  get: getQueueHook,
  add: addQueueHook,
  patch: patchQueueHook,
  update: updateQueueHook,
  delete: deleteQueueHook,
};
