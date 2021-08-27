import { OutboundResourceServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import SDKDeleter from '../../../../../app/api/BaseAPIServices/Deleter/SDKDeleter';
import SDKPatcher from '../../../../../app/api/BaseAPIServices/Patcher/SDKPatcher';
import SDKUpdater from '../../../../../app/api/BaseAPIServices/Updater/SDKUpdater';
import SDKCreator from '../../../../../app/api/BaseAPIServices/Creator/SDKCreator';
import SDKGetter from '../../../../../app/api/BaseAPIServices/Getter/SDKGetter';
import SDKListGetter from '../../../../../app/api/BaseAPIServices/ListGetter/SDKListGetter';

const resService = new OutboundResourceServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['limit', 'enabled',
  'rps', 'maxSuccessivelyErrors',
  'name', 'errorIds', 'display', 'description', 'resourceId', 'gateway', 'patterns'];

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
};

const itemResponseHandler = (response) => {
  // eslint-disable-next-line no-param-reassign
  response.maxErrors = response.maxSuccessivelyErrors;
  // eslint-disable-next-line no-param-reassign
  response.cps = response.rps;
  if (response.errorIds) {
    // eslint-disable-next-line no-param-reassign
    response.errorIds = response.errorIds.map((item) => ({ name: item }));
  }
  if (response.patterns) {
    // eslint-disable-next-line no-param-reassign
    response.patterns = response.patterns.map((item) => ({ name: item }));
  }
  return response;
};

const preRequestHandler = (item) => {
  // eslint-disable-next-line no-param-reassign
  item.errorIds = item.errorIds.map((item) => item.name || item.text);
  // eslint-disable-next-line no-param-reassign
  item.patterns = item.patterns.map((item) => item.name || item.text);
  // eslint-disable-next-line no-param-reassign
  item.maxSuccessivelyErrors = item.maxErrors;
  // eslint-disable-next-line no-param-reassign
  item.rps = item.cps;
  return item;
};

const listGetter = new SDKListGetter(resService.searchOutboundResource,
  { defaultListObject });
const itemGetter = new SDKGetter(resService.readOutboundResource,
  { defaultSingleObject, itemResponseHandler });
const itemCreator = new SDKCreator(resService.createOutboundResource,
  { fieldsToSend, preRequestHandler });
const itemUpdater = new SDKUpdater(resService.updateOutboundResource,
  { fieldsToSend, preRequestHandler });
const itemPatcher = new SDKPatcher(resService.patchOutboundResource,
  { fieldsToSend });
const itemDeleter = new SDKDeleter(resService.deleteOutboundResource);

export const getResourceList = (params) => listGetter.getList(params);
export const getResource = (params) => itemGetter.getItem(params);
export const addResource = (params) => itemCreator.createItem(params);
export const updateResource = (params) => itemUpdater.updateItem(params);
export const patchResource = (params) => itemPatcher.patchItem(params);
export const deleteResource = (params) => itemDeleter.deleteItem(params);

export default {
  getList: getResourceList,
  get: getResource,
  add: addResource,
  patch: patchResource,
  update: updateResource,
  delete: deleteResource,
};
