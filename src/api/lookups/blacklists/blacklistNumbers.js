import { ListServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';
import SDKGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';

const listService = new ListServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['listId', 'description', 'number'];

const listGetter = new SDKListGetter(listService.searchListCommunication);
const itemGetter = new SDKGetter(listService.readListCommunication);
const itemCreator = new SDKCreator(listService.createListCommunication, fieldsToSend);
const itemUpdater = new SDKUpdater(listService.updateListCommunication, fieldsToSend);
const itemDeleter = new SDKDeleter(listService.deleteListCommunication);

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
