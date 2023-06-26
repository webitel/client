import { ListServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/old/instance';
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

const getBlacklistList = (params) => listGetter.getList(params);
const getBlacklist = (params) => itemGetter.getItem(params);
const addBlacklist = (params) => itemCreator.createItem(params);
const updateBlacklist = (params) => itemUpdater.updateItem(params);
const deleteBlacklist = (params) => itemDeleter.deleteItem(params);
const getBlacklistsLookup = (params) => listGetter.getLookup(params);

const BlacklistsAPI = {
  getList: getBlacklistList,
  get: getBlacklist,
  add: addBlacklist,
  update: updateBlacklist,
  delete: deleteBlacklist,
  getLookup: getBlacklistsLookup,
};

export default BlacklistsAPI;
