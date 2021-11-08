import { ListServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const listService = new ListServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'description'];

const defaultListObject = {
  name: '',
  count: 0,
};

const listGetter = new SdkListGetterApiConsumer(listService.searchList, { defaultListObject });
const itemGetter = new SdkGetterApiConsumer(listService.readList);
const itemCreator = new SdkCreatorApiConsumer(listService.createList, { fieldsToSend });
const itemUpdater = new SdkUpdaterApiConsumer(listService.updateList, { fieldsToSend });
const itemDeleter = new SdkDeleterApiConsumer(listService.deleteList);

export const getBlacklistList = (params) => listGetter.getList(params);
export const getBlacklist = (params) => itemGetter.getItem(params);
export const addBlacklist = (params) => itemCreator.createItem(params);
export const updateBlacklist = (params) => itemUpdater.updateItem(params);
export const deleteBlacklist = (params) => itemDeleter.deleteItem(params);

export default {
  getList: getBlacklistList,
  get: getBlacklist,
  add: addBlacklist,
  update: updateBlacklist,
  delete: deleteBlacklist,
};
