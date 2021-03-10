import { BucketServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import { WebitelSDKItemDeleter } from '../../utils/ApiControllers/Deleter/SDKDeleter';
import { WebitelSDKItemUpdater } from '../../utils/ApiControllers/Updater/SDKUpdater';
import { WebitelSDKItemCreator } from '../../utils/ApiControllers/Creator/SDKCreator';
import { WebitelSDKItemGetter } from '../../utils/ApiControllers/Getter/SDKGetter';
import { WebitelSDKListGetter } from '../../utils/ApiControllers/ListGetter/SDKListGetter';

const bucketService = new BucketServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'description'];

const listGetter = new WebitelSDKListGetter(bucketService.searchBucket);
const itemGetter = new WebitelSDKItemGetter(bucketService.readBucket);
const itemCreator = new WebitelSDKItemCreator(bucketService.createBucket, fieldsToSend);
const itemUpdater = new WebitelSDKItemUpdater(bucketService.updateBucket, fieldsToSend);
const itemDeleter = new WebitelSDKItemDeleter(bucketService.deleteBucket);

export const getBucketsList = (params) => listGetter.getList(params);
export const getBucket = ({ itemId }) => itemGetter.getItem(itemId);
export const addBucket = ({ itemInstance }) => itemCreator.createItem(itemInstance);
export const updateBucket = ({ itemId, itemInstance }) => (
  itemUpdater.updateItem(itemId, itemInstance)
);
export const deleteBucket = ({ id }) => itemDeleter.deleteItem(id);

export default {
  getList: getBucketsList,
  get: getBucket,
  add: addBucket,
  update: updateBucket,
  delete: deleteBucket,
};
