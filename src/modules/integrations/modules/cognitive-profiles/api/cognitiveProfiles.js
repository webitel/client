import { CognitiveProfileServiceApiFactory } from 'webitel-sdk';
import {
  SdkCreatorApiConsumer,
  SdkDeleterApiConsumer,
  SdkGetterApiConsumer,
  SdkListGetterApiConsumer,
  SdkPatcherApiConsumer,
  SdkUpdaterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import MicrosoftRegions
  from '../../../lookups/microsoft/MicrosoftRegions.lookup';
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
  return {
    ...response,
    service: CognitiveProfileServices
    .find(({ value }) => value === response.service),
    properties: {
      ...response.properties,
      region: MicrosoftRegions
      .find(({ id }) => id === response.properties.region) || {},
    },
  };
};

const preRequestHandler = (item) => {
  return {
    ...item,
    service: item.service.value,
    properties: { ...item.properties, region: item.properties.region.id },
  };
};

const _getProfilesList = (getList) => function ({
                                                 page,
                                                 size,
                                                 search,
                                                 sort,
                                                 fields,
                                                 ids,
                                                 service,
                                                 enabled,
                                               }) {
  const params = [page, size, search, sort, fields, ids, service, enabled];
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
