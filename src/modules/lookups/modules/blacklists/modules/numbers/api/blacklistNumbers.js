import { ListServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';
import SDKListGetter from '../../../../../../../app/api/BaseAPIServices/ListGetter/SDKListGetter';
import SDKGetter from '../../../../../../../app/api/BaseAPIServices/Getter/SDKGetter';
import SDKCreator from '../../../../../../../app/api/BaseAPIServices/Creator/SDKCreator';
import SDKUpdater from '../../../../../../../app/api/BaseAPIServices/Updater/SDKUpdater';
import SDKDeleter from '../../../../../../../app/api/BaseAPIServices/Deleter/SDKDeleter';

const listService = new ListServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['listId', 'description', 'number'];

const listGetter = new SDKListGetter(listService.searchListCommunication);
const itemGetter = new SDKGetter(listService.readListCommunication);
const itemCreator = new SDKCreator(listService.createListCommunication, { fieldsToSend });
const itemUpdater = new SDKUpdater(listService.updateListCommunication, { fieldsToSend });
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
