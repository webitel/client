import { ListServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';
import SDKUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';

const listService = new ListServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'description'];

const defaultListObject = {
  name: '',
  count: 0,
};

const listGetter = new SDKListGetter(listService.searchList, { defaultListObject });
const itemGetter = new SDKGetter(listService.readList);
const itemCreator = new SDKCreator(listService.createList, fieldsToSend);
const itemUpdater = new SDKUpdater(listService.updateList, fieldsToSend);
const itemDeleter = new SDKDeleter(listService.deleteList);

export const getBlacklistList = (params) => listGetter.getList(params);
export const getBlacklist = (params) => itemGetter.getItem(params);
export const addBlacklist = (params) => itemCreator.createItem(params);
export const updateBlacklist = (params) => itemUpdater.updateItem(params);
export const deleteBlacklist = ({ id }) => itemDeleter.deleteItem(id);

export default {
  getList: getBlacklistList,
  get: getBlacklist,
  add: addBlacklist,
  update: updateBlacklist,
  delete: deleteBlacklist,
};
