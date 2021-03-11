import { QueueBucketServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';
import SDKGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';

const queueBucketsService = new QueueBucketServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['bucket', 'ratio', 'queueId'];

const defaultListObject = {
  ratio: 0,
  _isSelected: false,
};

const defaultObject = {
  ratio: 0,
  _dirty: false,
};

const preRequestHandler = (item, parentId) => ({ ...item, queueId: parentId });

const listGetter = new SDKListGetter(queueBucketsService.searchQueueBucket, defaultListObject);
const itemGetter = new SDKGetter(queueBucketsService.readQueueBucket, defaultObject);
const itemCreator = new SDKCreator(queueBucketsService.createQueueBucket,
  fieldsToSend, preRequestHandler);
const itemUpdater = new SDKUpdater(queueBucketsService.updateQueueBucket,
  fieldsToSend, preRequestHandler);
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
