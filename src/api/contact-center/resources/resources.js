import { OutboundResourceServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import { WebitelSDKItemDeleter } from '../../utils/ApiControllers/Deleter/SDKDeleter';
import { WebitelSDKItemPatcher } from '../../utils/ApiControllers/Patcher/SDKPatcher';
import { WebitelSDKItemUpdater } from '../../utils/ApiControllers/Updater/SDKUpdater';
import { WebitelSDKItemCreator } from '../../utils/ApiControllers/Creator/SDKCreator';
import { WebitelSDKItemGetter } from '../../utils/ApiControllers/Getter/SDKGetter';
import { WebitelSDKListGetter } from '../../utils/ApiControllers/ListGetter/SDKListGetter';

const resService = new OutboundResourceServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['limit', 'enabled',
  'rps', 'reserve', 'maxSuccessivelyErrors',
  'name', 'errorIds', 'display', 'resourceId', 'gateway'];

const defaultListObject = {
  _isSelected: false,
  gateway: null,
  enabled: false,
  reserve: false,
};

const defaultItemObject = {
  name: '',
  gateway: {},
  rps: 0,
  limit: 0,
  description: '',
  maxSuccessivelyErrors: 0,
  errorIds: [],
  _dirty: false,
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

const listGetter = new WebitelSDKListGetter(resService.searchOutboundResource,
  defaultListObject);
const itemGetter = new WebitelSDKItemGetter(resService.readOutboundResource,
  defaultItemObject, itemResponseHandler);
const itemCreator = new WebitelSDKItemCreator(resService.createOutboundResource,
  fieldsToSend, preRequestHandler);
const itemUpdater = new WebitelSDKItemUpdater(resService.updateOutboundResource,
  fieldsToSend, preRequestHandler);
const itemPatcher = new WebitelSDKItemPatcher(resService.patchOutboundResource,
  fieldsToSend);
const itemDeleter = new WebitelSDKItemDeleter(resService.deleteOutboundResource);

export const getResourceList = (params) => listGetter.getList(params);
export const getResource = ({ itemId }) => itemGetter.getItem(itemId);
export const addResource = ({ itemInstance }) => itemCreator.createItem(itemInstance);
export const updateResource = ({ itemId, itemInstance }) => (
  itemUpdater.updateItem(itemId, itemInstance)
);
export const patchResource = ({ id, changes }) => itemPatcher.patchItem(id, changes);
export const deleteResource = ({ id }) => itemDeleter.deleteItem(id);

export default {
  getList: getResourceList,
  get: getResource,
  add: addResource,
  patch: patchResource,
  update: updateResource,
  delete: deleteResource,
};
