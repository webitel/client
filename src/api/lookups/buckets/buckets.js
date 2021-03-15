import { BucketServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKItemDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';
import SDKItemUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKItemCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';

const bucketService = new BucketServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'description'];

const listGetter = new SDKListGetter(bucketService.searchBucket);
const itemGetter = new SDKGetter(bucketService.readBucket);
const itemCreator = new SDKItemCreator(bucketService.createBucket, fieldsToSend);
const itemUpdater = new SDKItemUpdater(bucketService.updateBucket, fieldsToSend);
const itemDeleter = new SDKItemDeleter(bucketService.deleteBucket);

export const getBucketsList = (params) => listGetter.getList(params);
export const getBucket = (params) => itemGetter.getItem(params);
export const addBucket = (params) => itemCreator.createItem(params);
export const updateBucket = (params) => itemUpdater.updateItem(params);
export const deleteBucket = ({ id }) => itemDeleter.deleteItem(id);

export default {
  getList: getBucketsList,
  get: getBucket,
  add: addBucket,
  update: updateBucket,
  delete: deleteBucket,
};
