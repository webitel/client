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

const getBucketsList = (params) => listGetter.getList(params);
const getBucket = (params) => itemGetter.getItem(params);
const addBucket = (params) => itemCreator.createItem(params);
const updateBucket = (params) => itemUpdater.updateItem(params);
const deleteBucket = (params) => itemDeleter.deleteItem(params);
const getBucketsLookup = (params) => listGetter.getLookup(params);

const BucketsAPI = {
  getList: getBucketsList,
  get: getBucket,
  add: addBucket,
  update: updateBucket,
  delete: deleteBucket,
  getLookup: getBucketsLookup,
};

export default BucketsAPI;
