import { QueueResourcesServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const queueResService = new QueueResourcesServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['resourceGroup', 'queueId'];

const preRequestHandler = (item, parentId) => ({ ...item, queueId: parentId });

const listGetter = new SdkListGetterApiConsumer(queueResService.searchQueueResourceGroup);
const itemGetter = new SdkGetterApiConsumer(queueResService.readQueueResourceGroup);
const itemCreator = new SdkCreatorApiConsumer(queueResService.createQueueResourceGroup,
  { fieldsToSend, preRequestHandler });
const itemUpdater = new SdkUpdaterApiConsumer(queueResService.updateQueueResourceGroup,
  { fieldsToSend, preRequestHandler });
const itemDeleter = new SdkDeleterApiConsumer(queueResService.deleteQueueResourceGroup);

export const getQueueResGroupsList = (params) => listGetter.getNestedList(params);
export const getQueueResGroup = (params) => itemGetter.getNestedItem(params);
export const addQueueResGroup = (params) => itemCreator.createNestedItem(params);
export const updateQueueResGroup = (params) => itemUpdater.updateNestedItem(params);
export const deleteQueueResGroup = (params) => itemDeleter.deleteNestedItem(params);

export default {
  getList: getQueueResGroupsList,
  get: getQueueResGroup,
  add: addQueueResGroup,
  update: updateQueueResGroup,
  delete: deleteQueueResGroup,
};
