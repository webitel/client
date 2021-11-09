import { QueueBucketServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const queueBucketsService = new QueueBucketServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['bucket', 'ratio', 'queueId'];

const defaultListObject = {
  ratio: 0,
};

const defaultSingleObject = {
  ratio: 0,
};

const preRequestHandler = (item, parentId) => ({ ...item, queueId: parentId });

const listGetter = new SdkListGetterApiConsumer(queueBucketsService.searchQueueBucket,
  { defaultListObject });
const itemGetter = new SdkGetterApiConsumer(queueBucketsService.readQueueBucket,
  { defaultSingleObject });
const itemCreator = new SdkCreatorApiConsumer(queueBucketsService.createQueueBucket,
  { fieldsToSend, preRequestHandler });
const itemUpdater = new SdkUpdaterApiConsumer(queueBucketsService.updateQueueBucket,
  { fieldsToSend, preRequestHandler });
const itemDeleter = new SdkDeleterApiConsumer(queueBucketsService.deleteQueueBucket);

export const getQueueBucketsList = (params) => listGetter.getNestedList(params);
export const getQueueBucket = (params) => itemGetter.getNestedItem(params);
export const addQueueBucket = (params) => itemCreator.createNestedItem(params);
export const updateQueueBucket = (params) => itemUpdater.updateNestedItem(params);
export const deleteQueueBucket = (params) => itemDeleter.deleteNestedItem(params);

const QueueBucketsAPI = {
  getList: getQueueBucketsList,
  get: getQueueBucket,
  add: addQueueBucket,
  update: updateQueueBucket,
  delete: deleteQueueBucket,
};

export default QueueBucketsAPI;
