import { OutboundResourceServiceApiFactory } from 'webitel-sdk';
import {
  SdkCreatorApiConsumer,
  SdkDeleterApiConsumer,
  SdkGetterApiConsumer,
  SdkListGetterApiConsumer,
  SdkPatcherApiConsumer,
  SdkUpdaterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/old/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const resService = new OutboundResourceServiceApiFactory(configuration, '', instance);

const fieldsToSend = [
  'limit', 'enabled', 'rps', 'maxSuccessivelyErrors',
  'name', 'errorIds', 'display', 'description', 'resourceId', 'gateway',
  'patterns', 'failureDialDelay', 'parameters',
];

const defaultListObject = {
  gateway: null,
  enabled: false,
};

const defaultSingleObject = {
  name: '',
  gateway: {},
  rps: 0,
  limit: 0,
  description: '',
  maxSuccessivelyErrors: 0,
  errorIds: [],
  patterns: [],
  failureDialDelay: 0,
  parameters: {
    cidType: '',
    ignoreEarlyMedia: '',
  },
};

const itemResponseHandler = (response) => {
  // eslint-disable-next-line no-param-reassign
  response.maxErrors = response.maxSuccessivelyErrors;
  // eslint-disable-next-line no-param-reassign
  response.cps = response.rps;
  // eslint-disable-next-line no-param-reassign
  response.parameters = {
    ...defaultSingleObject.parameters,
    ...response.parameters,
  };
  return response;
};

const preRequestHandler = (item) => {
  // eslint-disable-next-line no-param-reassign
  item.maxSuccessivelyErrors = item.maxErrors;
  // eslint-disable-next-line no-param-reassign
  item.rps = item.cps;
  return item;
};

const listGetter = new SdkListGetterApiConsumer(
  resService.searchOutboundResource,
  { defaultListObject },
);
const itemGetter = new SdkGetterApiConsumer(
  resService.readOutboundResource,
  { defaultSingleObject, itemResponseHandler },
);
const itemCreator = new SdkCreatorApiConsumer(
  resService.createOutboundResource,
  { fieldsToSend, preRequestHandler },
);
const itemUpdater = new SdkUpdaterApiConsumer(
  resService.updateOutboundResource,
  { fieldsToSend, preRequestHandler },
);
const itemPatcher = new SdkPatcherApiConsumer(
  resService.patchOutboundResource,
  { fieldsToSend },
);
const itemDeleter = new SdkDeleterApiConsumer(resService.deleteOutboundResource);

const getResourceList = (params) => listGetter.getList(params);
const getResource = (params) => itemGetter.getItem(params);
const addResource = (params) => itemCreator.createItem(params);
const updateResource = (params) => itemUpdater.updateItem(params);
const patchResource = (params) => itemPatcher.patchItem(params);
const deleteResource = (params) => itemDeleter.deleteItem(params);
const getResourcesLookup = (params) => listGetter.getLookup(params);

const ResourcesAPI = {
  getList: getResourceList,
  get: getResource,
  add: addResource,
  patch: patchResource,
  update: updateResource,
  delete: deleteResource,
  getLookup: getResourcesLookup,
};

export default ResourcesAPI;
