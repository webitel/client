import { BucketServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const bucketService = new BucketServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'description'];

const listGetter = new SdkListGetterApiConsumer(bucketService.searchBucket);
const itemGetter = new SdkGetterApiConsumer(bucketService.readBucket);
const itemCreator = new SdkCreatorApiConsumer(bucketService.createBucket, { fieldsToSend });
const itemUpdater = new SdkUpdaterApiConsumer(bucketService.updateBucket, { fieldsToSend });
const itemDeleter = new SdkDeleterApiConsumer(bucketService.deleteBucket);

export const getBucketsList = (params) => listGetter.getList(params);
export const getBucket = (params) => itemGetter.getItem(params);
export const addBucket = (params) => itemCreator.createItem(params);
export const updateBucket = (params) => itemUpdater.updateItem(params);
export const deleteBucket = (params) => itemDeleter.deleteItem(params);
const getBucketsLookup = (params) => listGetter.getLookup(params);

export default {
  getList: getBucketsList,
  get: getBucket,
  add: addBucket,
  update: updateBucket,
  delete: deleteBucket,
  getLookup: getBucketsLookup,
};
