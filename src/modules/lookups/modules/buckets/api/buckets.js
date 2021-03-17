import { BucketServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import SDKDeleter from '../../../../../app/api/BaseAPIServices/Deleter/SDKDeleter';
import SDKUpdater from '../../../../../app/api/BaseAPIServices/Updater/SDKUpdater';
import SDKCreator from '../../../../../app/api/BaseAPIServices/Creator/SDKCreator';
import SDKGetter from '../../../../../app/api/BaseAPIServices/Getter/SDKGetter';
import SDKListGetter from '../../../../../app/api/BaseAPIServices/ListGetter/SDKListGetter';

const bucketService = new BucketServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'description'];

const listGetter = new SDKListGetter(bucketService.searchBucket);
const itemGetter = new SDKGetter(bucketService.readBucket);
const itemCreator = new SDKCreator(bucketService.createBucket, fieldsToSend);
const itemUpdater = new SDKUpdater(bucketService.updateBucket, fieldsToSend);
const itemDeleter = new SDKDeleter(bucketService.deleteBucket);

export const getBucketsList = (params) => listGetter.getList(params);
export const getBucket = (params) => itemGetter.getItem(params);
export const addBucket = (params) => itemCreator.createItem(params);
export const updateBucket = (params) => itemUpdater.updateItem(params);
export const deleteBucket = (params) => itemDeleter.deleteItem(params);

export default {
  getList: getBucketsList,
  get: getBucket,
  add: addBucket,
  update: updateBucket,
  delete: deleteBucket,
};
