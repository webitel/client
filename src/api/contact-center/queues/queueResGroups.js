import { QueueResourcesServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';
import SDKGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';

const queueResService = new QueueResourcesServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['resourceGroup', 'queueId'];

const preRequestHandler = (item, parentId) => ({ ...item, queueId: parentId });

const listGetter = new SDKListGetter(queueResService.searchQueueResourceGroup);
const itemGetter = new SDKGetter(queueResService.readQueueResourceGroup);
const itemCreator = new SDKCreator(queueResService.createQueueResourceGroup,
  { fieldsToSend, preRequestHandler });
const itemUpdater = new SDKUpdater(queueResService.updateQueueResourceGroup,
  fieldsToSend, preRequestHandler);
const itemDeleter = new SDKDeleter(queueResService.deleteQueueResourceGroup);

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
