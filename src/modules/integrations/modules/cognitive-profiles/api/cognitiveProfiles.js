import { CognitiveProfileServiceApiFactory } from 'webitel-sdk';
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

const cognitiveProfilesService = new CognitiveProfileServiceApiFactory(configuration, '', instance);

const fieldsToSend = [
  'name',
  'default',
  'enabled',
  'provider',
  'service',
  'description',
];

const defaultListObject = {
  default: false,
  enabled: false,
};

const itemResponseHandler = (response) => {
  return { ...response };
};

const preRequestHandler = (item) => {
  return { ...item, service: item.service.value };
};

const listGetter = new SdkListGetterApiConsumer(
  cognitiveProfilesService.searchCognitiveProfile,
  {
    defaultListObject,
  },
);
const itemGetter = new SdkGetterApiConsumer(
  cognitiveProfilesService.readCognitiveProfile,
  {
    itemResponseHandler,
  },
);
const itemCreator = new SdkCreatorApiConsumer(
  cognitiveProfilesService.createCognitiveProfile,
  {
    fieldsToSend,
    preRequestHandler,
  },
);
const itemPatcher = new SdkPatcherApiConsumer(
  cognitiveProfilesService.patchCognitiveProfile,
  { fieldsToSend },
);
const itemUpdater = new SdkUpdaterApiConsumer(
  cognitiveProfilesService.updateCognitiveProfile,
  {
    fieldsToSend,
    preRequestHandler,
  },
);
const itemDeleter = new SdkDeleterApiConsumer(cognitiveProfilesService.deleteCognitiveProfile);

const getList = (params) => listGetter.getList(params);
const get = (params) => itemGetter.getItem(params);
const add = (params) => itemCreator.createItem(params);
const patch = (params) => itemPatcher.patchItem(params);
const update = (params) => itemUpdater.updateItem(params);
const deleteItem = (params) => itemDeleter.deleteItem(params);

const CognitiveProfilesAPI = {
  getList,
  get,
  add,
  patch,
  update,
  delete: deleteItem,
};

export default CognitiveProfilesAPI;
