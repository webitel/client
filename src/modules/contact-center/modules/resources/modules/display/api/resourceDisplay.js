import { OutboundResourceServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const resService = new OutboundResourceServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['display', 'resourceId'];

const preRequestHandler = (item, parentId) => ({ ...item, resourceId: parentId });

const listGetter = new SdkListGetterApiConsumer(resService.searchOutboundResourceDisplay);
const itemGetter = new SdkGetterApiConsumer(resService.readOutboundResourceDisplay);
const itemCreator = new SdkCreatorApiConsumer(resService.createOutboundResourceDisplay,
  { fieldsToSend, preRequestHandler });
const itemUpdater = new SdkUpdaterApiConsumer(resService.updateOutboundResourceDisplay,
  { fieldsToSend, preRequestHandler });
const itemDeleter = new SdkDeleterApiConsumer(resService.deleteOutboundResourceDisplay);

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
