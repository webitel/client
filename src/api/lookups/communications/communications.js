import { CommunicationTypeServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKItemDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';
import SDKItemUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKItemCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKItemGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';


const communicationService = new CommunicationTypeServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['code', 'name', 'description'];

const defaultItemObject = {
  name: '',
  code: '',
  description: '',
  _dirty: false,
};

const listGetter = new SDKListGetter(communicationService.searchCommunicationType);
const itemGetter = new SDKItemGetter(communicationService.readCommunicationType, defaultItemObject);
const itemCreator = new SDKItemCreator(communicationService.createCommunicationType, fieldsToSend);
const itemUpdater = new SDKItemUpdater(communicationService.updateCommunicationType, fieldsToSend);
const itemDeleter = new SDKItemDeleter(communicationService.deleteCommunicationType);

export const getCommunicationsList = (params) => listGetter.getList(params);
export const getCommunication = ({ itemId }) => itemGetter.getItem(itemId);
export const addCommunication = ({ itemInstance }) => itemCreator.createItem(itemInstance);
export const updateCommunication = ({ itemId, itemInstance }) => (
  itemUpdater.updateItem(itemId, itemInstance)
);
export const deleteCommunication = ({ id }) => itemDeleter.deleteItem(id);

export default {
  getList: getCommunicationsList,
  get: getCommunication,
  add: addCommunication,
  update: updateCommunication,
  delete: deleteCommunication,
};
