import { ListServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import SDKDeleter from '../../../../../app/api/BaseAPIServices/Deleter/SDKDeleter';
import SDKUpdater from '../../../../../app/api/BaseAPIServices/Updater/SDKUpdater';
import SDKCreator from '../../../../../app/api/BaseAPIServices/Creator/SDKCreator';
import SDKGetter from '../../../../../app/api/BaseAPIServices/Getter/SDKGetter';
import SDKListGetter from '../../../../../app/api/BaseAPIServices/ListGetter/SDKListGetter';

const listService = new ListServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'description'];

const defaultListObject = {
  name: '',
  count: 0,
};

const listGetter = new SDKListGetter(listService.searchList, { defaultListObject });
const itemGetter = new SDKGetter(listService.readList);
const itemCreator = new SDKCreator(listService.createList, { fieldsToSend });
const itemUpdater = new SDKUpdater(listService.updateList, { fieldsToSend });
const itemDeleter = new SDKDeleter(listService.deleteList);

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
