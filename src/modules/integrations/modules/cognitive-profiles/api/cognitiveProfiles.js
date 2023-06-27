import { CognitiveProfileServiceApiFactory } from 'webitel-sdk';
import {
  SdkCreatorApiConsumer,
  SdkDeleterApiConsumer,
  SdkGetterApiConsumer,
  SdkListGetterApiConsumer,
  SdkPatcherApiConsumer,
  SdkUpdaterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import { MicrosoftRegion } from 'webitel-sdk/esm2015/lookups';
import instance from '../../../../../app/api/old/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import CognitiveProfileServices
  from '../lookups/CognitiveProfileServices.lookup';

const cognitiveProfilesService = new CognitiveProfileServiceApiFactory(configuration, '', instance);

const fieldsToSend = [
  'name',
  'default',
  'enabled',
  'provider',
  'service',
  'description',
  'properties',
];

const defaultListObject = {
  default: false,
  enabled: false,
};

const defaultSingleObject = {
  properties: {},
};

const itemResponseHandler = (response) => {
  const result = {
    ...response,
    service: CognitiveProfileServices
    .find(({ value }) => value === response.service),
    properties: {
      ...response.properties,
    },
  };
  if (result.properties.region) {
    result.properties.region = MicrosoftRegion
    .find(({ id }) => id === result.properties.region) || {};
  }
  return result;
};

const preRequestHandler = (item) => {
  const result = {
    ...item,
    service: item.service.value,
    properties: { ...item.properties },
  };
  if (result.properties.region) {
    result.properties.region = item.properties.region.id;
  }
  return result;
};

const _getProfilesList = (getList) => function({
                                                 page,
                                                 size,
                                                 search,
                                                 sort,
                                                 fields,
                                                 id,
                                                 service,
                                                 enabled,
                                               }) {
  const params = [page, size, search, sort, fields, id, service, enabled];
  return getList(params);
};

const listGetter = new SdkListGetterApiConsumer(
  cognitiveProfilesService.searchCognitiveProfile,
  {
    defaultListObject,
  },
).setGetListMethod(_getProfilesList);

const itemGetter = new SdkGetterApiConsumer(
  cognitiveProfilesService.readCognitiveProfile,
  {
    defaultSingleObject,
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

const getLookup = (params) => listGetter.getLookup(params);

const CognitiveProfilesAPI = {
  getList,
  get,
  add,
  patch,
  update,
  delete: deleteItem,
  getLookup,
};

export default CognitiveProfilesAPI;
