import { BackendProfileServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkPatcherApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import AWSRegions from '../store/_internals/lookups/AWSRegions.lookup';
import DigitalOceanRegions from '../store/_internals/lookups/DigitalOceanRegions.lookup';
import StorageTypeAdapter from '../store/_internals/scripts/backendStorageTypeAdapters';

const storageService = new BackendProfileServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'maxSize', 'priority', 'properties', 'expireDays', 'type', 'disabled'];

const defaultListObject = {
  disabled: false,
  maxSize: 0,
  expireDays: 0,
  priority: 0,
};

const defaultSingleObject = {
  maxSize: 0,
  expireDays: 0,
  priority: 0,
};

const listResponseHandler = (response) => {
  // eslint-disable-next-line no-param-reassign
  response.items = response.list.items((item) => (
    { ...item, type: StorageTypeAdapter.backendToEnum(item.type) }
    ));
  return response;
};

const itemResponseHandler = (response) => {
  if (response.properties.region) {
    if (response.properties.endpoint.includes('aws')) {
      // eslint-disable-next-line no-param-reassign
      response.properties.region = AWSRegions
        .find((item) => item.value === response.properties.region);
    } else if (response.properties.endpoint.includes('digitalocean')) {
      // eslint-disable-next-line no-param-reassign
      response.properties.region = DigitalOceanRegions
        .find((item) => item.value === response.properties.region);
    }
  }
  return { ...response, type: StorageTypeAdapter.backendToEnum(response.type) };
};

const preRequestHandler = (item) => {
  if (item.properties.region && item.properties.region.value) {
    // eslint-disable-next-line no-param-reassign
    item.properties.region = item.properties.region.value;
  }
  // eslint-disable-next-line no-param-reassign
  item.type = StorageTypeAdapter.enumToBackend(item.type);
  return item;
};

const listGetter = new SdkListGetterApiConsumer(storageService.searchBackendProfile,
  { defaultListObject, listResponseHandler });
const itemGetter = new SdkGetterApiConsumer(storageService.readBackendProfile,
  { defaultSingleObject, itemResponseHandler });
const itemCreator = new SdkCreatorApiConsumer(storageService.createBackendProfile,
  { fieldsToSend, preRequestHandler });
const itemPatcher = new SdkPatcherApiConsumer(storageService.patchBackendProfile, { fieldsToSend });
const itemUpdater = new SdkUpdaterApiConsumer(storageService.updateBackendProfile,
  { fieldsToSend, preRequestHandler });
const itemDeleter = new SdkDeleterApiConsumer(storageService.deleteBackendProfile);

const getStorageList = (params) => listGetter.getList(params);
const getStorage = (params) => itemGetter.getItem(params);
const addStorage = (params) => itemCreator.createItem(params);
const patchStorage = (params) => itemPatcher.patchItem(params);
const updateStorage = (params) => itemUpdater.updateItem(params);
const deleteStorage = (params) => itemDeleter.deleteItem(params);

const StorageAPI = {
  getList: getStorageList,
  get: getStorage,
  add: addStorage,
  patch: patchStorage,
  update: updateStorage,
  delete: deleteStorage,
};

export default StorageAPI;
