import { CommunicationTypeServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKItemDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';
import SDKItemUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKItemCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';


const communicationService = new CommunicationTypeServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['code', 'name', 'description'];

const defaultSingleObject = {
  name: '',
  code: '',
  description: '',
};

const listGetter = new SDKListGetter(communicationService.searchCommunicationType);
const itemGetter = new SDKGetter(communicationService.readCommunicationType,
  { defaultSingleObject });
const itemCreator = new SDKItemCreator(communicationService.createCommunicationType, fieldsToSend);
const itemUpdater = new SDKItemUpdater(communicationService.updateCommunicationType, fieldsToSend);
const itemDeleter = new SDKItemDeleter(communicationService.deleteCommunicationType);

export const getCommunicationsList = (params) => listGetter.getList(params);
export const getCommunication = (params) => itemGetter.getItem(params);
export const addCommunication = (params) => itemCreator.createItem(params);
export const updateCommunication = (params) => itemUpdater.updateItem(params);
export const deleteCommunication = ({ id }) => itemDeleter.deleteItem(id);

export default {
  getList: getCommunicationsList,
  get: getCommunication,
  add: addCommunication,
  update: updateCommunication,
  delete: deleteCommunication,
};
