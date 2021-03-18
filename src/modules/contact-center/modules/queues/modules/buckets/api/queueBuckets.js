import { QueueBucketServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';
import SDKListGetter from '../../../../../../../app/api/BaseAPIServices/ListGetter/SDKListGetter';
import SDKGetter from '../../../../../../../app/api/BaseAPIServices/Getter/SDKGetter';
import SDKCreator from '../../../../../../../app/api/BaseAPIServices/Creator/SDKCreator';
import SDKUpdater from '../../../../../../../app/api/BaseAPIServices/Updater/SDKUpdater';
import SDKDeleter from '../../../../../../../app/api/BaseAPIServices/Deleter/SDKDeleter';

const queueBucketsService = new QueueBucketServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['bucket', 'ratio', 'queueId'];

const defaultListObject = {
  ratio: 0,
};

const defaultSingleObject = {
  ratio: 0,
};

const preRequestHandler = (item, parentId) => ({ ...item, queueId: parentId });

const listGetter = new SDKListGetter(queueBucketsService.searchQueueBucket, { defaultListObject });
const itemGetter = new SDKGetter(queueBucketsService.readQueueBucket, { defaultSingleObject });
const itemCreator = new SDKCreator(queueBucketsService.createQueueBucket,
  { fieldsToSend, preRequestHandler });
const itemUpdater = new SDKUpdater(queueBucketsService.updateQueueBucket,
  { fieldsToSend, preRequestHandler });
const itemDeleter = new SDKDeleter(queueBucketsService.deleteQueueBucket);

export const getQueueBucketsList = (params) => listGetter.getNestedList(params);
export const getQueueBucket = (params) => itemGetter.getNestedItem(params);
export const addQueueBucket = (params) => itemCreator.createNestedItem(params);
export const updateQueueBucket = (params) => itemUpdater.updateNestedItem(params);
export const deleteQueueBucket = (params) => itemDeleter.deleteNestedItem(params);

export default {
  getList: getQueueBucketsList,
  get: getQueueBucket,
  add: addQueueBucket,
  update: updateQueueBucket,
  delete: deleteQueueBucket,
};