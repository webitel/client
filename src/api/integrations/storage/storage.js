import { BackendProfileServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';
import SDKUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';
import SDKPatcher from '../../utils/ApiControllers/Patcher/SDKPatcher';
import AWSRegions from '../../../store/modules/integrations/storage/_internals/lookups/AWSRegions.lookup';
import DigitalOceanRegions from '../../../store/modules/integrations/storage/_internals/lookups/DigitalOceanRegions.lookup';
import StorageTypeAdapter from '../../../store/modules/integrations/storage/_internals/scripts/backendStorageTypeAdapters';

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
  response.list = response.list.map((item) => (
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

const listGetter = new SDKListGetter(storageService.searchBackendProfile,
  { defaultListObject, listResponseHandler });
const itemGetter = new SDKGetter(storageService.readBackendProfile,
  { defaultSingleObject, itemResponseHandler });
const itemCreator = new SDKCreator(storageService.createBackendProfile,
  fieldsToSend, preRequestHandler);
const itemPatcher = new SDKPatcher(storageService.patchBackendProfile, fieldsToSend);
const itemUpdater = new SDKUpdater(storageService.updateBackendProfile,
  fieldsToSend, preRequestHandler);
const itemDeleter = new SDKDeleter(storageService.deleteBackendProfile);

export const getStorageList = (params) => listGetter.getList(params);
export const getStorage = (params) => itemGetter.getItem(params);
export const addStorage = (params) => itemCreator.createItem(params);
export const patchStorage = (params) => itemPatcher.patchItem(params);
export const updateStorage = (params) => itemUpdater.updateItem(params);
export const deleteStorage = (params) => itemDeleter.deleteItem(params);

export default {
  getList: getStorageList,
  get: getStorage,
  add: addStorage,
  patch: patchStorage,
  update: updateStorage,
  delete: deleteStorage,
};
