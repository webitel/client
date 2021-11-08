import { ListServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const listService = new ListServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['listId', 'description', 'number'];

const listGetter = new SdkListGetterApiConsumer(listService.searchListCommunication);
const itemGetter = new SdkGetterApiConsumer(listService.readListCommunication);
const itemCreator = new SdkCreatorApiConsumer(listService.createListCommunication,
  { fieldsToSend });
const itemUpdater = new SdkUpdaterApiConsumer(listService.updateListCommunication,
  { fieldsToSend });
const itemDeleter = new SdkDeleterApiConsumer(listService.deleteListCommunication);

export const getBlacklistNumbersList = (params) => listGetter.getNestedList(params);
export const getBlacklistNumber = (params) => itemGetter.getNestedItem(params);
export const addBlacklistNumber = (params) => itemCreator.createNestedItem(params);
export const updateBlacklistNumber = (params) => itemUpdater.updateNestedItem(params);
export const deleteBlacklistNumber = (params) => itemDeleter.deleteNestedItem(params);

export default {
  getList: getBlacklistNumbersList,
  get: getBlacklistNumber,
  add: addBlacklistNumber,
  update: updateBlacklistNumber,
  delete: deleteBlacklistNumber,
};
