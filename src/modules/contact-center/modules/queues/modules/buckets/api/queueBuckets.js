import { QueueBucketServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkDeleterApiConsumer,
  SdkPatcherApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const queueBucketsService = new QueueBucketServiceApiFactory(configuration, '', instance);

const defaultListObject = {
  priority: 0,
  disabled: false,
};

const defaultSingleObject = {
  priority: 0,
  disabled: false,
};

const fieldsToSend = ['bucket', 'priority', 'queueId', 'disabled'];

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
const itemPatcher = new SdkPatcherApiConsumer(queueBucketsService.patchQueueBucket,
  { fieldsToSend });

const getQueueBucketsList = (params) => listGetter.getNestedList(params);
const getQueueBucket = (params) => itemGetter.getNestedItem(params);
const addQueueBucket = (params) => itemCreator.createNestedItem(params);
const updateQueueBucket = (params) => itemUpdater.updateNestedItem(params);
const deleteQueueBucket = (params) => itemDeleter.deleteNestedItem(params);
const patchQueueBucket = (params) => itemPatcher.patchNestedItem(params);

const QueueBucketsAPI = {
  getList: getQueueBucketsList,
  get: getQueueBucket,
  add: addQueueBucket,
  update: updateQueueBucket,
  delete: deleteQueueBucket,
  patch: patchQueueBucket,
};

export default QueueBucketsAPI;
