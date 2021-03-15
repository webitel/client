import { OutboundResourceServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';
import SDKPatcher from '../../utils/ApiControllers/Patcher/SDKPatcher';
import SDKUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';

const resService = new OutboundResourceServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['limit', 'enabled',
  'rps', 'reserve', 'maxSuccessivelyErrors',
  'name', 'errorIds', 'display', 'resourceId', 'gateway'];

const defaultListObject = {
  gateway: null,
  enabled: false,
  reserve: false,
};

const defaultSingleObject = {
  name: '',
  gateway: {},
  rps: 0,
  limit: 0,
  description: '',
  maxSuccessivelyErrors: 0,
  errorIds: [],
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
  return response;
};

const preRequestHandler = (item) => {
  // eslint-disable-next-line no-param-reassign
  item.errorIds = item.errorIds.map((item) => item.name || item.text);
  // eslint-disable-next-line no-param-reassign
  item.maxSuccessivelyErrors = item.maxErrors;
  // eslint-disable-next-line no-param-reassign
  item.rps = item.cps;
  return item;
};

const listGetter = new SDKListGetter(resService.searchOutboundResource,
  defaultListObject);
const itemGetter = new SDKGetter(resService.readOutboundResource,
  { defaultSingleObject, itemResponseHandler });
const itemCreator = new SDKCreator(resService.createOutboundResource,
  fieldsToSend, preRequestHandler);
const itemUpdater = new SDKUpdater(resService.updateOutboundResource,
  fieldsToSend, preRequestHandler);
const itemPatcher = new SDKPatcher(resService.patchOutboundResource,
  fieldsToSend);
const itemDeleter = new SDKDeleter(resService.deleteOutboundResource);

export const getResourceList = (params) => listGetter.getList(params);
export const getResource = (params) => itemGetter.getItem(params);
export const addResource = (params) => itemCreator.createItem(params);
export const updateResource = (params) => itemUpdater.updateItem(params);
export const patchResource = (params) => itemPatcher.patchItem(params);
export const deleteResource = ({ id }) => itemDeleter.deleteItem(id);

export default {
  getList: getResourceList,
  get: getResource,
  add: addResource,
  patch: patchResource,
  update: updateResource,
  delete: deleteResource,
};
