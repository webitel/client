import { BucketServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import { WebitelSDKItemDeleter } from '../../utils/ApiControllers/Deleter/SDKDeleter';
import { WebitelSDKItemUpdater } from '../../utils/ApiControllers/Updater/SDKUpdater';
import { WebitelSDKItemCreator } from '../../utils/ApiControllers/Creator/SDKCreator';
import { WebitelSDKItemGetter } from '../../utils/ApiControllers/Getter/SDKGetter';
import { WebitelSDKListGetter } from '../../utils/ApiControllers/ListGetter/SDKListGetter';

const bucketService = new BucketServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['domainId', 'name', 'description'];

const listGetter = new WebitelSDKListGetter(bucketService.searchBucket);
const itemGetter = new WebitelSDKItemGetter(bucketService.readBucket);
const itemCreator = new WebitelSDKItemCreator(bucketService.createBucket, fieldsToSend);
const itemUpdater = new WebitelSDKItemUpdater(bucketService.updateBucket, fieldsToSend);
const itemDeleter = new WebitelSDKItemDeleter(bucketService.deleteBucket);

export const getBucketsList = async (page = 0, size = 10, search) => await listGetter.getList({
  page,
  size,
  search,
});

export const getBucket = async (id) => await itemGetter.getItem(id);

export const addBucket = async (item) => await itemCreator.createItem(item);

export const updateBucket = async (id, item) => await itemUpdater.updateItem(id, item);

export const deleteBucket = async (id) => await itemDeleter.deleteItem(id);