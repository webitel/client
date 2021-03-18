import { OutboundResourceServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';
import SDKListGetter from '../../../../../../../app/api/BaseAPIServices/ListGetter/SDKListGetter';
import SDKGetter from '../../../../../../../app/api/BaseAPIServices/Getter/SDKGetter';
import SDKCreator from '../../../../../../../app/api/BaseAPIServices/Creator/SDKCreator';
import SDKUpdater from '../../../../../../../app/api/BaseAPIServices/Updater/SDKUpdater';
import SDKDeleter from '../../../../../../../app/api/BaseAPIServices/Deleter/SDKDeleter';

const resService = new OutboundResourceServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['display', 'resourceId'];

const preRequestHandler = (item, parentId) => ({ ...item, resourceId: parentId });

const listGetter = new SDKListGetter(resService.searchOutboundResourceDisplay);
const itemGetter = new SDKGetter(resService.readOutboundResourceDisplay);
const itemCreator = new SDKCreator(resService.createOutboundResourceDisplay,
  { fieldsToSend, preRequestHandler });
const itemUpdater = new SDKUpdater(resService.updateOutboundResourceDisplay,
  { fieldsToSend, preRequestHandler });
const itemDeleter = new SDKDeleter(resService.deleteOutboundResourceDisplay);

export const getResDisplayList = (params) => listGetter.getNestedList(params);
export const getResDisplay = (params) => itemGetter.getNestedItem(params);
export const addResDisplay = (params) => itemCreator.createNestedItem(params);
export const updateResDisplay = (params) => itemUpdater.updateNestedItem(params);
export const deleteResDisplay = (params) => itemDeleter.deleteNestedItem(params);

export default {
  getList: getResDisplayList,
  get: getResDisplay,
  add: addResDisplay,
  update: updateResDisplay,
  delete: deleteResDisplay,
};