import { ListServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKItemDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';
import SDKItemUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKItemCreator from '../../utils/ApiControllers/Creator/SDKCreator';
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
const itemCreator = new SDKItemCreator(listService.createList, fieldsToSend);
const itemUpdater = new SDKItemUpdater(listService.updateList, fieldsToSend);
const itemDeleter = new SDKItemDeleter(listService.deleteList);

export const getBlacklistList = (params) => listGetter.getList(params);
export const getBlacklist = (params) => itemGetter.getItem(params);
export const addBlacklist = (params) => itemCreator.createItem(params);
export const updateBlacklist = ({ itemId, itemInstance }) => (
  itemUpdater.updateItem(itemId, itemInstance)
);
export const deleteBlacklist = ({ id }) => itemDeleter.deleteItem(id);

export default {
  getList: getBlacklistList,
  get: getBlacklist,
  add: addBlacklist,
  update: updateBlacklist,
  delete: deleteBlacklist,
};
